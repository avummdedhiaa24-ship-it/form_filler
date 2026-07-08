import { FiDownload, FiExternalLink, FiFileText } from 'react-icons/fi';

function formatTimestamp(date) {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function AttachmentList({ attachments = [], links = [] }) {
  if (!attachments.length && !links.length) return null;

  return (
    <div className="mt-3 grid gap-2">
      {attachments.map((item, index) => (
        <a
          key={`${item.title || item.name || 'attachment'}-${index}`}
          href={item.url || '#'}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700"
        >
          <FiFileText className="text-blue-600" />
          <span className="flex-1 truncate">{item.title || item.name || 'Document'}</span>
          <FiDownload />
        </a>
      ))}
      {links.map((item, index) => (
        <a
          key={`${item.title || item.url || 'link'}-${index}`}
          href={item.url || '#'}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700"
        >
          <FiExternalLink className="text-blue-600" />
          <span className="flex-1 truncate">{item.title || item.url || 'Website link'}</span>
        </a>
      ))}
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[86%] sm:max-w-[78%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
            isUser
              ? 'rounded-br-md bg-blue-600 text-white'
              : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
          }`}
        >
          {message.content}
          <AttachmentList attachments={message.attachments} links={message.links} />
        </div>
        <span className="mt-1 px-1 text-[11px] font-medium text-slate-400">{formatTimestamp(message.createdAt)}</span>
      </div>
    </div>
  );
}

export default MessageBubble;
