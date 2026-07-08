import { FiSend } from 'react-icons/fi';
import { admissionItems } from '../data/siteContent';
import SectionHeader from './SectionHeader';

function AdmissionsSection() {
  return (
    <section id="admissions" className="bg-white py-20">
      <div className="section-shell grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Admissions"
            title="Clear steps from application to enrollment."
            description="Use the AI College Assistant for instant guidance, or send an enquiry to our admissions team."
          />
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Admission Enquiry
            <FiSend />
          </a>
        </div>

        <div className="grid gap-5">
          {admissionItems.map(({ title, description, icon: Icon }, index) => (
            <article key={title} className="flex gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-600">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdmissionsSection;
