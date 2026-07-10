import { FiBookOpen, FiLifeBuoy, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { quickLinks, socialLinks } from '../data/siteContent';

function Footer() {
  return (
    <footer className="bg-slate-950 pb-8 pt-16 text-slate-300">
      <div className="section-shell grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-bold text-white">XYZ</div>
            <div>
              <p className="font-bold text-white">XYZ Corp</p>
              <p className="text-sm text-slate-400">Empowering Professionals Through Innovation</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
            A professional enterprise website powered by an AI assistant for careers, departments, benefits, facilities,
            and employee support.
          </p>
        </div>

        <div>
          <h4 className="mb-5 font-bold text-white">Quick Links</h4>
          <ul className="grid gap-3">
            {quickLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-slate-400 transition hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-bold text-white">Connect</h4>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-slate-400 transition hover:bg-blue-600 hover:text-white"
                aria-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
        Copyright © {new Date().getFullYear()} XYZ Corp. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
