# Form Filler AI Agent (RAG-Powered)

An interactive, Retrieval-Augmented Generation (RAG) powered document filler that automates the process of completing and generating official forms. Users can converse with a local AI assistant to collect details, attach their signatures, and download the finished PDFs.

---

## 🚀 Features

- **Interactive AI Chatbot**: Converses with users to gather details required for specific forms.
- **RAG-Powered Context**: Uses a local vector database (ChromaDB) to perform semantic searches on institutional documents.
- **Dynamic PDF Generator**: Automatically fills fields in PDF templates using `reportlab` and `pypdf` and compiles them on the fly.
- **Multiple Form Templates**:
  - Employee Details Form
  - Job Application Form
  - Leave Request Form
  - Character Certificate Form
- **Signature Image Upload**: Allows clients to upload an image of their signature in chat, which is automatically scaled and embedded on the document's signature line.
- **Strict Format Validation & Security**:
  - **Emails**: Rejects invalid email structures.
  - **Mobile Numbers**: Strictly validates mobile lengths (10-15 digits).
  - **Dates**: Enforces exactly `DD/MM/YYYY` format and rejects future dates for retrospective forms (e.g., certificate issuance).

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Vector Store**: ChromaDB (Vector database storing processed college documents)
- **Embeddings**: `BAAI/bge-small-en-v1.5` (via Hugging Face `sentence-transformers`)
- **LLM**: Qwen 2.5 (3B-Q4_K_M) running locally on port `12434`
- **PDF Manipulation**: ReportLab & PyPDF

### Frontend
- **Framework**: React.js + Vite
- **Styling**: Modern CSS / Tailwind CSS (Responsive layout & clean UI/UX)
- **Icons**: React Icons

---

## 💻 Getting Started

### Prerequisites
- Python 3.10+
- Node.js (v18+)
- Local LLM Runner (e.g. Docker / Ollama serving Qwen 2.5)

### Running the Backend

1. Navigate to the root directory.
2. Activate the virtual environment:
   ```bash
   source .venv/bin/activate
   ```
3. Start the FastAPI server using Uvicorn:
   ```bash
   uvicorn api:app --reload --port 8000
   ```

### Running the Frontend

1. Open a new terminal.
2. Install the node packages (if not already done):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the address shown (usually `http://localhost:5173`).

---

## 📂 Project Structure

```text
├── document/                     # PDF templates & generated forms
├── chroma_db/                    # ChromaDB persistent storage
├── src/
│   ├── components/
│   │   └── chatbot/             # Chat widget components (Chatbot, ChatInput, etc.)
│   ├── services/
│   │   └── chatService.js       # Frontend API communication layer
│   └── pages/
│       └── Home.jsx             # Main dashboard
├── api.py                        # FastAPI endpoints
├── agent.py                      # Conversation state machine & validation logic
├── rag_engine.py                 # ChromaDB querying & local LLM prompting
├── embedder.py                   # Document ingestion & embedding generation script
└── README.md
```
