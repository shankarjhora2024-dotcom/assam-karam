import { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, RefreshCcw, Copyright, Lock, Mail, ExternalLink, Printer } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'refund' | 'copyright';

interface LegalPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPolicy?: PolicyType;
}

export function LegalPolicyModal({
  isOpen,
  onClose,
  initialPolicy = 'privacy'
}: LegalPolicyModalProps) {
  const [activeTab, setActiveTab] = useState<PolicyType>(initialPolicy);

  useEffect(() => {
    if (isOpen && initialPolicy) {
      setActiveTab(initialPolicy);
    }
  }, [isOpen, initialPolicy]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="legal-policy-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="legal-policy-modal-card"
        className="bg-[#FFFFFF] rounded-3xl overflow-hidden max-w-3xl w-full border border-[#D5E5D5] shadow-2xl relative my-6 text-[#14361B] animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0E2A14] text-white p-5 sm:p-6 relative border-b border-[#204E2B] shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4D25] text-[#95D5B2] text-xs font-bold uppercase tracking-wider mb-2 border border-[#2D6A4F]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
            <span>Legal Documentation &bull; karamutsav.org</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            {activeTab === 'privacy' && 'Privacy Policy'}
            {activeTab === 'terms' && 'Terms & Conditions'}
            {activeTab === 'refund' && 'Refund & Cancellation Policy'}
            {activeTab === 'copyright' && 'Copyright & Intellectual Property Policy'}
          </h2>

          <p className="text-xs text-[#B7E4C7] mt-1">
            Last Updated: September 2026 &bull; Karam Utsav Cultural Project
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 overflow-x-auto pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'privacy'
                  ? 'bg-[#52B788] text-[#0E2A14]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'terms'
                  ? 'bg-[#52B788] text-[#0E2A14]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms &amp; Conditions</span>
            </button>

            <button
              onClick={() => setActiveTab('refund')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'refund'
                  ? 'bg-[#52B788] text-[#0E2A14]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Refund Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('copyright')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                activeTab === 'copyright'
                  ? 'bg-[#52B788] text-[#0E2A14]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Copyright className="w-3.5 h-3.5" />
              <span>Copyright Policy</span>
            </button>
          </div>
        </div>

        {/* Scrollable Policy Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#2E4F34] leading-relaxed">
          
          {/* 1. PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  1. Information We Collect
                </h3>
                <p className="mt-1">
                  At <strong>karamutsav.org</strong>, we respect the privacy of every reader and cultural enthusiast. When you interact with our website—such as submitting an inquiry through our Contact Us form or purchasing an educational digital E-Book (English or Assamese edition)—we collect only the necessary details:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Contact Details:</strong> Your name, email address, and optional phone/WhatsApp number.</li>
                  <li><strong>Order Information:</strong> Transaction identifiers and selected edition details required to dispatch your PDF and deliver confirmation SMS messages.</li>
                  <li><strong>Technical Data:</strong> Non-personally identifiable technical logs (browser type, session timestamps) used strictly for performance optimization.</li>
                </ul>
              </div>

              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  2. Purpose &amp; Use of Personal Data
                </h3>
                <p className="mt-1">
                  Your personal data is used solely for legitimate cultural and administrative purposes:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>To deliver the digital monograph PDF directly to your verified email inbox.</li>
                  <li>To send an instant SMS confirmation containing your Order ID and download link.</li>
                  <li>To respond to your inquiries regarding Karam festival ceremonies, research inquiries, or order support.</li>
                  <li>We <strong>never</strong> sell, rent, or lease your personal data to any third-party advertisers or marketing agencies.</li>
                </ul>
              </div>

              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  3. Payment Security &amp; Financial Information
                </h3>
                <p className="mt-1">
                  All monetary transactions for our educational publications are handled through certified, PCI-DSS compliant payment gateways with 256-bit SSL encryption. <strong>Karam Utsav never stores or has access to your sensitive banking credentials, CVV codes, or UPI PINs.</strong>
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  4. Data Retention &amp; Inquiries
                </h3>
                <p className="mt-1">
                  We retain order records solely for re-sending lost digital download links upon user request. If you wish to have your contact details removed from our records, please write to us at <a href="mailto:contact@karamutsav.org" className="text-[#1C4D25] font-bold underline">contact@karamutsav.org</a>.
                </p>
              </div>
            </div>
          )}

          {/* 2. TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  1. Acceptance of Terms
                </h3>
                <p className="mt-1">
                  By accessing and browsing <strong>karamutsav.org</strong>, or by purchasing our digital educational publications, you agree to be bound by these Terms and Conditions and all applicable laws and regulations of India. If you do not agree with any part of these terms, please discontinue use of the website.
                </p>
              </div>

              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  2. Digital Products &amp; Licensing
                </h3>
                <p className="mt-1">
                  Our digital publications—including the <em>English Edition (₹70)</em> and the <em>Assamese Edition (₹50)</em>—are non-exclusive, non-transferable digital goods provided in PDF format for personal, educational, and cultural study only.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>You may read, store, and print a copy for personal or classroom reference.</li>
                  <li>You are strictly prohibited from reselling, redistributing on public file-sharing networks, modifying, or repackaging any portion of the e-books without written authorization.</li>
                </ul>
              </div>

              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  3. Accuracy of Cultural Content
                </h3>
                <p className="mt-1">
                  While our research committee makes every effort to verify ancestral folklore, botanical data, and ritual timelines across different tea gardens and tribal communities (Munda, Oraon, Santhal, Kharia, Karmali, etc.), ritual nuances may vary across localities. Content is provided for cultural education and preservation.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  4. Governing Law &amp; Jurisdiction
                </h3>
                <p className="mt-1">
                  These terms are governed by the laws of India. Any disputes arising in connection with website transactions or services shall be subject to the exclusive jurisdiction of the competent courts in Assam, India.
                </p>
              </div>
            </div>
          )}

          {/* 3. REFUND POLICY */}
          {activeTab === 'refund' && (
            <div className="space-y-5">
              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  1. Digital Goods Delivery Policy
                </h3>
                <p className="mt-1">
                  Due to the immediate digital nature of our publications (instant PDF downloads and email dispatch), products are classified as intangible digital goods under standard consumer guidelines.
                </p>
              </div>

              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  2. Refund &amp; Replacement Eligibility
                </h3>
                <p className="mt-1">
                  We strive for 100% customer satisfaction. We will promptly issue a free replacement or complete refund under the following circumstances:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Corrupted or Inaccessible File:</strong> If the PDF received is unreadable or fails to download, and our support team is unable to provide an alternate accessible download link within 24 hours.</li>
                  <li><strong>Duplicate Charge:</strong> If your bank account or UPI was charged more than once for a single order due to a network glitch.</li>
                  <li><strong>Wrong Edition Delivered:</strong> If you ordered the Assamese edition and received English (or vice versa), we will immediately dispatch the correct edition at zero additional cost.</li>
                </ul>
              </div>

              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  3. Non-Refundable Situations
                </h3>
                <p className="mt-1">
                  Refunds cannot be granted once a file has been successfully downloaded and accessed, unless a technical defect is demonstrated. Change-of-mind requests after completing download cannot be entertained given the digital nature of the asset.
                </p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  4. How to Request Assistance or Refund
                </h3>
                <p className="mt-1">
                  To request a replacement or refund, send an email to <a href="mailto:contact@karamutsav.org" className="text-[#1C4D25] font-bold underline">contact@karamutsav.org</a> with your Order ID, registered email address, and payment reference. Our team responds within 24–48 business hours.
                </p>
              </div>
            </div>
          )}

          {/* 4. COPYRIGHT POLICY */}
          {activeTab === 'copyright' && (
            <div className="space-y-5">
              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  1. Cultural Heritage &amp; Intellectual Property
                </h3>
                <p className="mt-1">
                  All materials published on <strong>karamutsav.org</strong>—including historical texts, ethnographic field notes, ritual descriptions, audio soundscapes, curated photographic galleries, and publication layout designs—are the exclusive intellectual property of the Karam Utsav Cultural Project and respected indigenous contributors, protected under the Indian Copyright Act, 1957.
                </p>
              </div>

              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  2. Indigenous Knowledge Attribution
                </h3>
                <p className="mt-1">
                  The sacred songs, Jhumair lyrics, and ceremonial Akhra traditions documented on this portal represent the ancestral heritage of the Tea Garden Tribes (Adivasi communities of Assam, Dooars, and Chotanagpur). Our documentation seeks to honor, protect, and pass on this living heritage to future generations with cultural integrity.
                </p>
              </div>

              <div className="border-b border-[#D5E5D5] pb-3">
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  3. Permitted Educational Fair Use
                </h3>
                <p className="mt-1">
                  Scholars, teachers, students, and journalists may cite short excerpts (up to 200 words) from this website or the e-books for non-commercial academic research, cultural reviews, or educational lectures, provided proper attribution is given:
                </p>
                <div className="bg-[#F4F8F4] p-3 rounded-xl border border-[#D5E5D5] font-mono text-[11px] text-[#14361B] mt-2">
                  Source: Karam Utsav Cultural Project (karamutsav.org), &ldquo;The Sacred Karam Festival: Heritage &amp; Rituals of the Tea Tribes&rdquo;, 2026.
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#14361B]">
                  4. Copyright Infringement Notice
                </h3>
                <p className="mt-1">
                  If you believe any photograph or content displayed on our platform infringes upon your copyright, please notify our designated administrator at <a href="mailto:contact@karamutsav.org" className="text-[#1C4D25] font-bold underline">contact@karamutsav.org</a> with proof of ownership for immediate verification and resolution.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer with Contact & Close */}
        <div className="bg-[#F4F8F4] p-4 sm:p-5 border-t border-[#D5E5D5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-[#4D7C55]">
            <Mail className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Questions? Write to <strong>contact@karamutsav.org</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EDF4ED] text-[#14361B] border border-[#D5E5D5] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold cursor-pointer transition-colors"
            >
              Close Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
