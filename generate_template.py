import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

def create_form():
    output_path = os.path.join("document", "character_certificate.pdf")
    c = canvas.Canvas(output_path, pagesize=letter)
    
    # Title
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(300, 750, "CHARACTER CERTIFICATE")
    c.line(200, 745, 400, 745)
    
    c.setFont("Helvetica", 12)
    
    c.drawString(50, 680, "I certify that Mr./Mrs./Miss")
    c.drawString(50, 650, "Son/Wife/Daughter of Mr.")
    c.drawString(50, 620, "is known to me for the last")
    c.drawString(250, 620, "year and to the best of my knowledge and belief,")
    c.drawString(50, 600, "he/she has never been prosecuted/convicted by any court of law.")
    
    c.drawString(50, 560, "There is nothing against him/her that would render him/her unsuitable for Government Service.")
    
    c.drawString(350, 480, "Signature:")
    c.drawString(350, 440, "Name:")
    c.drawString(380, 420, "(In block letters)")
    c.drawString(350, 390, "Designation (with seal of office)")
    
    c.drawString(50, 320, "Place:")
    c.drawString(50, 280, "Date:")
    
    # Text Fields
    form = c.acroForm
    
    form.textfield(name='applicant_name', tooltip='Applicant Name',
                   x=210, y=675, width=330, height=18,
                   borderStyle='underlined', fillColor=None, borderColor=None)
                   
    form.textfield(name='parent_name', tooltip='Parent Name',
                   x=200, y=645, width=340, height=18,
                   borderStyle='underlined', fillColor=None, borderColor=None)
                   
    form.textfield(name='years_known', tooltip='Years Known',
                   x=200, y=615, width=45, height=18,
                   borderStyle='underlined', fillColor=None, borderColor=None)

    form.textfield(name='signee_name', tooltip='Signee Name',
                   x=390, y=435, width=160, height=18,
                   borderStyle='underlined', fillColor=None, borderColor=None)

    form.textfield(name='designation', tooltip='Designation',
                   x=350, y=365, width=200, height=18,
                   borderStyle='underlined', fillColor=None, borderColor=None)

    form.textfield(name='place', tooltip='Place',
                   x=90, y=315, width=150, height=18,
                   borderStyle='underlined', fillColor=None, borderColor=None)

    form.textfield(name='date', tooltip='Date',
                   x=90, y=275, width=150, height=18,
                   borderStyle='underlined', fillColor=None, borderColor=None)

    # Footer section
    c.line(50, 240, 550, 240)
    c.drawString(50, 220, "(Two separate certificates signed by any two of the following)")
    c.drawString(50, 195, "1. Gazetted Officer of the Central Government")
    c.drawString(50, 175, "2. Member of Parliament or State Legislatures")
    c.drawString(50, 155, "3. District Magistrates or Sub-Divisional Magistrates")
    c.drawString(50, 135, "4. Tehsildars or Deputy Tehsildars, authorised to exercise Magesterial powers")
    c.drawString(50, 115, "5. Principals of the recognised Educational Institutions last attended.")

    c.save()
    print(f"Successfully generated {output_path}")

if __name__ == "__main__":
    create_form()
