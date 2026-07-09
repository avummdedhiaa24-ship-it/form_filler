import { useMemo, useState } from 'react';
import { FiMaximize2, FiMessageCircle, FiMinimize2, FiRefreshCw, FiX } from 'react-icons/fi';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { sendChatMessage, submitStudentFormData } from '../../services/chatService';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import SuggestionCards from './SuggestionCards';
import TypingIndicator from './TypingIndicator';

const welcomeMessage = `Hi 👋

I'm your AI College Assistant.

I can help you with:

• Admission Process
• Courses
• Fees
• Hostel
• Scholarships
• Placements
• Timetable
• Examination

Ask me anything.`;

const initialMessages = [
  {
    id: 'welcome',
    role: 'assistant',
    content: welcomeMessage,
    createdAt: new Date(),
  },
];

function createMessage(role, content, extra = {}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    createdAt: new Date(),
    ...extra,
  };
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studentForm, setStudentForm] = useState({
    active: false,
    step: 0,
    data: {
      name: '',
      rollNo: '',
      email: '',
    },
  });
  const scrollRef = useAutoScroll();

  const panelSize = useMemo(
    () =>
      isExpanded
        ? 'bottom-4 right-4 h-[min(820px,calc(100vh-2rem))] w-[min(760px,calc(100vw-2rem))]'
        : 'bottom-4 right-4 h-[min(700px,calc(100vh-2rem))] w-[min(430px,calc(100vw-2rem))] resize overflow-hidden',
    [isExpanded],
  );

  async function submitMessage(text = input) {
    const question = text.trim();
    if (!question || isLoading) return;

    setInput('');
    setIsLoading(true);
    setMessages((current) => [...current, createMessage('user', question)]);

    if (studentForm.active) {
      if (studentForm.step === 1) {
        setStudentForm((current) => ({
          ...current,
          step: 2,
          data: {
            ...current.data,
            name: question,
          },
        }));
        setMessages((current) => [...current, createMessage('assistant', 'What is your Roll Number?')]);
        setIsLoading(false);
        return;
      }

      if (studentForm.step === 2) {
        setStudentForm((current) => ({
          ...current,
          step: 3,
          data: {
            ...current.data,
            rollNo: question,
          },
        }));
        setMessages((current) => [...current, createMessage('assistant', 'What is your Email ID?')]);
        setIsLoading(false);
        return;
      }

      if (studentForm.step === 3) {
        const payload = {
          name: studentForm.data.name,
          roll_no: studentForm.data.rollNo,
          email_id: question,
        };

        setStudentForm({
          active: false,
          step: 0,
          data: {
            name: '',
            rollNo: '',
            email: '',
          },
        });

        try {
          const response = await submitStudentFormData({
            name: payload.name,
            roll_no: payload.roll_no,
            email_id: payload.email_id,
          });
          setMessages((current) => [
            ...current,
            createMessage('assistant', response.text, {
              attachments: response.attachments,
              links: response.links,
              blocks: response.blocks,
              raw: response.raw,
            }),
          ]);
        } catch {
          setMessages((current) => [
            ...current,
            createMessage('assistant', 'Unable to generate your Student Form right now.'),
          ]);
        } finally {
          setIsLoading(false);
        }
        return;
      }
    }

    try {
      const response = await sendChatMessage(question);

      if (response.raw?.type === 'student_form') {
        setStudentForm({
          active: true,
          step: 1,
          data: {
            name: '',
            rollNo: '',
            email: '',
          },
        });
      }

      setMessages((current) => [
        ...current,
        createMessage('assistant', response.text, {
          attachments: response.attachments,
          links: response.links,
          blocks: response.blocks,
          raw: response.raw,
        }),
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        createMessage('assistant', 'Unable to connect to AI Assistant.'),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function clearChat() {
    setMessages([
      {
        ...initialMessages[0],
        createdAt: new Date(),
      },
    ]);
    setStudentForm({
      active: false,
      step: 0,
      data: {
        name: '',
        rollNo: '',
        email: '',
      },
    });
    setInput('');
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-blue-600 text-white shadow-panel transition hover:-translate-y-1 hover:bg-blue-700 ${
          isOpen ? 'pointer-events-none scale-95 opacity-0' : 'opacity-100'
        }`}
        aria-label="Open AI College Assistant"
      >
        <FiMessageCircle size={28} />
      </button>

      {isOpen && (
        <aside
          className={`fixed z-50 flex min-h-[520px] min-w-[320px] max-w-[calc(100vw-2rem)] flex-col rounded-[1.75rem] border border-slate-200 bg-white shadow-panel ${panelSize}`}
          aria-label="AI College Assistant chat window"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white">
                <FiMessageCircle size={21} />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-slate-950">AI College Assistant</h2>
                <p className="text-xs font-medium text-emerald-600">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"
                aria-label="Clear chat"
                title="Clear Chat"
              >
                <FiRefreshCw size={17} />
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded((value) => !value)}
                className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"
                aria-label={isExpanded ? 'Minimize chat window' : 'Expand chat window'}
                title={isExpanded ? 'Minimize' : 'Resize'}
              >
                {isExpanded ? <FiMinimize2 size={17} /> : <FiMaximize2 size={17} />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
                aria-label="Close chat"
                title="Close"
              >
                <FiX size={19} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-5">
            {messages.map((message, index) => (
              <div key={message.id}>
                <MessageBubble message={message} />
                {index === 0 && (
                  <div className="mt-4">
                    <SuggestionCards onSelect={submitMessage} disabled={isLoading} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && <TypingIndicator />}
          </div>

          <ChatInput value={input} onChange={setInput} onSubmit={() => submitMessage()} disabled={isLoading} />
        </aside>
      )}
    </>
  );
}

export default Chatbot;
