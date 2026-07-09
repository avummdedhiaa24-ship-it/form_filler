from rag_engine import check_student_form_request


def test_detects_student_form_requests():
    assert check_student_form_request("Give me the student form") is True
    assert check_student_form_request("Student Details Form") is True
    assert check_student_form_request("Please fill the student registration form") is True


def test_ignores_other_queries():
    assert check_student_form_request("Tell me about admissions") is False
    assert check_student_form_request("Hello there") is False
