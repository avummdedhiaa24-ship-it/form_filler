import AboutSection from '../components/AboutSection';
import AdmissionsSection from '../components/AdmissionsSection';
import Chatbot from '../components/chatbot/Chatbot';
import ContactSection from '../components/ContactSection';
import CoursesSection from '../components/CoursesSection';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <CoursesSection />
        <AdmissionsSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default Home;
