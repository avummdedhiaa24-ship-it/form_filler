import { quickLinks, socialLinks } from '../data/siteContent';

function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="section-shell grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-bold">XYZ</div>
            <div>
              <p className="font-bold">XYZ College</p>
              <p className="text-sm text-slate-400">Empowering Students Through Quality Education</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
            A professional college website powered by an AI assistant for admissions, courses, fees, campus facilities,
            scholarships, placements, and student support.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-300">Quick Links</h3>
          <div className="mt-5 grid gap-3">
            {quickLinks.map((link) => (
              <a key={link} href="#home" className="text-sm text-slate-400 transition hover:text-white">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-300">Social Media</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map(({ label, icon: Icon }) => (
              <button
                type="button"
                key={label}
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-700 text-slate-300 transition hover:border-blue-400 hover:bg-blue-600 hover:text-white"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
        Copyright © {new Date().getFullYear()} XYZ College. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
