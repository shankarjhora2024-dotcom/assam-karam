import { useState, useEffect, FormEvent } from 'react';
import { 
  X, Check, Lock, Mail, ShieldCheck, 
  CreditCard, Smartphone, Building, BookOpen, 
  Download, RefreshCw, MessageSquare, CheckCircle2,
  Clock, Phone, AlertCircle
} from 'lucide-react';
import { EBOOK_EDITIONS, EBookEdition } from '../data/ebookEditions';
import { BookCover } from './BookCover';

interface BuyEBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLanguage?: 'english' | 'assamese';
  onPaymentCompleteRedirect?: () => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking';

export function BuyEBookModal({ 
  isOpen, 
  onClose, 
  initialLanguage = 'english',
  onPaymentCompleteRedirect 
}: BuyEBookModalProps) {
  const [selectedEditionId, setSelectedEditionId] = useState<'english' | 'assamese'>(initialLanguage);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Reader Details State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [validationError, setValidationError] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Automatic Redirect Countdown on success
  const [redirectCountdown, setRedirectCountdown] = useState(7);

  // Synchronize state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedEditionId(initialLanguage);
      setIsSuccess(false);
      setIsProcessing(false);
      setValidationError('');
      setRedirectCountdown(7);
    }
  }, [isOpen, initialLanguage]);

  // Handle Automatic Redirect on Success Screen
  useEffect(() => {
    if (isSuccess) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleCloseAndRedirectHome();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSuccess]);

  if (!isOpen) return null;

  const currentEdition: EBookEdition = EBOOK_EDITIONS[selectedEditionId];

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.trim() || !emailRegex.test(userEmail.trim())) {
      setValidationError('Please enter a valid email address to receive your PDF.');
      return;
    }

    if (!userPhone.trim() || userPhone.trim().length < 8) {
      setValidationError('Please enter a valid mobile number for confirmation SMS.');
      return;
    }

    setValidationError('');
    setIsProcessing(true);

    // Simulate swift, realistic gateway authorization
    setTimeout(() => {
      const generatedOrder = 'KU-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrder);
      setIsProcessing(false);
      setRedirectCountdown(7);
      setIsSuccess(true);
    }, 1400);
  };

  const handleCloseAndRedirectHome = () => {
    onClose();
    if (onPaymentCompleteRedirect) {
      onPaymentCompleteRedirect();
    } else {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleDownloadPDF = () => {
    const edition = EBOOK_EDITIONS[selectedEditionId];
    const phoneDisplay = userPhone ? `+91 ${userPhone}` : 'Registered Reader';
    const content = `========================================================================
KARAM UTSAV - OFFICIAL DIGITAL MONOGRAPH & E-BOOK
${edition.title}
Edition: ${edition.label}
Price: INR ₹${edition.priceINR} (PAID)
Licensed Reader: ${userName}
Email Address: ${userEmail}
Mobile: ${phoneDisplay}
Order ID: ${orderId || 'KU-ONLINE-ORDER'}
Date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Official Archive: https://karamutsav.org
========================================================================

ABOUT THIS PUBLICATION:
${edition.description}

TABLE OF CONTENTS:
${edition.chapters.map((ch, idx) => `[${idx + 1}] ${ch}`).join('\n')}

------------------------------------------------------------------------
EXCERPT / SAMPLE TEXT:
${edition.samplePreview.join('\n\n')}

------------------------------------------------------------------------
HISTORICAL SUMMARY & TEA TRIBE TRADITIONS:
The Karam festival is the sacred heart of the Tea Garden Tribes of Assam,
Dooars, Terai, and Chotanagpur. On Bhadrapada Shukla Ekadashi, the community
gathers at the village Akhra around the consecrated boughs of the Karam tree
(Haldina cordifolia). Young maidens present the golden sprouted Jawa basket,
celebrating fertility, moral righteousness, and labor harmony.

------------------------------------------------------------------------
AUTHENTICITY SEAL:
Delivered to inbox: ${userEmail}
Order Status: Confirmed & Dispatched via karamutsav.org
Johar! (जोहार! • জোহাৰ!)
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = edition.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="buy-ebook-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="buy-ebook-modal-container"
        className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl overflow-hidden max-w-lg w-full border border-[#D5E5D5] shadow-2xl relative my-auto text-[#14361B] max-h-[92dvh] sm:max-h-[88vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple & Clean Header (No complex steppers or unwanted clutter) */}
        <div className="bg-[#0E2A14] text-white p-4 sm:p-5 relative border-b border-[#204E2B] shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1C4D25] text-white text-[11px] font-bold uppercase tracking-wider mb-1 border border-[#2D6A4F]">
            <BookOpen className="w-3 h-3 text-[#95D5B2]" />
            <span>Karam Utsav E-Book</span>
          </div>

          <h2 className="text-lg sm:text-xl font-display font-bold text-white pr-7">
            {isSuccess ? 'Payment Successful!' : 'Get Official E-Book'}
          </h2>

          <p className="text-xs text-[#B7E4C7] mt-0.5">
            {isSuccess 
              ? 'Your order is confirmed. Download your copy below.' 
              : 'Instant PDF download + SMS & Email receipt'}
          </p>
        </div>

        {/* Scrollable Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain">

          {/* SCREEN 1: SIMPLE STREAMLINED PURCHASE FORM */}
          {!isSuccess ? (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              
              {/* 1. SELECT EDITION (Simple 2-Option Cards) */}
              <div>
                <label className="block text-xs font-bold text-[#14361B] mb-2 uppercase tracking-wide">
                  1. Choose Edition:
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {/* English Option */}
                  <div
                    id="select-edition-english"
                    onClick={() => setSelectedEditionId('english')}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedEditionId === 'english'
                        ? 'border-[#1C4D25] bg-[#EAF5EC] shadow-sm ring-1 ring-[#52B788]'
                        : 'border-[#D5E5D5] bg-[#F8FAF8] hover:border-[#1C4D25]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <span className="font-bold text-xs text-[#14361B] leading-tight">
                        English
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedEditionId === 'english'
                          ? 'border-[#1C4D25] bg-[#1C4D25] text-white'
                          : 'border-gray-400 bg-white'
                      }`}>
                        {selectedEditionId === 'english' && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>

                    <div className="flex justify-center my-1">
                      <BookCover edition={EBOOK_EDITIONS.english} size="xs" />
                    </div>

                    <div className="pt-2 border-t border-[#D5E5D5] text-center">
                      <div className="text-base font-bold text-[#1C4D25] font-display">₹70</div>
                      <div className="text-[10px] text-[#2D6A4F] font-semibold">58 Pages • PDF</div>
                    </div>
                  </div>

                  {/* Assamese Option */}
                  <div
                    id="select-edition-assamese"
                    onClick={() => setSelectedEditionId('assamese')}
                    className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      selectedEditionId === 'assamese'
                        ? 'border-[#1C4D25] bg-[#EAF5EC] shadow-sm ring-1 ring-[#52B788]'
                        : 'border-[#D5E5D5] bg-[#F8FAF8] hover:border-[#1C4D25]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <span className="font-bold text-xs text-[#14361B] leading-tight">
                        অসমীয়া
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedEditionId === 'assamese'
                          ? 'border-[#1C4D25] bg-[#1C4D25] text-white'
                          : 'border-gray-400 bg-white'
                      }`}>
                        {selectedEditionId === 'assamese' && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>

                    <div className="flex justify-center my-1">
                      <BookCover edition={EBOOK_EDITIONS.assamese} size="xs" />
                    </div>

                    <div className="pt-2 border-t border-[#D5E5D5] text-center">
                      <div className="text-base font-bold text-[#1C4D25] font-display">₹50</div>
                      <div className="text-[10px] text-[#2D6A4F] font-semibold">52 Pages • PDF</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Warning */}
              {validationError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* 2. READER DETAILS INPUTS (Optimized for Mobile) */}
              <div className="space-y-2.5 bg-[#F8FAF8] p-3.5 rounded-2xl border border-[#D5E5D5]">
                <label className="block text-xs font-bold text-[#14361B] uppercase tracking-wide">
                  2. Reader Information:
                </label>

                <div>
                  <label className="block text-[11px] font-semibold text-[#14361B] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E5D5] bg-white text-base sm:text-xs text-[#14361B] focus:ring-2 focus:ring-[#1C4D25] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#14361B] mb-1">
                    Email Address (PDF will be sent here) *
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5E5D5] bg-white text-base sm:text-xs text-[#14361B] focus:ring-2 focus:ring-[#1C4D25] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#14361B] mb-1">
                    Mobile Number (For Confirmation SMS) *
                  </label>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-2.5 rounded-xl border border-[#D5E5D5] bg-[#EDF4ED] text-xs font-bold text-[#1C4D25] flex items-center shrink-0">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={12}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#D5E5D5] bg-white text-base sm:text-xs text-[#14361B] focus:ring-2 focus:ring-[#1C4D25] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* 3. PAYMENT METHOD (Touch-Friendly Buttons) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#14361B] uppercase tracking-wide">
                  3. Select Payment Mode:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-1 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-[#1C4D25] bg-[#EAF5EC] text-[#1C4D25] ring-1 ring-[#1C4D25]'
                        : 'border-[#D5E5D5] bg-[#F8FAF8] text-gray-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#2D6A4F]" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-1 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#1C4D25] bg-[#EAF5EC] text-[#1C4D25] ring-1 ring-[#1C4D25]'
                        : 'border-[#D5E5D5] bg-[#F8FAF8] text-gray-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#2D6A4F]" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-2 px-1 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#1C4D25] bg-[#EAF5EC] text-[#1C4D25] ring-1 ring-[#1C4D25]'
                        : 'border-[#D5E5D5] bg-[#F8FAF8] text-gray-600'
                    }`}
                  >
                    <Building className="w-4 h-4 text-[#2D6A4F]" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* Specific Method Input Field */}
                {paymentMethod === 'upi' && (
                  <div className="p-3 bg-[#F4F8F4] rounded-xl border border-[#D5E5D5]">
                    <label className="block text-[11px] font-semibold text-[#14361B] mb-1">
                      UPI ID (GPay / PhonePe / Paytm / BHIM)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi or 9876543210@paytm"
                      className="w-full px-3 py-2 rounded-lg border border-[#D5E5D5] bg-white text-base sm:text-xs text-[#14361B] outline-hidden"
                    />
                    <div className="text-[10px] text-[#4D7C55] mt-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" />
                      <span>Supports all Indian UPI apps</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-[#F4F8F4] rounded-xl border border-[#D5E5D5] space-y-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#14361B] mb-1">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• ••••"
                        className="w-full px-3 py-2 rounded-lg border border-[#D5E5D5] bg-white text-base sm:text-xs outline-hidden"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#14361B] mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full px-3 py-2 rounded-lg border border-[#D5E5D5] bg-white text-base sm:text-xs outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#14361B] mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-3 py-2 rounded-lg border border-[#D5E5D5] bg-white text-base sm:text-xs outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="p-3 bg-[#F4F8F4] rounded-xl border border-[#D5E5D5]">
                    <label className="block text-[11px] font-semibold text-[#14361B] mb-1">Select Bank</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-[#D5E5D5] bg-white text-base sm:text-xs outline-hidden">
                      <option>State Bank of India (SBI)</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Assam Gramin Vikash Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* 4. PROMINENT FULL-WIDTH MOBILE ACTION BUTTON */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#95D5B2]" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#95D5B2]" />
                      <span>Pay ₹{currentEdition.priceINR} ({currentEdition.label})</span>
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] text-gray-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>256-Bit SSL Encrypted • Direct SMS &amp; Email Delivery</span>
                </div>
              </div>

            </form>
          ) : (

            /* SCREEN 2: CLEAN SUCCESS & DIRECT DOWNLOAD (Mobile Friendly) */
            <div className="space-y-4 py-1">
              
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#D8F3DC] text-[#1C4D25] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-7 h-7 text-[#2D6A4F]" />
                </div>
                <h3 className="text-xl font-display font-bold text-[#14361B]">
                  Congratulations, {userName}!
                </h3>
                <p className="text-xs text-[#2E4F34]">
                  Payment of <strong className="text-[#1C4D25]">₹{currentEdition.priceINR}</strong> successful &bull; Order: <strong className="font-mono text-[#1C4D25]">{orderId}</strong>
                </p>
              </div>

              {/* Direct Instant PDF Download Button */}
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Download className="w-4 h-4 text-[#95D5B2]" />
                <span>Download E-Book PDF Now ({currentEdition.nativeLabel})</span>
              </button>

              {/* SMS Dispatch Card */}
              <div className="rounded-xl bg-[#F0FDF4] border border-[#86EFAC] p-3 space-y-1 text-xs">
                <div className="flex items-center justify-between text-[#166534] font-bold text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#15803D]" />
                    Confirmation SMS Sent
                  </span>
                  <span className="font-mono bg-[#DCFCE7] px-1.5 py-0.5 rounded text-[10px]">
                    +91 {userPhone || '9876543210'}
                  </span>
                </div>
                <p className="text-[#14361B] text-[11px] font-mono bg-white p-2 rounded-lg border border-[#BBF7D0]">
                  &ldquo;Congratulations {userName}! Your purchase of the Karam Utsav E-Book ({currentEdition.label}) for ₹{currentEdition.priceINR} is confirmed. Order ID: {orderId}. Johar!&rdquo;
                </p>
              </div>

              {/* Email Delivery Card */}
              <div className="rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] p-3 text-xs space-y-1">
                <div className="flex items-center justify-between text-[#1E40AF] font-bold text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                    PDF Delivered to Email
                  </span>
                  <span className="font-mono bg-[#DBEAFE] px-1.5 py-0.5 rounded text-[10px]">
                    {userEmail}
                  </span>
                </div>
                <p className="text-[#1E3A8A] text-[11px]">
                  A high-resolution PDF copy has been sent to <strong>{userEmail}</strong>.
                </p>
              </div>

              {/* Auto Redirect to Home Countdown */}
              <div className="bg-[#EDF4ED] p-3 rounded-xl border border-[#C5DEC5] flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#2E4F34] text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#2D6A4F] animate-spin" />
                  <span>Redirecting to Home in <strong className="text-[#1C4D25]">{redirectCountdown}s</strong>...</span>
                </div>

                <button
                  type="button"
                  onClick={handleCloseAndRedirectHome}
                  className="px-3 py-1.5 rounded-lg bg-[#2D6A4F] hover:bg-[#1C4D25] text-white font-bold text-xs cursor-pointer"
                >
                  Return to Home Now &rarr;
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
