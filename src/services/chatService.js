import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const chatClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 210000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function normalizeBotResponse(data) {
  if (typeof data === "string") {
    return {
      text: data,
      attachments: [],
      links: [],
    };
  }

  const payload =
    data?.type === "pdf"
      ? data
      : data?.response && typeof data.response === "object"
      ? data.response
      : data;

  // Handle PDF download responses
  if (payload?.type === "pdf") {
    return {
      text: payload.response,
      attachments: [],
      links: [
        {
          title: "📄 Download PDF",
          url: payload.url,
        },
      ],
      raw: data,
    };
  }

  const text =
    data?.response ??
    data?.answer ??
    data?.message ??
    data?.text ??
    data?.content ??
    "I received a response, but could not find readable text.";

  return {
    text: typeof text === "string" ? text : JSON.stringify(text, null, 2),
    blocks: data?.blocks || [],
    attachments: data?.attachments || data?.documents || [],
    links: data?.links || [],
    raw: data,
  };
}

export async function sendChatMessage(question) {
  const { data } = await chatClient.post('/chat', { question });
  return normalizeBotResponse(data);
}

export async function submitStudentFormData(payload) {
  const { data } = await chatClient.post('/generate-student-form', payload);
  return normalizeBotResponse(data);
}
