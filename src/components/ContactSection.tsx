import { useState, FormEvent } from 'react';
import { Mail, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/karamData';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-14 sm:py-18 bg-[#FFFFFF] border-t border-[#D5E5D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading - Clean & Focused */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C4D25]/10 text-[#1C4D25] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14361B] tracking-tight">
            Contact Us
          </h2>
          <p className="text-xs sm:text-sm text-[#2E4F34] max-w-lg mx-auto">
            Have a question about Karam Puja traditions or the E-Book? Send us a quick note below.
          </p>
        </div>

        {/* Contact Container */}
        <div className="bg-[#F4F8F4] rounded-3xl p-6 sm:p-8 border border-[#D5E5D5] shadow-xs">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#14361B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5E5D5] text-xs text-[#14361B] focus:outline-hidden focus:ring-2 focus:ring-[#1C4D25]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#14361B] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5E5D5] text-xs text-[#14361B] focus:outline-hidden focus:ring-2 focus:ring-[#1C4D25]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14361B] mb-1">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5E5D5] text-xs text-[#14361B] focus:outline-hidden focus:ring-2 focus:ring-[#1C4D25]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14361B] mb-1">
                  Message *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5E5D5] text-xs text-[#14361B] focus:outline-hidden focus:ring-2 focus:ring-[#1C4D25]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-[#4D7C55]">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>contact@karamutsav.org</span>
                  </span>
                  <span>•</span>
                  <span>{FESTIVAL_INFO.domain}</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#95D5B2]" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#D8F3DC] text-[#1C4D25] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#2D6A4F]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-display font-bold text-[#14361B]">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs text-[#2E4F34]">
                  Your message has been sent successfully. We will reply to <strong>{formData.email}</strong> shortly.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
