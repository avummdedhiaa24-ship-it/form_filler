from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from rag_engine import answer

app = FastAPI()


@app.get("/")
def root():
    return {"status": "running"}


@app.get("/v1/models")
def list_models():
    return {
        "object": "list",
        "data": [
            {
                "id": "CollegeRAG",
                "object": "model",
                "owned_by": "local"
            }
        ]
    }


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    model: str
    messages: List[Message]


@app.post("/v1/chat/completions")
def chat(request: ChatRequest):

    question = request.messages[-1].content

    response = answer(question)

    return {
        "id": "chatcmpl-local",
        "object": "chat.completion",
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": response
                },
                "finish_reason": "stop"
            }
        ]
    }