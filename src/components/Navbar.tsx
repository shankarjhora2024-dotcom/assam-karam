import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Image as ImageIcon, Mail, Home, Trees, ShoppingBag, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenBuyEBook: () => void;
}

export function Navbar({ onOpenBuyEBook }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
      <div id="top-announcement-bar" className="bg-[#1B4324] text-[#E8F5E9] text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-[#14361B] tracking-wide">
        <span className="inline-block w-2 h-2 rounded-full bg-[#52B788] animate-pulse"></span>
        <span>
          <strong>जोहार! (Johar!)</strong> Karam Puja • Dedicated to Nature &amp; Tea Tribe Traditions • <strong>karamutsav.org</strong>
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        id="main-navigation"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0E2A14]/95 backdrop-blur-md shadow-md border-b border-[#204E2B]'
            : 'bg-[#14361B] border-b border-[#1B4324]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group" id="brand-logo-link">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#2D6A4F] to-[#1B4324] text-[#D8F3DC] border border-[#52B788]/30 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Trees className="w-5 h-5 sm:w-6 sm:h-6 text-[#95D5B2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl sm:text-2xl text-[#E8F5E9] tracking-wider leading-none">
                  KARAM UTSAV
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#95D5B2] font-semibold tracking-widest uppercase mt-0.5">
                  karamutsav.org • Heritage Portal
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 text-sm font-semibold transition-all py-1.5 px-3 rounded-lg ${
                      isActive
                        ? 'text-[#95D5B2] bg-[#1C4D25]/70'
                        : 'text-[#D8F3DC] hover:text-[#FFFFFF] hover:bg-[#1C4D25]/40'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#74C69D]" />
                    <span>{link.name}</span>
                  </a>
                );
              })}

              {/* BUY E-BOOK BUTTON in Header */}
              <button
                type="button"
                onClick={onOpenBuyEBook}
                id="header-buy-ebook-btn"
                className="flex items-center gap-2 py-2 px-4 rounded-xl bg-[#52B788] hover:bg-[#40916C] text-[#0A200E] font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <BookOpen className="w-4 h-4 text-[#0A200E]" />
                <span>Buy E-Book</span>
                <span className="bg-[#0A200E] text-white text-[10px] px-1.5 py-0.5 rounded font-extrabold">
                  From ₹50
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={onOpenBuyEBook}
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#52B788] text-[#0A200E] font-bold text-xs shadow-sm cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Buy E-Book (From ₹50)</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-[#E8F5E9] hover:bg-[#1C4D25] focus:outline-hidden transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
          <div className="md:hidden bg-[#0A200E] border-b border-[#204E2B] px-4 pt-3 pb-5 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-[#D8F3DC] hover:text-[#FFFFFF] hover:bg-[#1C4D25]/60 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#52B788]" />
                  <span>{link.name}</span>
                </a>
              );
            })}

            <div className="pt-2 border-t border-[#1C4D25]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBuyEBook();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#52B788] text-[#0A200E] font-bold text-sm shadow-sm cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#0A200E]" />
                <span>Buy E-Book (English ₹70 • Assamese ₹50)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
