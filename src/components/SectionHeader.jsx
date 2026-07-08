function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={`mb-12 flex flex-col ${alignment}`}>
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

export default SectionHeader;
