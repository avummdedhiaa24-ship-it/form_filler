function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm">
      <span>Thinking</span>
      <span className="flex gap-1">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-blue-500"
            style={{ animationDelay: `${dot * 0.16}s` }}
          />
        ))}
      </span>
    </div>
  );
}

export default TypingIndicator;
