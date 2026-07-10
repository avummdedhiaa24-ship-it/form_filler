import { FiArrowRight } from 'react-icons/fi';
import { departments } from '../data/siteContent';
import SectionHeader from './SectionHeader';

function DepartmentsSection() {
  return (
    <section id="departments" className="bg-slate-50 py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Departments"
          title="Explore Our Departments"
          description="Explore engineering streams with labs, project-based learning, and guidance from experienced faculty."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((dept) => (
            <article
              key={dept.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={dept.image}
                  alt={`${dept.title} office environment`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-950">{dept.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">{dept.description}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Learn More
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DepartmentsSection;
