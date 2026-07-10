import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import DepartmentsSection from '../components/DepartmentsSection';
import CareersSection from '../components/CareersSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Chatbot from '../components/chatbot/Chatbot';

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <DepartmentsSection />
        <CareersSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default Home;
