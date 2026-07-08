import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { heroImage } from '../assets/illustrations';
import { stats } from '../data/siteContent';

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),linear-gradient(135deg,#f8fbff_0%,#eef6ff_48%,#ffffff_100%)] pt-28">
      <div className="section-shell grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[1fr_0.92fr] lg:py-20">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <FiBookOpen />
            AI-enabled campus support
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Welcome to XYZ College
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Empowering Students Through Quality Education
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#admissions"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Apply Now
              <FiArrowRight />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
            >
              Explore Courses
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
                <p className="text-2xl font-bold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px]">
          <div className="absolute -right-12 top-0 h-52 w-52 rounded-full bg-sky-200/50 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-panel">
            <img
              src={heroImage}
              alt="Students studying together on campus"
              className="h-[420px] w-full rounded-[1.5rem] object-cover sm:h-[520px]"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-white/92 p-5 shadow-soft backdrop-blur">
              <p className="text-sm font-semibold text-blue-600">Ask the AI College Assistant</p>
              <p className="mt-2 text-lg font-bold text-slate-950">Admissions, fees, placements, hostel and more.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
