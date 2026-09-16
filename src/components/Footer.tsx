import { useState } from 'react';
import { 
  Trees, Heart, Share2, Check, Globe, Mail, 
  MessageCircle, Send, Facebook, Twitter, Instagram, 
  Youtube, Download, BookOpen, ShieldCheck
} from 'lucide-react';
import { FESTIVAL_INFO } from '../data/karamData';
import { PolicyType } from './LegalPolicyModal';

interface FooterProps {
  onOpenDownload?: () => void;
  onOpenBuyEBook?: () => void;
  onOpenPolicy?: (policy: PolicyType) => void;
}

export function Footer({ onOpenDownload, onOpenBuyEBook, onOpenPolicy }: FooterProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Celebrate Karam Puja & explore the sacred traditions, Jhumair songs, and bilingual E-Book at https://karamutsav.org");
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent("https://karamutsav.org");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent("Celebrating Karam Puja & the sacred heritage of Tea Garden Tribes. Explore https://karamutsav.org #KaramPuja #Johar");
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnTelegram = () => {
    const url = encodeURIComponent("https://karamutsav.org");
    const text = encodeURIComponent("Karam Utsav - Celebrating Sacred Karam Puja & Tea Tribe Heritage");
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com", '_blank');
  };

  const openYouTube = () => {
    window.open("https://www.youtube.com", '_blank');
  };

  const smallSocialIcons = [
    {
      name: 'WhatsApp',
      action: shareOnWhatsApp,
      icon: MessageCircle,
      bgHover: 'hover:bg-[#25D366]/25 hover:text-[#8CECB4] hover:border-[#25D366]',
      color: 'text-[#25D366]'
    },
    {
      name: 'Facebook',
      action: shareOnFacebook,
      icon: Facebook,
      bgHover: 'hover:bg-[#1877F2]/25 hover:text-[#93C5FD] hover:border-[#1877F2]',
      color: 'text-[#60A5FA]'
    },
    {
      name: 'Instagram',
      action: openInstagram,
      icon: Instagram,
      bgHover: 'hover:bg-[#E4405F]/25 hover:text-[#FCA5A5] hover:border-[#E4405F]',
      color: 'text-[#F472B6]'
    },
    {
      name: 'YouTube',
      action: openYouTube,
      icon: Youtube,
      bgHover: 'hover:bg-[#FF0000]/25 hover:text-[#FCA5A5] hover:border-[#FF0000]',
      color: 'text-[#EF4444]'
    },
    {
      name: 'X (Twitter)',
      action: shareOnTwitter,
      icon: Twitter,
      bgHover: 'hover:bg-white/20 hover:text-white hover:border-white',
      color: 'text-[#E0E7FF]'
    },
    {
      name: 'Telegram',
      action: shareOnTelegram,
      icon: Send,
      bgHover: 'hover:bg-[#229ED9]/25 hover:text-[#93C5FD] hover:border-[#229ED9]',
      color: 'text-[#38BDF8]'
    }
  ];

  return (
    <footer id="footer" className="bg-[#0A200E] text-[#D8F3DC] pt-12 pb-10 border-t border-[#1B4324]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Identity */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D6A4F] to-[#14361B] text-[#D8F3DC] border border-[#52B788]/30 flex items-center justify-center shadow-md">
                <Trees className="w-5 h-5 text-[#95D5B2]" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-white tracking-wide">
                  KARAM UTSAV
                </span>
                <span className="block text-[11px] text-[#95D5B2] font-semibold tracking-wider uppercase">
                  karamutsav.org • Tea Garden Tribe Heritage
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#B7E4C7] leading-relaxed max-w-md">
              A community initiative celebrating Karam Puja, honoring tea garden ancestors, sacred groves, Jhumair traditions, and cultural literature across Assam, Dooars, and Chotanagpur.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#74C69D]">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#52B788]" />
                <span>{FESTIVAL_INFO.domain}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#52B788]" />
                <span>contact@karamutsav.org</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#74C69D]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]"></span>
                  <span>Home &amp; Festival Info</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]"></span>
                  <span>Photo Gallery</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]"></span>
                  <span>Contact Us</span>
                </a>
              </li>
              {onOpenBuyEBook && (
                <li>
                  <button 
                    onClick={onOpenBuyEBook} 
                    className="hover:text-white transition-colors flex items-center gap-2 text-left text-[#95D5B2] font-semibold cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]"></span>
                    <span>Buy E-Book (English ₹70 &amp; Assamese ₹50)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Social Icons & Share Action Buttons */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-widest text-[#74C69D]">
              Connect &amp; Follow Us
            </div>

            {/* Small Size Social Media Icons Row */}
            <div className="flex items-center flex-wrap gap-2">
              {smallSocialIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className={`w-9 h-9 rounded-xl bg-[#14361B] border border-[#204E2B] flex items-center justify-center transition-all cursor-pointer shadow-xs ${item.bgHover}`}
                    title={item.name}
                    aria-label={item.name}
                  >
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </button>
                );
              })}
            </div>

            {/* Action Buttons: Copy Link and Website ZIP Download */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#14361B] hover:bg-[#1B4324] text-[#D8F3DC] text-xs font-semibold border border-[#204E2B] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#52B788]" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#95D5B2]" />
                    <span>Copy Website Link</span>
                  </>
                )}
              </button>

              {onOpenDownload && (
                <button
                  id="footer-download-zip-btn"
                  onClick={onOpenDownload}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#2D6A4F] hover:bg-[#40916C] text-[#E8F5E9] text-xs font-bold border border-[#52B788]/40 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#95D5B2]" />
                  <span>Download Website in ZIP (Hostinger)</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Bottom bar with Professional Policy Pages */}
        <div className="pt-6 border-t border-[#16381C] flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-[#74C69D]">
          <div>
            © 2026 Karam Utsav Cultural Project (karamutsav.org) • All rights reserved.
          </div>

          {/* Professional Policy Pages: Privacy Policy, Terms & Conditions, Refund Policy, Copyright Policy */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs">
            <button
              type="button"
              id="footer-policy-privacy"
              onClick={() => onOpenPolicy?.('privacy')}
              className="text-[#95D5B2] hover:text-white hover:underline transition-colors cursor-pointer font-medium"
            >
              Privacy Policy
            </button>
            <span className="text-[#204E2B]">•</span>
            <button
              type="button"
              id="footer-policy-terms"
              onClick={() => onOpenPolicy?.('terms')}
              className="text-[#95D5B2] hover:text-white hover:underline transition-colors cursor-pointer font-medium"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-[#204E2B]">•</span>
            <button
              type="button"
              id="footer-policy-refund"
              onClick={() => onOpenPolicy?.('refund')}
              className="text-[#95D5B2] hover:text-white hover:underline transition-colors cursor-pointer font-medium"
            >
              Refund Policy
            </button>
            <span className="text-[#204E2B]">•</span>
            <button
              type="button"
              id="footer-policy-copyright"
              onClick={() => onOpenPolicy?.('copyright')}
              className="text-[#95D5B2] hover:text-white hover:underline transition-colors cursor-pointer font-medium"
            >
              Copyright Policy
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span>Preserving Tea Garden Tribes Culture &amp; Sacred Groves</span>
            <Heart className="w-3.5 h-3.5 text-[#52B788] fill-current inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
