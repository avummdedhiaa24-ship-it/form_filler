import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

def create_employee_details_form():
    output_path = os.path.join("document", "employee_details_form.pdf")
    c = canvas.Canvas(output_path, pagesize=letter)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(300, 750, "EMPLOYEE DETAILS FORM")
    c.line(200, 745, 400, 745)
    
    c.setFont("Helvetica", 12)
    c.drawString(50, 700, "Employee Name:")
    c.drawString(50, 650, "Employee ID:")
    c.drawString(50, 600, "Email ID:")
    
    form = c.acroForm
    form.textfield(name='emp_name', tooltip='Name', x=180, y=695, width=300, height=18)
    form.textfield(name='emp_id', tooltip='ID', x=180, y=645, width=200, height=18)
    form.textfield(name='emp_email', tooltip='Email', x=180, y=595, width=300, height=18)
    
    c.save()
    print(f"Generated {output_path}")

def create_job_application_form():
    output_path = os.path.join("document", "job_application_form.pdf")
    c = canvas.Canvas(output_path, pagesize=letter)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(300, 750, "JOB APPLICATION FORM")
    c.line(200, 745, 400, 745)
    
    c.setFont("Helvetica", 12)
    c.drawString(50, 700, "Full Name:")
    c.drawString(50, 650, "Email:")
    c.drawString(50, 600, "Mobile:")
    c.drawString(50, 550, "Position Applied For:")
    
    form = c.acroForm
    form.textfield(name='full_name', x=180, y=695, width=300, height=18)
    form.textfield(name='email', x=180, y=645, width=300, height=18)
    form.textfield(name='mobile', x=180, y=595, width=200, height=18)
    form.textfield(name='position', x=180, y=545, width=300, height=18)
    
    c.save()
    print(f"Generated {output_path}")

def create_leave_request_form():
    output_path = os.path.join("document", "leave_request_form.pdf")
    c = canvas.Canvas(output_path, pagesize=letter)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(300, 750, "LEAVE REQUEST FORM")
    c.line(200, 745, 400, 745)
    
    c.setFont("Helvetica", 12)
    c.drawString(50, 700, "Employee Name:")
    c.drawString(50, 650, "Manager Name:")
    c.drawString(50, 600, "Start Date:")
    c.drawString(50, 550, "End Date:")
    c.drawString(50, 500, "Reason:")
    
    form = c.acroForm
    form.textfield(name='employee_name', x=180, y=695, width=300, height=18)
    form.textfield(name='manager_name', x=180, y=645, width=300, height=18)
    form.textfield(name='start_date', x=180, y=595, width=150, height=18)
    form.textfield(name='end_date', x=180, y=545, width=150, height=18)
    form.textfield(name='reason', x=180, y=495, width=350, height=18)
    
    c.save()
    print(f"Generated {output_path}")

if __name__ == "__main__":
    create_employee_details_form()
    create_job_application_form()
    create_leave_request_form()

def generate_character_certificate():
    c = canvas.Canvas("document/character_certificate_form.pdf", pagesize=letter)
    width, height = letter
    
    # Title
    c.setFont("Helvetica-Bold", 16)
    c.drawString(220, height - 80, "CHARACTER CERTIFICATE")
    
    c.setFont("Helvetica", 12)
    c.drawString(50, height - 130, "I certify that Mr./Mrs./Miss")
    
    c.acroForm.textfield(name='person_name', tooltip='Applicant Name',
                         x=210, y=height - 135, width=300, height=15)
                         
    c.drawString(50, height - 160, "Son/Wife/Daughter of Mr.")
    
    c.acroForm.textfield(name='relative_name', tooltip='Relative Name',
                         x=210, y=height - 165, width=300, height=15)
                         
    c.drawString(50, height - 190, "is known to me for the last")
    
    c.acroForm.textfield(name='known_years', tooltip='Years Known',
                         x=210, y=height - 195, width=50, height=15)
                         
    c.drawString(270, height - 190, "year and to the best of my knowledge and belief,")
    c.drawString(50, height - 210, "he/she has never been prosecuted/convicted by any court of law.")
    
    c.drawString(50, height - 250, "There is nothing against him/her that would render him/her unsuitable for Government Service.")
    
    c.drawString(300, height - 330, "Signature: ______________________")
    
    c.drawString(300, height - 370, "Name (in block letters):")
    c.acroForm.textfield(name='verifier_name', tooltip='Verifier Name',
                         x=440, y=height - 375, width=120, height=15)
                         
    c.drawString(300, height - 410, "Designation:")
    c.acroForm.textfield(name='designation', tooltip='Designation',
                         x=380, y=height - 415, width=180, height=15)
                         
    c.drawString(50, height - 500, "Place:")
    c.acroForm.textfield(name='place', tooltip='Place',
                         x=90, y=height - 505, width=150, height=15)
                         
    c.drawString(50, height - 540, "Date:")
    c.acroForm.textfield(name='date', tooltip='Date',
                         x=90, y=height - 545, width=150, height=15)
                         
    c.save()

generate_character_certificate()
