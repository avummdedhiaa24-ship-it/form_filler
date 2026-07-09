import chromadb
import requests
from sentence_transformers import SentenceTransformer

# -----------------------------
# CONFIG
# -----------------------------

CHROMA_PATH = "chroma_db"
COLLECTION_NAME = "college_docs"

EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"

MODEL_NAME = "docker.io/ai/qwen2.5:3B-Q4_K_M"
QWEN_URL = "http://localhost:12434/v1/chat/completions"

QWEN_TIMEOUT = 180
MAX_TOKENS = 250

TOP_K = 3
MAX_CONTEXT_CHARS = 900

# TEMPORARILY KEEP HIGH FOR DEBUGGING
DISTANCE_THRESHOLD = 2.0

# -----------------------------
# LOAD ONCE
# -----------------------------

print("Loading RAG Engine...")

embedder = SentenceTransformer(
    EMBEDDING_MODEL
)

client = chromadb.PersistentClient(
    path=CHROMA_PATH
)

collection = client.get_collection(
    name=COLLECTION_NAME
)

print("RAG Engine Ready")

# -----------------------------
# QWEN API CALL
# -----------------------------

def call_qwen(messages, temperature):

    payload = {
        "model": MODEL_NAME,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": MAX_TOKENS,
        "stream": False
    }

    print("\n========== CALLING QWEN ==========")
    print("URL:", QWEN_URL)
    print("MODEL:", MODEL_NAME)
    print("PAYLOAD:", payload)

    try:
        response = requests.post(
            QWEN_URL,
            json=payload,
            timeout=QWEN_TIMEOUT
        )

        print("\n========== RESPONSE RECEIVED ==========")
        print("Status Code:", response.status_code)
        print("Response Text:")
        print(response.text)

        response.raise_for_status()

        data = response.json()

        print("\n========== JSON ==========")
        print(data)

        return data["choices"][0]["message"]["content"]

    except requests.exceptions.ReadTimeout:
        print("\nERROR: Request timed out.")
        raise RuntimeError(
            "Qwen did not return a response in time. "
            "Increase QWEN_TIMEOUT or verify the model is fully loaded."
        )

    except requests.exceptions.ConnectionError as exc:
        print("\nERROR: Could not connect to Qwen.")
        print(exc)
        raise RuntimeError(
            "Could not connect to Qwen. "
            "Start Docker Model Runner or update QWEN_URL in rag_engine.py."
        ) from exc

    except requests.exceptions.HTTPError as exc:
        print("\nERROR: HTTP Error")
        print("Status:", response.status_code)
        print("Body:", response.text)
        raise

    except Exception as exc:
        print("\n========== UNKNOWN ERROR ==========")
        print(type(exc).__name__)
        print(exc)
        raise

# -----------------------------
# GENERAL CHAT
# -----------------------------

def general_chat(query):

    return call_qwen(
        messages=[
            {
                "role": "user",
                "content": query
            }
        ],
        temperature=0.7
    )

# -----------------------------
# SMALL TALK
# -----------------------------

def is_small_talk(query):

    small_talk_phrases = {
        "hi",
        "hello",
        "hey",
        "hii",
        "heyy",
        "good morning",
        "good afternoon",
        "good evening",
        "how are you",
        "who are you",
        "what can you do",
        "thanks",
        "thank you",
        "bye"
    }

    return query.lower().strip() in small_talk_phrases

# -----------------------------
# STUDENT FORM REQUESTS
# -----------------------------


def check_student_form_request(query):

    query = query.lower()
    student_form_phrases = [
        "student form",
        "student details form",
        "student registration form"
    ]

    return any(phrase in query for phrase in student_form_phrases)


# -----------------------------
# DOWNLOAD REQUESTS
# -----------------------------

DOWNLOADABLE_FILES = {
    "application form": {
        "filename": "application_form.pdf",
        "response": "You can download the Admission Form below.",
    },
    "admission form": {
        "filename": "application_form.pdf",
        "response": "You can download the Admission Form below.",
    },
    "hostel form": {
        "filename": "hostel_form.pdf",
        "response": "You can download the Hostel Form below.",
    },
    "hostel application": {
        "filename": "hostel_form.pdf",
        "response": "You can download the Hostel Form below.",
    },
}


def check_download_request(query):

    query = query.lower()

    for phrase, file_info in DOWNLOADABLE_FILES.items():
        if phrase in query:
            return {
                "type": "pdf",
                "response": file_info["response"],
                "url": f"http://localhost:8000/download/{file_info['filename']}"
            }

    return None


# -----------------------------
# DOCUMENT QUERY DETECTOR
# -----------------------------
# -----------------------------

def is_document_query(query):

    document_keywords = [
        "abc college",
        "admission",
        "admissions",
        "admission handbook",
        "admission process",
        "application",
        "apply",
        "college",
        "about the college",
        "programme",
        "programmes",
        "program",
        "programs",
        "b.tech",
        "btech",
        "bba",
        "bca",
        "b.com",
        "bcom",
        "b.a",
        "bachelor of arts",
        "b.sc",
        "bsc",
        "m.tech",
        "mtech",
        "mba",
        "mca",
        "m.com",
        "mcom",
        "m.a",
        "master of arts",
        "m.sc",
        "msc",
        "offered",
        "eligibility",
        "criteria",
        "documents required",
        "required documents",
        "important dates",
        "dates",
        "deadline",
        "fee",
        "fees",
        "fee structure",
        "payment",
        "payment schedule",
        "scholarship",
        "scholarships",
        "financial aid",
        "reservation",
        "reservation policy",
        "refund",
        "cancellation",
        "rules",
        "regulations",
        "attendance",
        "exam",
        "exams",
        "code of conduct",
        "grievance",
        "hostel",
        "transport",
        "faq",
        "faqs",
        "contact",
        "subject",
        "subjects",
        "syllabus",
        "semester",
        "course",
        "unit",
        "chapter",
        "topic",
        "pdf",
        "document",
        "page",
        "machine learning",
        "big data",
        "cryptography"
    ]

    query = query.lower()

    return any(
        keyword in query
        for keyword in document_keywords
    )

# -----------------------------
# MAIN RAG FUNCTION
# -----------------------------

def answer(query):

    query = query.strip()

    print("\n" + "=" * 60)
    print("QUESTION:")
    print(query)
    print("=" * 60)

    if check_student_form_request(query):
        print("STUDENT FORM REQUEST DETECTED")
        return {
            "type": "student_form",
            "response": "Sure! I'll help you fill the Student Details Form.\n\nWhat is your Name?"
        }

    # Download requests take priority

    download = check_download_request(query)
    if download:
        print("DOWNLOAD REQUEST DETECTED")
        return download

    # Small talk always goes to LLM

    if is_small_talk(query):
        print("SMALL TALK DETECTED")
        return general_chat(query)

    if not is_document_query(query):
        print("GENERAL QUESTION DETECTED")
        return general_chat(query)

    # -----------------------------
    # EMBED QUERY
    # -----------------------------

    query_embedding = embedder.encode(
        query
    ).tolist()

    # -----------------------------
    # RETRIEVE
    # -----------------------------

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=TOP_K,
        include=[
            "documents",
            "metadatas",
            "distances"
        ]
    )

    docs = results["documents"][0]
    distances = results["distances"][0]

    print("\nDISTANCES:")
    print(distances)

    if len(docs) == 0:

        print("\nNO DOCUMENTS FOUND")
        return general_chat(query)

    print("\nFIRST RETRIEVED CHUNK:")
    print("-" * 50)
    print(docs[0][:500])
    print("-" * 50)

    best_distance = distances[0]

    print(f"\nBEST DISTANCE = {best_distance}")

    # -----------------------------
    # LOW CONFIDENCE
    # -----------------------------

    if best_distance > DISTANCE_THRESHOLD:

        print("\nLOW CONFIDENCE RETRIEVAL")
        print("USING GENERAL QWEN")

        return general_chat(query)

    # -----------------------------
    # BUILD CONTEXT
    # -----------------------------

    context_parts = []
    remaining_chars = MAX_CONTEXT_CHARS

    for doc in docs:
        if remaining_chars <= 0:
            break

        chunk = doc[:remaining_chars]
        context_parts.append(chunk)
        remaining_chars -= len(chunk)

    context = "\n\n".join(context_parts)

    # -----------------------------
    # RAG PROMPT
    # -----------------------------

    prompt = f"""
Answer using only the context below.
If the answer is not present, say:
Information not found in documents.

Context:
{context}

Question:
{query}
"""

    answer_text = call_qwen(
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1
    )

    print("\nRAG RESPONSE GENERATED")

    return answer_text
