import SectionHeader from './SectionHeader';
import { features } from '../data/siteContent';

function AboutSection() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="About XYZ Corp"
          title="Building the future with technology and talent."
          description="Our corporate ecosystem combines strong fundamentals, innovative projects, employee support, and partnerships that help professionals grow with confidence."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-soft"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-700">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
