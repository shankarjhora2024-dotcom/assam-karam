import { useState, FormEvent } from 'react';
import { 
  X, User, Mail, Phone, MapPin, CheckCircle2, 
  LogIn, BookOpen, Download, LogOut, ArrowRight 
} from 'lucide-react';
import { DBService } from '../services/dbService';
import { UserProfile } from '../types';
import { EBOOK_EDITIONS } from '../data/ebookEditions';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBuyModal?: (edition: 'english' | 'assamese') => void;
}

export function UserAuthModal({ isOpen, onClose, onOpenBuyModal }: UserAuthModalProps) {
  const currentUser = DBService.getCurrentUser();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      setMessage('Please enter both name and email.');
      return;
    }

    const user = DBService.signInOrRegister(name, email, phone, city);
    setMessage(`Welcome, ${user.name}! You are now signed in.`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleSignOut = () => {
    DBService.signOutUser();
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setMessage('You have been signed out.');
  };

  return (
    <div
      id="user-auth-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="user-auth-modal-card"
        className="relative w-full max-w-md bg-[#0F2414] text-[#E8F5E9] rounded-3xl border border-[#2D6A4F] shadow-2xl overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0C1E10] border-b border-[#2D6A4F] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1C4D25] border border-[#52B788]/40 flex items-center justify-center text-[#95D5B2]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {currentUser ? 'Reader Account' : isSignUp ? 'Create Reader Account' : 'Reader Sign In'}
              </h3>
              <p className="text-[11px] text-[#95D5B2]">
                Karam Utsav Cultural Community &amp; E-Books
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {currentUser ? (
            /* Logged in state */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#14361B] border border-[#2D6A4F] flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] border border-[#52B788]/50 flex items-center justify-center font-bold text-lg text-white">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white truncate text-base">{currentUser.name}</div>
                  <div className="text-xs text-[#95D5B2] truncate font-mono">{currentUser.email}</div>
                  <div className="text-[11px] text-gray-400 font-mono">+91 {currentUser.phone}</div>
                </div>
              </div>

              {/* Purchased Books Section */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#D8F3DC] flex items-center justify-between">
                  <span>My E-Book Library</span>
                  <span className="text-[10px] text-[#52B788] font-mono">
                    {currentUser.purchasedBooks.length} book(s)
                  </span>
                </div>

                {currentUser.purchasedBooks.length > 0 ? (
                  <div className="space-y-2">
                    {currentUser.purchasedBooks.map((bKey) => {
                      const ed = EBOOK_EDITIONS[bKey as 'english' | 'assamese'];
                      if (!ed) return null;
                      return (
                        <div
                          key={bKey}
                          className="p-3 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <BookOpen className="w-4 h-4 text-[#E3A857]" />
                            <div>
                              <div className="font-bold text-white">{ed.label}</div>
                              <div className="text-[10px] text-[#95D5B2]">Verified Purchase</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-[#52B788] font-bold bg-[#1C4D25] px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#0C1E10] border border-[#2D6A4F]/60 text-center space-y-2">
                    <p className="text-xs text-[#95D5B2]">
                      You have not purchased any e-books yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenBuyModal?.('english');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#2D6A4F] hover:bg-[#40916C] text-white text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Explore E-Books (₹50 / ₹70)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#2D6A4F]/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 text-xs font-bold border border-red-800/40 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1C4D25] text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Register Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#D8F3DC] uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sankar Jhora"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#2D6A4F] bg-[#0C1E10] text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                  />
                  <User className="w-4 h-4 text-[#74C69D] absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#D8F3DC] uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sankarjhora321@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#2D6A4F] bg-[#0C1E10] text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                  />
                  <Mail className="w-4 h-4 text-[#74C69D] absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#D8F3DC] uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#2D6A4F] bg-[#0C1E10] text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                    />
                    <Phone className="w-4 h-4 text-[#74C69D] absolute left-3 top-3" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#D8F3DC] uppercase tracking-wider">
                    City / Tea Garden
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Dibrugarh, Assam"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#2D6A4F] bg-[#0C1E10] text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                    />
                    <MapPin className="w-4 h-4 text-[#74C69D] absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {message && (
                <div className="p-3 rounded-xl bg-[#1C4D25] border border-[#52B788] text-xs text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#95D5B2] shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#95D5B2]" />
                <span>Sign In / Register</span>
              </button>

              <div className="text-center text-[11px] text-[#74C69D]">
                Your sign-in record is saved securely for digital monograph receipt delivery.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
