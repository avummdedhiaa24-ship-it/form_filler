import json
from rag_engine import answer, call_qwen
import os
import io
import time
import base64
import re
from datetime import datetime
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, NumberObject

sessions = {}

def validate_email(email):
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    return re.match(pattern, email) is not None

def validate_date(date_str):
    try:
        datetime.strptime(date_str, "%d/%m/%Y")
        return True
    except ValueError:
        return False

def validate_past_date(date_str):
    try:
        dt = datetime.strptime(date_str, "%d/%m/%Y")
        if dt > datetime.now():
            return False
        return True
    except ValueError:
        return False

def validate_mobile(mobile):
    pattern = r"^\+?\d{10,15}$"
    # Remove spaces and dashes for checking
    clean_mobile = re.sub(r'[\s-]', '', mobile)
    return re.match(pattern, clean_mobile) is not None

VALIDATORS = {
    "emp_email": (validate_email, "Please provide a valid email address (e.g., name@example.com)."),
    "email": (validate_email, "Please provide a valid email address (e.g., name@example.com)."),
    "date": (validate_past_date, "Please provide a valid date in DD/MM/YYYY format that is not in the future."),
    "start_date": (validate_date, "Please provide the date in DD/MM/YYYY format."),
    "end_date": (validate_date, "Please provide the date in DD/MM/YYYY format."),
    "mobile": (validate_mobile, "Please provide a valid mobile number (10 to 15 digits).")
}

def generate_pdf(payload, form_type):
    if form_type == "employee_details_form":
        template_path = "document/employee_details_form.pdf"
        output_filename = "filled_employee_details_form.pdf"
    elif form_type == "job_application_form":
        template_path = "document/job_application_form.pdf"
        output_filename = "filled_job_application_form.pdf"
    elif form_type == "leave_request_form":
        template_path = "document/leave_request_form.pdf"
        output_filename = "filled_leave_request_form.pdf"
    elif form_type == "character_certificate_form":
        template_path = "document/character_certificate_form.pdf"
        output_filename = "filled_character_certificate.pdf"
    else:
        raise ValueError("Unknown form type")
        
    output_path = os.path.join("document", output_filename)
    
    reader = PdfReader(template_path)
    writer = PdfWriter()
    
    writer.append(reader)
        
    writer.update_page_form_field_values(
        writer.pages[0],
        payload
    )
    
    for page in writer.pages:
        if "/Annots" in page:
            for annot in page["/Annots"]:
                annot_obj = annot.get_object()
                annot_obj.update({
                    NameObject("/Ff"): NumberObject(1)
                })
                
    signature_path = payload.get("signature")
    if form_type == "character_certificate_form" and signature_path and signature_path != "SKIP":
        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=letter)
        _, page_height = letter
        try:
            can.drawImage(signature_path, 380, page_height - 350, width=120, height=40, preserveAspectRatio=True, mask='auto')
        except Exception as e:
            print("Failed to draw image:", e)
        can.save()
        packet.seek(0)
        
        new_pdf = PdfReader(packet)
        page = writer.pages[0]
        page.merge_page(new_pdf.pages[0])
        
        try:
            os.remove(signature_path)
        except:
            pass
                
    with open(output_path, "wb") as output_stream:
        writer.write(output_stream)
        
    return f"http://localhost:8000/download/{output_filename}"

def extract_value(query, field):
    prompt = f"""
    Extract the value for '{field}' from the following message: "{query}"
    If the message does not contain a clear answer, return NONE.
    Only return the extracted value, nothing else.
    """
    
    return call_qwen(
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1
    )

def handle_chat(session_id, query, file_data=None):
    
    if session_id not in sessions:
        response_data = answer(query)
        if isinstance(response_data, dict) and response_data.get("type") in ["employee_details_form", "job_application_form", "leave_request_form", "character_certificate_form"]:
            form_type = response_data["type"]
            if form_type == "employee_details_form":
                fields = {"emp_name": None, "emp_id": None, "emp_email": None}
                required = ["emp_name", "emp_id", "emp_email"]
                prompts = {
                    "emp_name": "What is your Name?",
                    "emp_id": "What is your Employee ID?",
                    "emp_email": "What is your Email ID?"
                }
            elif form_type == "job_application_form":
                fields = {"full_name": None, "email": None, "mobile": None, "position": None}
                required = ["full_name", "email", "mobile", "position"]
                prompts = {
                    "full_name": "What is your Full Name?",
                    "email": "What is your Email?",
                    "mobile": "What is your Mobile Number?",
                    "position": "What Position are you applying for?"
                }
            elif form_type == "character_certificate_form":
                fields = {"person_name": None, "relative_name": None, "known_years": None, "verifier_name": None, "designation": None, "place": None, "date": None, "signature": None}
                required = ["person_name", "relative_name", "known_years", "verifier_name", "designation", "place", "date", "signature"]
                prompts = {
                    "person_name": "What is the applicant's Full Name?",
                    "relative_name": "What is their Father's/Spouse's Name?",
                    "known_years": "How many years have they been known by the verifier?",
                    "verifier_name": "What is the Name of the Verifier (in block letters)?",
                    "designation": "What is the Designation of the Verifier?",
                    "place": "What is the Place of issuance?",
                    "date": "What is the Date of issuance?",
                    "signature": "Would you like to add a signature? Please attach an image file or type 'skip'."
                }
            else: # leave_request_form
                fields = {"employee_name": None, "manager_name": None, "start_date": None, "end_date": None, "reason": None}
                required = ["employee_name", "manager_name", "start_date", "end_date", "reason"]
                prompts = {
                    "employee_name": "What is your name?",
                    "manager_name": "What is your Manager's name?",
                    "start_date": "What is the Start Date for the leave?",
                    "end_date": "What is the End Date?",
                    "reason": "What is the reason for your leave?"
                }
                
            sessions[session_id] = {
                "active_form": form_type,
                "fields": fields,
                "required": required,
                "prompts": prompts
            }
            # The first question is already asked by answer()
            return {"response": response_data["response"]}
        else:
            return {"response": response_data}
            
    state = sessions[session_id]
    
    if state["active_form"]:
        missing_field = None
        for field in state["required"]:
            if state["fields"][field] is None:
                missing_field = field
                break
                
        if missing_field:
            if missing_field == "signature" and file_data:
                try:
                    header, encoded = file_data.split(",", 1)
                    data = base64.b64decode(encoded)
                    os.makedirs("document", exist_ok=True)
                    sig_path = f"document/temp_signature_{time.time()}.png"
                    with open(sig_path, "wb") as f:
                        f.write(data)
                    state["fields"]["signature"] = sig_path
                except Exception as e:
                    print("Error saving signature:", e)
                    state["fields"]["signature"] = "SKIP"
            elif missing_field == "signature" and query and query.strip().lower() == "skip":
                state["fields"]["signature"] = "SKIP"
            else:
                extracted = extract_value(query, missing_field)
                clean_extracted = extracted.strip(' "\'.')
                
                value_to_set = None
                if clean_extracted.lower() not in ["none", "null", ""]:
                    value_to_set = clean_extracted
                elif len(query.split()) <= 5:
                    value_to_set = query.strip()
                else:
                    return {"response": f"I didn't quite catch that. {state['prompts'][missing_field]}"}
                    
                if value_to_set:
                    if missing_field in VALIDATORS:
                        is_valid = VALIDATORS[missing_field][0](value_to_set)
                        if not is_valid:
                            return {"response": f"Invalid format. {VALIDATORS[missing_field][1]}"}
                    state["fields"][missing_field] = value_to_set
                
        next_missing = None
        for field in state["required"]:
            if state["fields"][field] is None:
                next_missing = field
                break
                
        if next_missing:
            return {"response": state["prompts"][next_missing]}
            
        payload = state["fields"]
        pdf_url = generate_pdf(payload, state["active_form"])
        
        form_name = state["active_form"].replace("_", " ").title()
        
        del sessions[session_id]
        
        return {
            "type": "pdf",
            "response": f"I have generated your {form_name}. You can download it below.",
            "url": pdf_url
        }
