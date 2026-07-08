import { FiArrowRight } from 'react-icons/fi';
import { courses } from '../data/siteContent';
import SectionHeader from './SectionHeader';

function CoursesSection() {
  return (
    <section id="courses" className="bg-slate-50 py-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Courses"
          title="Programs designed for strong technical foundations and career momentum."
          description="Explore engineering streams with labs, project-based learning, and guidance from experienced faculty."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={course.image}
                  alt={`${course.title} students and lab environment`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-950">{course.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">{course.description}</p>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                >
                  Learn More
                  <FiArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;
