import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BuyEBookModal } from './components/BuyEBookModal';
import { JoharWelcomeModal } from './components/JoharWelcomeModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { UserAuthModal } from './components/UserAuthModal';
import { LegalPolicyModal, PolicyType } from './components/LegalPolicyModal';

export default function App() {
  const [isBuyEBookOpen, setIsBuyEBookOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isUserAuthOpen, setIsUserAuthOpen] = useState(false);
  // Pure responsive pop-up message on page load (mobile & desktop)
  const [isJoharOpen, setIsJoharOpen] = useState(true);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>('privacy');

  // Hidden admin panel triggers:
  // 1. URL hash: e.g. #admin
  // 2. Query param: e.g. ?admin=true or ?admin
  // 3. Keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const checkAdminInUrl = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === '#admin' || hash === '#/admin' || search.includes('admin')) {
        setIsAdminOpen(true);
      }
    };

    checkAdminInUrl();
    window.addEventListener('hashchange', checkAdminInUrl);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminInUrl);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenPolicy = (policy: PolicyType) => {
    setActivePolicy(policy);
    setIsPolicyOpen(true);
  };

  const handlePaymentRedirect = () => {
    setIsBuyEBookOpen(false);
    const homeEl = document.getElementById('home');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="karam-utsav-app" className="min-h-screen flex flex-col bg-[#F4F8F4] text-[#14361B]">
      {/* 1. Header Navigation: Home, Gallery, Contact Us, Buy E-Book, Sign In, Admin */}
      <Navbar
        onOpenBuyEBook={() => setIsBuyEBookOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenUserAuth={() => setIsUserAuthOpen(true)}
      />

      {/* Main Streamlined Page Flow */}
      <main className="flex-1">
        {/* Home Section: Clear Karam Puja information, significance & photo */}
        <Hero
          onOpenBuyEBook={() => setIsBuyEBookOpen(true)}
        />

        {/* Gallery Section: Authentic photos of Karam Puja, including 10 girls in Jhumur dress */}
        <GallerySection />

        {/* Simple & Clean Contact Us Section */}
        <ContactSection />
      </main>

      {/* Clean Footer with Social Media, Navigation & Policy Pages */}
      <Footer
        onOpenBuyEBook={() => setIsBuyEBookOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenUserAuth={() => setIsUserAuthOpen(true)}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Johar Cultural Welcome Modal: Responsive on mobile, simple, single-word greeting & 10 Jhumur girls image */}
      <JoharWelcomeModal
        isOpenExternal={isJoharOpen}
        onCloseExternal={() => setIsJoharOpen(false)}
      />

      {/* Buy E-Book Modal */}
      <BuyEBookModal
        isOpen={isBuyEBookOpen}
        onClose={() => setIsBuyEBookOpen(false)}
        onPaymentCompleteRedirect={handlePaymentRedirect}
      />

      {/* Backend Admin Central Dashboard for Sankar Jhora */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onOpenUserSignIn={() => {
          setIsAdminOpen(false);
          setIsUserAuthOpen(true);
        }}
      />

      {/* Reader Sign In & Account Management Modal */}
      <UserAuthModal
        isOpen={isUserAuthOpen}
        onClose={() => setIsUserAuthOpen(false)}
        onOpenBuyModal={() => setIsBuyEBookOpen(true)}
      />

      {/* Professional Legal Policy Modal */}
      <LegalPolicyModal
        isOpen={isPolicyOpen}
        initialPolicy={activePolicy}
        onClose={() => setIsPolicyOpen(false)}
      />
    </div>
  );
}
