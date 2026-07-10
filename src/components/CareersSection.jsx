import { FiCheckCircle, FiUsers, FiCalendar } from 'react-icons/fi';
import SectionHeader from './SectionHeader';

const careerItems = [
  {
    title: 'Hiring Process',
    description: 'Apply online, attend interviews, and receive your offer letter after background verification.',
    icon: FiCheckCircle,
  },
  {
    title: 'Eligibility',
    description: 'Candidates should meet the required skills and experience published for the respective roles.',
    icon: FiUsers,
  },
  {
    title: 'Important Dates',
    description: 'Application windows, assessment rounds, and onboarding dates are updated regularly.',
    icon: FiCalendar,
  },
];

function CareersSection() {
  return (
    <section id="careers" className="bg-white py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Careers"
          title="Join our dynamic and innovative team."
          description="We are constantly looking for talented professionals to help shape the future of XYZ Corp."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {careerItems.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">Ready to join?</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-button"
            >
              Open Roles
            </button>
            <p className="text-sm font-medium text-slate-500">
              Use the AI Office Assistant for instant guidance, or send an enquiry to our HR team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersSection;
