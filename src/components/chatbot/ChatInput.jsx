import { FiMic, FiPaperclip, FiSend, FiX } from 'react-icons/fi';
import { useRef, useState } from 'react';

function ChatInput({ value, onChange, onSend, disabled }) {
  const fileInputRef = useRef(null);
  const [attachedFile, setAttachedFile] = useState(null);

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    onSend(value, attachedFile);
    setAttachedFile(null);
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) setAttachedFile(file);
    event.target.value = '';
  }

  return (
    <div className="border-t border-slate-200 bg-white p-3">
      {attachedFile && (
        <div className="mb-2 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
          <span className="truncate font-medium">{attachedFile.name}</span>
          <button type="button" onClick={() => setAttachedFile(null)} className="text-blue-500 hover:text-blue-700">
            <FiX size={16} />
          </button>
        </div>
      )}
      <div className="flex items-end gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-2 focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-sm">
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
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
          placeholder="Ask about policies, benefits, leave..."
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
          onClick={handleSend}
          disabled={disabled || (!value.trim() && !attachedFile)}
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
