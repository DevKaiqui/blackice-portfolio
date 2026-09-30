import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PgpModal } from './components/PgpModal';
import { HoneypotModal } from './components/HoneypotModal';
import { ScannerModal } from './components/ScannerModal';
import { TopologyModal } from './components/TopologyModal';
import { CvModal } from './components/CvModal';
import { ImageGalleryModal } from './components/ImageGalleryModal';
import { LoginModal } from './components/LoginModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [pgpOpen, setPgpOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [honeypotOpen, setHoneypotOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [topologyOpen, setTopologyOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLab = (labId: string) => {
    if (labId === 'honeypot') setHoneypotOpen(true);
    else if (labId === 'scanner') setScannerOpen(true);
    else if (labId === 'topology') setTopologyOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Section spy
      const sections = ['hero', 'sobre', 'skills', 'projetos', 'credenciais', 'contato'];
      const scrollPos = window.scrollY + 160;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0b12] text-[#e8e8f0] font-sans antialiased overflow-x-hidden selection:bg-[#ffa94d] selection:text-[#3a1a00]">
      {/* Background Matrix & Subtle Gradient Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#14151f_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute -top-48 left-1/4 w-[600px] h-[400px] bg-[#ffa94d]/8 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#4fd1ae]/8 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#ffa94d]/6 rounded-full blur-[150px]"></div>
      </div>

      {/* Main Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPgp={() => setPgpOpen(true)}
        onOpenImageGallery={() => setImageGalleryOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
      />

      {/* Main Body Content */}
      <main className="relative z-10 w-full pt-24">
        {/* Hero Section with Interactive Terminal */}
        <Hero
          onNavigate={handleNavigate}
          onOpenProject={handleOpenLab}
          onOpenPgp={() => setPgpOpen(true)}
          onOpenCv={() => setCvOpen(true)}
        />

        {/* 01 // Sobre Mim */}
        <AboutSection
          onOpenSkills={() => handleNavigate('skills')}
          onOpenProjects={() => handleNavigate('projetos')}
        />

        {/* 02 // Skills Técnicas */}
        <SkillsSection />

        {/* 03 // Labs & Projetos */}
        <ProjectsSection onOpenLab={handleOpenLab} />

        {/* 04 // Credenciais & Aprendizado */}
        <CredentialsSection />

        {/* 05 // Contato Seguro & PGP */}
        <ContactSection
          onOpenPgp={() => setPgpOpen(true)}
          onOpenCv={() => setCvOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPgp={() => setPgpOpen(true)}
        onOpenImageGallery={() => setImageGalleryOpen(true)}
      />

      {/* Floating Action: Back to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-lg bg-[#14151f]/90 border border-[#ffa94d]/50 text-[#ffa94d] hover:bg-[#ffa94d] hover:text-[#3a1a00] shadow-[0_0_20px_rgba(255,169,77,0.3)] transition-all"
          title="Voltar ao Topo"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_upward
          </span>
        </button>
      )}

      {/* Modals */}
      <PgpModal isOpen={pgpOpen} onClose={() => setPgpOpen(false)} />
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
      <HoneypotModal isOpen={honeypotOpen} onClose={() => setHoneypotOpen(false)} />
      <ScannerModal isOpen={scannerOpen} onClose={() => setScannerOpen(false)} />
      <TopologyModal isOpen={topologyOpen} onClose={() => setTopologyOpen(false)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <ImageGalleryModal
        isOpen={imageGalleryOpen}
        onClose={() => setImageGalleryOpen(false)}
      />

      {/* Cookie Consent (LGPD) */}
      <CookieConsentBanner />
    </div>
  );
}
