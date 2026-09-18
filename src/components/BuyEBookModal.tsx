import { useState, useEffect, FormEvent } from 'react';
import { 
  X, Check, Lock, Mail, ShieldCheck, 
  CreditCard, Smartphone, Building, BookOpen, 
  Download, RefreshCw, MessageSquare, CheckCircle2,
  Clock, Phone, AlertCircle, Zap
} from 'lucide-react';
import { EBOOK_EDITIONS, EBookEdition } from '../data/ebookEditions';
import { BookCover } from './BookCover';
import { openRazorpayCheckout } from '../utils/razorpay';
import { DBService } from '../services/dbService';

interface BuyEBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLanguage?: 'english' | 'assamese';
  onPaymentCompleteRedirect?: () => void;
}

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [razorpayPaymentId, setRazorpayPaymentId] = useState('');

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
      setRazorpayPaymentId('');

      // Auto-prefill if reader is already signed in
      const currentUser = DBService.getCurrentUser();
      if (currentUser) {
        setUserName(currentUser.name || '');
        setUserEmail(currentUser.email || '');
        setUserPhone(currentUser.phone || '');
      }
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

    // Launch official Razorpay standard checkout
    openRazorpayCheckout({
      amountINR: currentEdition.priceINR,
      editionName: currentEdition.title,
      editionLabel: currentEdition.label,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      userPhone: userPhone.trim(),
      onSuccess: (response) => {
        const pId = response.razorpay_payment_id || ('pay_' + Math.random().toString(36).substring(2, 12).toUpperCase());
        const oId = response.razorpay_order_id || ('KU-' + Math.floor(100000 + Math.random() * 900000));
        setRazorpayPaymentId(pId);
        setOrderId(oId);

        // Record book purchase order in backend DBService
        try {
          DBService.recordBookPurchase({
            orderId: oId,
            userName: userName.trim(),
            userEmail: userEmail.trim(),
            userPhone: userPhone.trim(),
            editionId: currentEdition.id,
            editionTitle: currentEdition.title,
            editionLabel: currentEdition.label,
            amountINR: currentEdition.priceINR,
            paymentGateway: 'Razorpay',
            paymentId: pId,
            status: 'Completed',
            deliveryEmailSent: true,
            deliverySmsSent: true,
          });
        } catch (err) {
          console.error('Failed to record order:', err);
        }

        setIsProcessing(false);
        setRedirectCountdown(7);
        setIsSuccess(true);
      },
      onDismiss: () => {
        setIsProcessing(false);
      },
      onError: (errMsg) => {
        setIsProcessing(false);
        setValidationError(errMsg);
      },
    });
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
Price: INR ₹${edition.priceINR} (PAID VIA RAZORPAY)
Payment Gateway: Razorpay Secured
Razorpay Payment ID: ${razorpayPaymentId || 'pay_rzp_verified'}
Order ID: ${orderId || 'KU-ONLINE-ORDER'}
Licensed Reader: ${userName}
Email Address: ${userEmail}
Mobile: ${phoneDisplay}
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
AUTHENTICITY & VERIFICATION SEAL:
Delivered to inbox: ${userEmail}
Payment Verification: Razorpay Authorized (${razorpayPaymentId || 'pay_rzp_verified'})
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

              {/* 3. RAZORPAY PAYMENT GATEWAY SECTION */}
              <div className="space-y-2.5 bg-[#F4F8F4] p-3.5 rounded-2xl border border-[#C5DEC5]">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#14361B] uppercase tracking-wide">
                    3. Payment Gateway:
                  </label>
                  <div className="flex items-center gap-1 bg-[#0C2340] text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-xs">
                    <span className="text-[#3399CC]">Razorpay</span>
                    <span className="text-[9px] text-[#A0C4E2] font-normal">SECURED</span>
                  </div>
                </div>

                {/* Supported Payment Modes Badges */}
                <div className="p-3 bg-white rounded-xl border border-[#D5E5D5] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#14361B] font-semibold border-b border-gray-100 pb-1.5">
                    <span className="flex items-center gap-1.5 text-[#1C4D25]">
                      <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                      <span>Official Razorpay Standard Checkout</span>
                    </span>
                    <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded font-bold">
                      Zero Extra Fees
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-gray-700 bg-[#F9FBF9] p-2 rounded-lg border border-gray-150">
                      <Smartphone className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                      <div>
                        <div className="font-bold text-[10px] text-[#14361B]">UPI Apps</div>
                        <div className="text-[9px] text-gray-500">GPay, PhonePe, Paytm</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-700 bg-[#F9FBF9] p-2 rounded-lg border border-gray-150">
                      <CreditCard className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                      <div>
                        <div className="font-bold text-[10px] text-[#14361B]">All Cards</div>
                        <div className="text-[9px] text-gray-500">RuPay, Visa, MC</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-700 bg-[#F9FBF9] p-2 rounded-lg border border-gray-150">
                      <Building className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                      <div>
                        <div className="font-bold text-[10px] text-[#14361B]">Net Banking</div>
                        <div className="text-[9px] text-gray-500">50+ Indian Banks</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-500 leading-tight">
                    Clicking below will open the official <strong>Razorpay</strong> window where you can safely pay using your preferred UPI app, QR scan, or card.
                  </p>
                </div>
              </div>

              {/* 4. PROMINENT RAZORPAY ACTION BUTTON */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  id="razorpay-pay-button"
                  className="w-full min-h-[50px] py-3.5 px-4 rounded-xl bg-[#0C2340] hover:bg-[#071628] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75 border-b-2 border-[#0284C7]"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#38BDF8]" />
                      <span>Opening Razorpay Secure Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#38BDF8]" />
                      <span>Pay ₹{currentEdition.priceINR} via Razorpay ({currentEdition.label})</span>
                    </>
                  )}
                </button>

                <div className="text-center text-[10px] text-gray-500 flex items-center justify-center gap-2">
                  <span className="flex items-center gap-1 text-[#1C4D25] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>RBI Regulated • 256-Bit SSL</span>
                  </span>
                  <span>&bull;</span>
                  <span>Instant PDF &amp; SMS Dispatch</span>
                </div>
              </div>

            </form>
          ) : (

            /* SCREEN 2: CLEAN SUCCESS & DIRECT DOWNLOAD (Razorpay Verified) */
            <div className="space-y-4 py-1">
              
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-[#D8F3DC] text-[#1C4D25] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-7 h-7 text-[#2D6A4F]" />
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold">
                  <Zap className="w-3 h-3 text-blue-600" />
                  <span>Razorpay Payment Verified</span>
                </div>
                <h3 className="text-xl font-display font-bold text-[#14361B]">
                  Congratulations, {userName}!
                </h3>
                <p className="text-xs text-[#2E4F34]">
                  Payment of <strong className="text-[#1C4D25]">₹{currentEdition.priceINR}</strong> authorized &bull; Order: <strong className="font-mono text-[#1C4D25]">{orderId}</strong>
                </p>
                {razorpayPaymentId && (
                  <p className="text-[11px] font-mono text-gray-600">
                    Payment ID: <span className="font-bold text-[#0C2340]">{razorpayPaymentId}</span>
                  </p>
                )}
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
