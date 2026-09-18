import { useState, useEffect } from 'react';
import { BookOpen, Image as ImageIcon, Mail, Home, Trees, ShieldCheck, User } from 'lucide-react';
import { DBService } from '../services/dbService';

interface NavbarProps {
  onOpenBuyEBook: () => void;
  onOpenJohar?: () => void;
  onOpenAdmin: () => void;
  onOpenUserAuth: () => void;
}

export function Navbar({ onOpenBuyEBook, onOpenAdmin, onOpenUserAuth }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const currentUser = DBService.getCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', icon: Home },
    { name: 'Gallery', href: '#gallery', id: 'gallery', icon: ImageIcon },
    { name: 'Contact Us', href: '#contact', id: 'contact', icon: Mail },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div id="top-announcement-bar" className="bg-[#1B4324] text-[#E8F5E9] text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center font-medium flex items-center justify-center gap-1.5 sm:gap-2 border-b border-[#14361B] tracking-wide">
        <span className="inline-block w-2 h-2 rounded-full bg-[#52B788] animate-pulse shrink-0"></span>
        <span className="truncate sm:overflow-visible">
          <strong>জোহাৰ! (Johar!)</strong> Karam Puja • Nature &amp; Tea Tribe Traditions • <strong>karamutsav.org</strong>
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        id="main-navigation"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#0A200E]/95 backdrop-blur-md shadow-md py-2.5' : 'bg-[#0F2D15] py-3 sm:py-3.5'
        } border-b border-[#204E2B]`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Logo / Brand Link */}
            <a href="#home" id="nav-brand-logo" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#52B788] to-[#1C4D25] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-[#74C69D]/30">
                <Trees className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base sm:text-xl font-bold tracking-tight text-[#E8F5E9] group-hover:text-[#52B788] transition-colors leading-tight">
                  Karam Utsav
                </span>
                <span className="text-[10px] sm:text-xs text-[#95D5B2] font-serif font-medium tracking-wide">
                  কৰম পূজা &bull; Sacred Nature Fest
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    id={`nav-link-${link.id}`}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#1C4D25] text-[#52B788] shadow-xs'
                        : 'text-[#D8F3DC] hover:text-[#FFFFFF] hover:bg-[#14361B]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#52B788]' : 'text-[#74C69D]'}`} />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {/* BUY E-BOOK BUTTON */}
              <button
                type="button"
                onClick={onOpenBuyEBook}
                id="header-buy-ebook-btn"
                className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-[#52B788] hover:bg-[#40916C] text-[#0A200E] font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <BookOpen className="w-4 h-4 text-[#0A200E]" />
                <span>Buy E-Book</span>
                <span className="bg-[#0A200E] text-white text-[10px] px-1.5 py-0.5 rounded font-extrabold">
                  ₹50 / ₹70
                </span>
              </button>

              {/* Reader Account / Sign In Button */}
              <button
                type="button"
                onClick={onOpenUserAuth}
                id="header-user-auth-btn"
                className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#D8F3DC] hover:text-white font-semibold text-xs border border-white/15 transition-all cursor-pointer"
                title={currentUser ? `Signed in as ${currentUser.name}` : 'Reader Sign In'}
              >
                <User className="w-3.5 h-3.5 text-[#95D5B2]" />
                <span>{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
              </button>
            </div>

            {/* Mobile Header: Clean & Direct */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Reader Sign In Button on Mobile */}
              <button
                type="button"
                onClick={onOpenUserAuth}
                id="mobile-header-user-auth-btn"
                className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl bg-white/10 text-[#D8F3DC] text-xs font-semibold border border-white/15 cursor-pointer active:scale-95 transition-all"
              >
                <User className="w-3.5 h-3.5 text-[#95D5B2]" />
                <span>{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
              </button>

              {/* Direct E-Book Button */}
              <button
                type="button"
                onClick={onOpenBuyEBook}
                id="mobile-header-ebook-btn"
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#52B788] hover:bg-[#40916C] text-[#0A200E] font-bold text-xs shadow-sm cursor-pointer active:scale-95 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0A200E]" />
                <span>E-Book ₹50/70</span>
              </button>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}
