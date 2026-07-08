import { FiMic, FiPaperclip, FiSend } from 'react-icons/fi';

function ChatInput({ value, onChange, onSubmit, disabled }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="border-t border-slate-200 bg-white p-3">
      <div className="flex items-end gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-2 focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-sm">
        <button
          type="button"
          aria-label="Attach file"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-blue-700"
        >
          <FiPaperclip size={18} />
        </button>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask about admissions, fees, courses..."
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm leading-6 text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="button"
          aria-label="Voice input"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-blue-700"
        >
          <FiMic size={18} />
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
