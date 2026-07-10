import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { navigation } from '../data/siteContent';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-3" aria-label="XYZ Corp home">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-soft">
            XYZ
          </div>
          <div>
            <p className="text-lg font-bold leading-tight text-slate-950">XYZ Corp</p>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-blue-600">Since 1994</p>
          </div>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#admissions"
          className="hidden rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-700 lg:inline-flex"
        >
          Apply Now
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="section-shell flex flex-col gap-2 py-4">
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
