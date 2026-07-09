from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject
import os

from rag_engine import answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Query(BaseModel):
    question: str


class StudentFormPayload(BaseModel):
    name: str
    roll_no: str
    email_id: str


@app.get("/")
def root():
    return {
        "status": "running"
    }


@app.post("/chat")
def chat(query: Query):

    return answer(
        query.question
    )


@app.post("/generate-student-form")
def generate_student_form(payload: StudentFormPayload):
    template_path = os.path.join("document", "student_form.pdf")
    output_path = os.path.join("document", "generated_student_form.pdf")

    if not os.path.exists(template_path):
        return {"error": "Student form template not found"}

    reader = PdfReader(template_path)
    writer = PdfWriter()

    # Copy all pages
    for page in reader.pages:
        writer.add_page(page)

    # Copy the AcroForm (required for fillable PDFs)
    if "/AcroForm" in reader.trailer["/Root"]:
        writer._root_object.update(
            {
                NameObject("/AcroForm"): reader.trailer["/Root"]["/AcroForm"]
            }
        )

    field_values = {
        "name": payload.name,
        "roll_no": payload.roll_no,
        "email_id": payload.email_id,
    }

    # Fill the fields
    for page in writer.pages:
        writer.update_page_form_field_values(page, field_values)

    with open(output_path, "wb") as f:
        writer.write(f)

    return {
        "type": "pdf",
        "response": "Your Student Form has been generated successfully.",
        "url": "http://localhost:8000/download/generated_student_form.pdf",
    }


@app.get("/download/{filename}")
def download_pdf(filename: str):

    file_path = os.path.join("document", filename)

    if not os.path.exists(file_path):
        return {"error": "File not found"}

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=filename
    )
