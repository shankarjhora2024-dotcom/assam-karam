import { useState, FormEvent } from 'react';
import { X, CheckCircle2, Trees, Send, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactVolunteerModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    interest: 'Pledge to Plant a Karam Tree',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      interest: 'Pledge to Plant a Karam Tree',
      notes: ''
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDFB] rounded-3xl overflow-hidden max-w-lg w-full border border-[#E6DDD0] shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F2E8DC] text-[#4A3B32] hover:bg-[#E8DAC9] flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C271E]/10 text-[#8C271E] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>karamutsav.org Community</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-[#241B15]">
                Get Involved in Karam Utsav
              </h3>
              <p className="text-xs sm:text-sm text-[#665548] mt-1 leading-relaxed">
                Connect your local village Akhra, pledge to plant sacred Karam saplings, or contribute unrecorded folk songs to our open archive.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Birsa Murmu / Sangeeta Mahato"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DECFBD] text-sm text-[#2C241E] focus:outline-hidden focus:border-[#8C271E] focus:ring-1 focus:ring-[#8C271E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DECFBD] text-sm text-[#2C241E] focus:outline-hidden focus:border-[#8C271E] focus:ring-1 focus:ring-[#8C271E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DECFBD] text-sm text-[#2C241E] focus:outline-hidden focus:border-[#8C271E] focus:ring-1 focus:ring-[#8C271E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1">
                  Village / District / City & State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ranchi, Jharkhand / Purulia, West Bengal"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DECFBD] text-sm text-[#2C241E] focus:outline-hidden focus:border-[#8C271E] focus:ring-1 focus:ring-[#8C271E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1">
                  How Would You Like to Participate?
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DECFBD] text-sm text-[#2C241E] focus:outline-hidden focus:border-[#8C271E] focus:ring-1 focus:ring-[#8C271E]"
                >
                  <option value="Pledge to Plant a Karam Tree">Pledge to Plant a Karam Tree (Haldina cordifolia)</option>
                  <option value="Register Village Akhra Gathering">Register My Village Akhra Gathering for 2026</option>
                  <option value="Contribute Folk Song / Oral Audio">Contribute Folk Song Lyrics or Oral Recordings</option>
                  <option value="Volunteer for Festival Documentation">Volunteer for Festival Photography & Documentation</option>
                  <option value="General Community Support">General Community & Cultural Supporter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3B32] mb-1">
                  Message / Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your community, dialect, or sapling location..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#DECFBD] text-sm text-[#2C241E] focus:outline-hidden focus:border-[#8C271E] focus:ring-1 focus:ring-[#8C271E]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#8C271E] hover:bg-[#731E17] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Participation Pledge</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C271E]">
                जोहार! Johar!
              </span>
              <h3 className="text-2xl font-display font-bold text-[#241B15]">
                Pledge Received with Gratitude!
              </h3>
              <p className="text-sm text-[#665548] max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>! Your commitment to <strong>{formData.interest}</strong> in <strong>{formData.location}</strong> has been logged into the karamutsav.org registry.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC9] text-xs text-[#705E51]">
              Our regional volunteer coordinators will connect with you via {formData.email} before Bhadra Shukla Ekadashi.
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-[#8C271E] hover:bg-[#731E17] text-white font-bold text-sm cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
