import { contactInfo } from '../data/siteContent';
import SectionHeader from './SectionHeader';

function ContactSection() {
  return (
    <section id="contact" className="bg-slate-50 py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Contact Us"
          title="Get in touch"
          description="For careers, technical support, and general enquiries, connect with XYZ Corp through the details below."
        />
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4">
            {contactInfo.map(({ label, value, icon: Icon }) => (
              <article key={label} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">{label}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{value}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex h-full min-h-[360px] items-center justify-center bg-[linear-gradient(135deg,#e0f2fe_0%,#f8fafc_50%,#dbeafe_100%)] p-8 text-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">Google Maps</p>
                <h3 className="mt-3 text-2xl font-bold text-slate-950">Campus Location Placeholder</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                  Embed your official Google Maps iframe here when the production campus location is finalized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
