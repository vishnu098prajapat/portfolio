
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import HomeSection from '@/components/sections/home-section';
import AboutSection from '@/components/sections/about-section';
import SkillsSection from '@/components/sections/skills-section';
import ProjectsSection from '@/components/sections/projects-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HomeSection />
        <AboutSection />
        <div className="relative z-10">
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
