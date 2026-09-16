import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BuyEBookModal } from './components/BuyEBookModal';
import { DownloadModal } from './components/DownloadModal';
import { JoharWelcomeModal } from './components/JoharWelcomeModal';
import { LegalPolicyModal, PolicyType } from './components/LegalPolicyModal';

export default function App() {
  const [isBuyEBookOpen, setIsBuyEBookOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>('privacy');

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
      {/* 6. Johar Cultural Welcome Popup on website visit */}
      <JoharWelcomeModal
        onExploreEBook={() => setIsBuyEBookOpen(true)}
      />

      {/* 1. Header Navigation: Home, Gallery, Contact Us + Buy E-Book + Hostinger Download */}
      <Navbar
        onOpenBuyEBook={() => setIsBuyEBookOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Main Streamlined Page Flow */}
      <main className="flex-1">
        {/* Home Section: Clear Karam Puja information, significance & photo */}
        <Hero
          onOpenBuyEBook={() => setIsBuyEBookOpen(true)}
        />

        {/* Gallery Section: Authentic photos of Karam Puja & tea garden traditions */}
        <GallerySection />

        {/* Simple & Clean Contact Us Section */}
        <ContactSection />
      </main>

      {/* Clean Footer with Small Social Media Icons, Navigation & Professional Policy Pages */}
      <Footer
        onOpenDownload={() => setIsDownloadOpen(true)}
        onOpenBuyEBook={() => setIsBuyEBookOpen(true)}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* 2 & 4 & 5. Buy E-Book Modal: English (₹70) & Assamese (₹50) with professional covers, Congratulations SMS & Email confirmation, and auto-redirect */}
      <BuyEBookModal
        isOpen={isBuyEBookOpen}
        onClose={() => setIsBuyEBookOpen(false)}
        onPaymentCompleteRedirect={handlePaymentRedirect}
      />

      {/* Complete Website ZIP Download Modal for Hostinger */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      {/* Professional Legal Policy Modal: Privacy Policy, Terms & Conditions, Refund Policy, Copyright Policy */}
      <LegalPolicyModal
        isOpen={isPolicyOpen}
        initialPolicy={activePolicy}
        onClose={() => setIsPolicyOpen(false)}
      />
    </div>
  );
}
