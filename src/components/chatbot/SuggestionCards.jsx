const defaultSuggestions = [
  'HR Policies',
  'Leave Rules',
  'IT Support',
  'Onboarding',
  'Employee Benefits',
  'Job Application Form',
];

function SuggestionCards({ onSelect, disabled }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {defaultSuggestions.map((suggestion) => (
        <button
          type="button"
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          disabled={disabled}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left text-xs font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

export default SuggestionCards;
