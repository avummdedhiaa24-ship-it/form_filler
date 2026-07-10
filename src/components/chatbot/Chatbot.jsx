import { useEffect, useRef, useState } from 'react';
import { FiMessageCircle, FiMinimize2, FiPaperclip, FiRefreshCw, FiSend, FiX } from 'react-icons/fi';
import { sendChatMessage } from '../../services/chatService';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestionCards from './SuggestionCards';

const INITIAL_MESSAGES = [
  {
    id: '1',
    role: 'assistant',
    content: (
      <>
        Hi 👋
        <br />
        <br />
        I'm your AI Office Assistant.
        <br />
        <br />
        I can help you with:
        <br />
        <br />
        • HR Policies
        <br />
        • Employee Benefits
        <br />
        • IT Support
        <br />
        • Payroll Queries
        <br />
        • Onboarding
        <br />
        • Leave Rules
        <br />
        <br />
        Ask me anything.
      </>
    ),
    timestamp: new Date(),
  },
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = async (text, file) => {
    if (!text?.trim() && !file) return;

    let base64File = null;
    if (file) {
      base64File = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    const displayText = text?.trim() ? text : 'Uploaded a file';
    const newUserMsg = { id: Date.now().toString(), role: 'user', content: displayText, timestamp: new Date() };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(displayText, base64File);
      const rawData = response.raw || response;
      let assistantContent = rawData.response || response.text || "Sorry, I couldn't understand that.";

      if (rawData.type === 'pdf' && rawData.url) {
        assistantContent = (
          <div className="flex flex-col gap-3">
            <p>{rawData.response}</p>
            <a
              href={rawData.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              <FiPaperclip />
              Download Generated PDF
            </a>
          </div>
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantContent,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const panelSize = isMaximized
    ? 'bottom-4 right-4 h-[calc(100vh-2rem)] w-[calc(100vw-2rem)]'
    : 'bottom-5 right-5 h-[680px] max-h-[calc(100vh-2.5rem)] w-[400px] max-w-[calc(100vw-2.5rem)]';

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-blue-600 text-white shadow-panel transition hover:-translate-y-1 hover:bg-blue-700 ${
          isOpen ? 'pointer-events-none scale-95 opacity-0' : 'opacity-100'
        }`}
        aria-label="Open AI Office Assistant"
      >
        <FiMessageCircle size={28} />
      </button>

      {isOpen && (
        <aside
          className={`fixed z-50 flex min-h-[520px] min-w-[320px] max-w-[calc(100vw-2rem)] flex-col rounded-[1.75rem] border border-slate-200 bg-white shadow-panel transition-all duration-300 ${panelSize}`}
          aria-label="AI Office Assistant chat window"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                <FiMessageCircle size={21} />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-slate-950">AI Office Assistant</h2>
                <p className="text-xs font-medium text-emerald-600">Online</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => setMessages(INITIAL_MESSAGES)}
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Reset chat"
                title="Reset chat"
              >
                <FiRefreshCw size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                className="grid h-9 w-9 hidden place-items-center rounded-full transition hover:bg-slate-100 hover:text-slate-600 sm:grid"
                aria-label={isMaximized ? 'Minimize' : 'Maximize'}
                title={isMaximized ? 'Minimize' : 'Maximize'}
              >
                <FiMinimize2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close chat"
                title="Close chat"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 rounded-b-[1.75rem]">
            {messages.length === 1 && (
              <div className="mb-3">
                <SuggestionCards onSelect={handleSend} disabled={isLoading} />
              </div>
            )}
            <ChatInput value={inputValue} onChange={setInputValue} onSend={handleSend} disabled={isLoading} />
          </div>
        </aside>
      )}
    </>
  );
}

export default Chatbot;
