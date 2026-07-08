from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

from rag_engine import answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Query(BaseModel):
    question: str


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
