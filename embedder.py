from pathlib import Path

import chromadb
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer


# -----------------------------
# CONFIG
# -----------------------------
DOCUMENT_FOLDER = "document"
CHROMA_PATH = "chroma_db"
COLLECTION_NAME = "college_docs"

CHUNK_SIZE = 800
CHUNK_OVERLAP = 150

EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"


# -----------------------------
# LOAD EMBEDDING MODEL
# -----------------------------
print("Loading embedding model...")
model = SentenceTransformer(EMBEDDING_MODEL)

# -----------------------------
# CREATE / CONNECT CHROMADB
# -----------------------------
client = chromadb.PersistentClient(path=CHROMA_PATH)

collection = client.get_or_create_collection(
    name=COLLECTION_NAME
)

print("Resetting Chroma collection from current PDFs...")
client.delete_collection(
    name=COLLECTION_NAME
)
collection = client.get_or_create_collection(
    name=COLLECTION_NAME
)

# -----------------------------
# TEXT SPLITTER
# -----------------------------
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=CHUNK_SIZE,
    chunk_overlap=CHUNK_OVERLAP
)

# -----------------------------
# PROCESS PDFS
# -----------------------------
pdf_folder = Path(DOCUMENT_FOLDER)

for pdf_file in pdf_folder.glob("*.pdf"):

    print(f"\nProcessing: {pdf_file.name}")

    reader = PdfReader(str(pdf_file))

    all_chunks = []
    all_ids = []
    all_metadata = []

    chunk_counter = 0

    for page_number, page in enumerate(reader.pages):

        text = page.extract_text()

        if not text:
            continue

        chunks = text_splitter.split_text(text)

        for chunk in chunks:

            chunk_id = f"{pdf_file.stem}_{page_number}_{chunk_counter}"

            all_chunks.append(chunk)

            all_ids.append(chunk_id)

            all_metadata.append(
                {
                    "source": pdf_file.name,
                    "page": page_number + 1
                }
            )

            chunk_counter += 1

    if len(all_chunks) == 0:
        print("No text found.")
        continue

    print(f"Generated {len(all_chunks)} chunks")

    embeddings = model.encode(
        all_chunks,
        show_progress_bar=True
    ).tolist()

    collection.upsert(
        ids=all_ids,
        documents=all_chunks,
        embeddings=embeddings,
        metadatas=all_metadata
    )

    print(f"Stored {len(all_chunks)} chunks in ChromaDB")


print("\nEmbedding completed successfully!")
