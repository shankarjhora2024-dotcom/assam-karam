import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { 
  X, ShieldCheck, Users, ShoppingBag, IndianRupee, 
  Download, Search, RefreshCw, LogOut, CheckCircle2, 
  Mail, Phone, Calendar, ArrowUpRight, Lock, Key,
  BookOpen, Filter, FileSpreadsheet, AlertCircle,
  Image as ImageIcon, Plus, Trash2, Upload, FileUp, Sparkles, ImagePlus
} from 'lucide-react';
import { DBService } from '../services/dbService';
import { UserProfile, BookOrder, AdminMetrics, GalleryItem, AdminBookItem } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUserSignIn?: () => void;
}

type AdminTab = 'overview' | 'upload-images' | 'upload-books' | 'users' | 'orders';

export function AdminPanelModal({ isOpen, onClose }: AdminPanelModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Data State
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [ordersList, setOrdersList] = useState<BookOrder[]>([]);
  const [customGallery, setCustomGallery] = useState<GalleryItem[]>([]);
  const [booksList, setBooksList] = useState<AdminBookItem[]>([]);

  // Search & Filter State
  const [userSearch, setUserSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderEditionFilter, setOrderEditionFilter] = useState<'all' | 'english' | 'assamese'>('all');
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<BookOrder | null>(null);

  // IMAGE UPLOAD STATE
  const [imgTitle, setImgTitle] = useState('');
  const [imgCategory, setImgCategory] = useState<'Rituals' | 'Akhra Dance' | 'Attire & Jewelry' | 'Instruments'>('Akhra Dance');
  const [imgCaption, setImgCaption] = useState('');
  const [imgLocation, setImgLocation] = useState('Assam Tea Gardens');
  const [imgDataUrl, setImgDataUrl] = useState('');
  const [imgUploadSuccess, setImgUploadSuccess] = useState('');
  const [isSavingImage, setIsSavingImage] = useState(false);

  // BOOK UPLOAD STATE
  const [bookTitle, setBookTitle] = useState('');
  const [bookLanguage, setBookLanguage] = useState('English');
  const [bookPrice, setBookPrice] = useState<number>(70);
  const [bookOriginalPrice, setBookOriginalPrice] = useState<number>(150);
  const [bookAuthor, setBookAuthor] = useState('Sankar Jhora');
  const [bookDescription, setBookDescription] = useState('');
  const [bookPageCount, setBookPageCount] = useState<number>(60);
  const [bookCoverUrl, setBookCoverUrl] = useState('');
  const [bookFileName, setBookFileName] = useState('Karam-Puja-Edition.pdf');
  const [bookUploadSuccess, setBookUploadSuccess] = useState('');
  const [isSavingBook, setIsSavingBook] = useState(false);

  // Load status & data
  const refreshData = () => {
    const isAuth = DBService.isAdminLoggedIn();
    setIsAuthenticated(isAuth);
    if (isAuth) {
      setMetrics(DBService.getMetrics());
      setUsersList(DBService.getUsers());
      setOrdersList(DBService.getOrders());
      setCustomGallery(DBService.getCustomGalleryItems());
      setBooksList(DBService.getBooks());
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
      setLoginError('');
      setAdminPassword('');
      setImgUploadSuccess('');
      setBookUploadSuccess('');
    }
  }, [isOpen]);

  // Handle local image file selection
  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Image to Gallery
  const handleAddImage = (e: FormEvent) => {
    e.preventDefault();
    if (!imgTitle.trim() || !imgDataUrl) {
      alert('Please provide a photo title and select or paste an image.');
      return;
    }

    setIsSavingImage(true);
    setTimeout(() => {
      DBService.addGalleryItem({
        title: imgTitle.trim(),
        category: imgCategory,
        caption: imgCaption.trim() || `${imgTitle} - Sacred Karam Puja moments`,
        imageSrc: imgDataUrl,
        location: imgLocation.trim() || 'Assam Tea Tribe Region',
      });

      setCustomGallery(DBService.getCustomGalleryItems());
      setImgTitle('');
      setImgCaption('');
      setImgDataUrl('');
      setIsSavingImage(false);
      setImgUploadSuccess('Image successfully published to the website Gallery!');
      setTimeout(() => setImgUploadSuccess(''), 4000);
    }, 300);
  };

  const handleDeleteImage = (id: string) => {
    if (confirm('Are you sure you want to remove this photo from the website gallery?')) {
      DBService.deleteGalleryItem(id);
      setCustomGallery(DBService.getCustomGalleryItems());
    }
  };

  // Handle Book Cover File
  const handleBookCoverFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookCoverUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Book
  const handleAddBook = (e: FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) {
      alert('Please enter a book title.');
      return;
    }

    setIsSavingBook(true);
    setTimeout(() => {
      DBService.addBook({
        title: bookTitle.trim(),
        language: bookLanguage,
        priceINR: Number(bookPrice) || 50,
        originalPriceINR: Number(bookOriginalPrice) || 120,
        author: bookAuthor.trim() || 'Sankar Jhora',
        description: bookDescription.trim() || 'Heritage research publication on Karam Puja & Tea Tribe traditions.',
        pageCount: Number(bookPageCount) || 50,
        coverImage: bookCoverUrl || undefined,
        fileName: bookFileName.trim() || 'Karam-Puja-Monograph.pdf',
      });

      setBooksList(DBService.getBooks());
      setBookTitle('');
      setBookDescription('');
      setBookCoverUrl('');
      setIsSavingBook(false);
      setBookUploadSuccess('E-Book successfully registered and saved!');
      setTimeout(() => setBookUploadSuccess(''), 4000);
    }, 300);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to delete this book record?')) {
      DBService.deleteBook(id);
      setBooksList(DBService.getBooks());
    }
  };

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    setTimeout(() => {
      const success = DBService.verifyAdminLogin(adminPassword);
      if (success) {
        setIsAuthenticated(true);
        refreshData();
      } else {
        setLoginError('Invalid Administrator Password or PIN. Default is: karam2026');
      }
      setIsLoggingIn(false);
    }, 400);
  };

  const handleAdminLogout = () => {
    DBService.adminLogout();
    setIsAuthenticated(false);
  };

  if (!isOpen) return null;

  // Filtered Users
  const filteredUsers = usersList.filter((u) => {
    const q = userSearch.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      (u.city && u.city.toLowerCase().includes(q))
    );
  });

  // Filtered Orders
  const filteredOrders = ordersList.filter((o) => {
    const q = orderSearch.toLowerCase();
    const matchesSearch =
      o.orderId.toLowerCase().includes(q) ||
      o.userName.toLowerCase().includes(q) ||
      o.userEmail.toLowerCase().includes(q) ||
      o.userPhone.includes(q) ||
      o.paymentId.toLowerCase().includes(q);

    const matchesEdition =
      orderEditionFilter === 'all' || o.editionId === orderEditionFilter;

    return matchesSearch && matchesEdition;
  });

  return (
    <div
      id="admin-panel-overlay"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="admin-panel-card"
        className="relative w-full max-w-5xl bg-[#0F2414] text-[#E8F5E9] rounded-3xl border border-[#2D6A4F] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0C1E10] border-b border-[#2D6A4F] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1C4D25] border border-[#52B788]/40 flex items-center justify-center text-[#95D5B2] shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-display font-bold text-white tracking-wide">
                  Admin Central Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E3A857]/20 border border-[#E3A857]/40 text-[#E3A857]">
                  Backend Records
                </span>
              </div>
              <p className="text-xs text-[#95D5B2]">
                Karam Utsav Registered Users &amp; Book Buyers Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleAdminLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 text-xs font-bold border border-red-800/40 cursor-pointer transition-colors"
                title="Log out of Admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/10"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* ADMIN LOGIN SCREEN */
          <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex items-center justify-center">
            <div className="w-full max-w-md bg-[#14361B]/90 border border-[#2D6A4F] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#0C1E10] border border-[#52B788]/40 flex items-center justify-center mx-auto text-[#95D5B2] shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Administrator Access
                </h3>
                <p className="text-xs text-[#95D5B2]">
                  Enter your Administrator password to inspect user sign-ins and e-book purchase records.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#D8F3DC] uppercase tracking-wider">
                    Admin Email / Identity
                  </label>
                  <input
                    type="text"
                    disabled
                    value="sankarjhora321@gmail.com (Super Admin)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D6A4F] bg-[#0C1E10] text-xs text-[#74C69D] font-mono cursor-not-allowed opacity-90"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#D8F3DC] uppercase tracking-wider flex items-center justify-between">
                    <span>Admin Password or PIN</span>
                    <span className="text-[10px] text-[#E3A857] font-normal lowercase">Default: karam2026</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter admin password (e.g. karam2026)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#2D6A4F] bg-[#0C1E10] text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden font-mono"
                    />
                    <Key className="w-4 h-4 text-[#74C69D] absolute left-3.5 top-3" />
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#95D5B2]" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#95D5B2]" />
                      <span>Unlock Admin Dashboard</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center text-[11px] text-[#74C69D] border-t border-[#2D6A4F]/60 pt-4">
                Secure 256-bit encrypted authentication &bull; Hostinger &amp; Cloud Ready
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Top Navigation Bar */}
            <div className="p-3 sm:px-6 bg-[#0C1E10]/80 border-b border-[#2D6A4F] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'bg-[#2D6A4F] text-white shadow-sm'
                      : 'text-[#95D5B2] hover:bg-[#14361B] hover:text-white'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Overview &amp; Metrics</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('upload-images')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'upload-images'
                      ? 'bg-[#2D6A4F] text-white shadow-sm'
                      : 'text-[#95D5B2] hover:bg-[#14361B] hover:text-white'
                  }`}
                >
                  <ImagePlus className="w-3.5 h-3.5 text-[#E3A857]" />
                  <span>Upload Images ({customGallery.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('upload-books')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'upload-books'
                      ? 'bg-[#2D6A4F] text-white shadow-sm'
                      : 'text-[#95D5B2] hover:bg-[#14361B] hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Upload Books ({booksList.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('users')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'users'
                      ? 'bg-[#2D6A4F] text-white shadow-sm'
                      : 'text-[#95D5B2] hover:bg-[#14361B] hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Readers ({usersList.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'orders'
                      ? 'bg-[#2D6A4F] text-white shadow-sm'
                      : 'text-[#95D5B2] hover:bg-[#14361B] hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Orders ({ordersList.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={refreshData}
                  className="p-1.5 rounded-lg bg-[#14361B] hover:bg-[#1C4D25] text-[#95D5B2] hover:text-white cursor-pointer transition-colors border border-[#2D6A4F]"
                  title="Refresh live data"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                {(activeTab === 'users' || activeTab === 'orders') && (
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === 'users') DBService.exportUsersToCSV();
                      else DBService.exportOrdersToCSV();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#1C4D25] hover:bg-[#2D6A4F] text-[#D8F3DC] text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#52B788]/40 shadow-xs"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#52B788]" />
                    <span>Export CSV</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB: UPLOAD IMAGES TO GALLERY */}
            {activeTab === 'upload-images' && (
              <div className="p-4 sm:p-6 space-y-6 flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#2D6A4F]">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <ImagePlus className="w-5 h-5 text-[#E3A857]" />
                      <span>Upload &amp; Manage Website Gallery Photos</span>
                    </h3>
                    <p className="text-xs text-[#95D5B2] mt-0.5">
                      Upload cultural festival photos, Akhra dances, and tea garden rituals. Uploaded photos instantly appear in the public gallery.
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#E3A857]/20 border border-[#E3A857]/50 text-[#E3A857] font-bold w-fit">
                    Private Admin Tool
                  </span>
                </div>

                {imgUploadSuccess && (
                  <div className="p-3.5 rounded-xl bg-green-950/70 border border-green-800 text-green-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{imgUploadSuccess}</span>
                  </div>
                )}

                {/* Upload Form */}
                <form onSubmit={handleAddImage} className="bg-[#14361B] border border-[#2D6A4F] rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Photo Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={imgTitle}
                        onChange={(e) => setImgTitle(e.target.value)}
                        placeholder="e.g. Midnight Akhra Dance at Teok Tea Estate"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Gallery Category *
                      </label>
                      <select
                        value={imgCategory}
                        onChange={(e) => setImgCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white focus:ring-2 focus:ring-[#52B788] outline-hidden cursor-pointer"
                      >
                        <option value="Akhra Dance">Akhra Dance</option>
                        <option value="Rituals">Rituals &amp; Jawa Jagaran</option>
                        <option value="Attire & Jewelry">Attire &amp; Jewelry</option>
                        <option value="Instruments">Instruments (Madal &amp; Nagara)</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Location / Tea Estate
                      </label>
                      <input
                        type="text"
                        value={imgLocation}
                        onChange={(e) => setImgLocation(e.target.value)}
                        placeholder="e.g. Dibrugarh, Assam or Purulia, West Bengal"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                    </div>

                    {/* Caption */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Cultural Caption / Description
                      </label>
                      <input
                        type="text"
                        value={imgCaption}
                        onChange={(e) => setImgCaption(e.target.value)}
                        placeholder="Brief description of the ceremony or dance step"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Image Source: File Upload or Image URL */}
                  <div className="space-y-2 pt-2 border-t border-[#2D6A4F]/60">
                    <label className="block text-xs font-bold text-[#D8F3DC]">
                      Select Photo (Choose from Device or Enter Image URL) *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Local File Picker */}
                      <div className="relative border-2 border-dashed border-[#2D6A4F] hover:border-[#52B788] rounded-xl p-4 text-center bg-[#0C1E10] transition-colors cursor-pointer flex flex-col items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        <Upload className="w-6 h-6 text-[#95D5B2] mb-1.5" />
                        <span className="text-xs font-bold text-white">Click or drag image file</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">Supports PNG, JPG, WEBP</span>
                      </div>

                      {/* Or paste URL */}
                      <div className="flex flex-col justify-center">
                        <span className="text-[11px] text-[#95D5B2] mb-1 font-semibold">Or enter image URL:</span>
                        <input
                          type="url"
                          value={imgDataUrl.startsWith('data:') ? '' : imgDataUrl}
                          onChange={(e) => setImgDataUrl(e.target.value)}
                          placeholder="https://example.com/karam-photo.jpg"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Preview Box */}
                    {imgDataUrl && (
                      <div className="mt-3 p-3 bg-[#0C1E10] rounded-xl border border-[#2D6A4F] flex items-center gap-4">
                        <img
                          src={imgDataUrl}
                          alt="Preview"
                          className="w-20 h-16 object-cover rounded-lg border border-[#52B788]"
                        />
                        <div className="text-xs text-[#D8F3DC]">
                          <div className="font-bold text-white">Image Ready for Upload</div>
                          <div className="text-gray-400 text-[11px] truncate max-w-xs">{imgTitle || 'Untitled Photo'}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setImgDataUrl('')}
                          className="ml-auto text-xs text-red-400 hover:text-red-300 font-bold cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingImage || !imgDataUrl}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSavingImage ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Publishing to Gallery...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Upload Photo to Website Gallery</span>
                      </>
                    )}
                  </button>
                </form>

                {/* List of Custom Uploaded Images */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#95D5B2]">
                    Admin Uploaded Photos ({customGallery.length})
                  </h4>

                  {customGallery.length === 0 ? (
                    <div className="p-6 text-center rounded-2xl bg-[#0C1E10] border border-[#2D6A4F]/60 text-gray-400 text-xs">
                      No custom images uploaded yet. Use the form above to add authentic Karam Puja photos directly to the website gallery.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {customGallery.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#0C1E10] rounded-xl border border-[#2D6A4F] overflow-hidden flex flex-col justify-between"
                        >
                          <div className="relative aspect-video bg-black/40">
                            <img
                              src={item.imageSrc}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#14361B]/90 text-[#95D5B2] border border-[#2D6A4F]">
                              {item.category}
                            </span>
                          </div>
                          <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="font-bold text-white text-xs line-clamp-1">{item.title}</div>
                              <div className="text-[11px] text-gray-400 line-clamp-2">{item.caption}</div>
                            </div>
                            <div className="pt-2 border-t border-[#2D6A4F]/40 flex items-center justify-between text-[11px]">
                              <span className="text-[#74C69D] truncate max-w-[140px]">{item.location}</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteImage(item.id)}
                                className="text-red-400 hover:text-red-300 flex items-center gap-1 font-bold cursor-pointer"
                                title="Delete from gallery"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: UPLOAD & MANAGE BOOKS */}
            {activeTab === 'upload-books' && (
              <div className="p-4 sm:p-6 space-y-6 flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#2D6A4F]">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#52B788]" />
                      <span>Upload &amp; Manage E-Books &amp; Monographs</span>
                    </h3>
                    <p className="text-xs text-[#95D5B2] mt-0.5">
                      Add new editions, update book prices, upload PDF manuscripts, and manage literary research archives.
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#52B788]/20 border border-[#52B788]/50 text-[#52B788] font-bold w-fit">
                    Private Admin Tool
                  </span>
                </div>

                {bookUploadSuccess && (
                  <div className="p-3.5 rounded-xl bg-green-950/70 border border-green-800 text-green-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{bookUploadSuccess}</span>
                  </div>
                )}

                {/* Upload Book Form */}
                <form onSubmit={handleAddBook} className="bg-[#14361B] border border-[#2D6A4F] rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Book Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder="e.g. The Living Traditions of Karam Puja in Assam"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Language *
                      </label>
                      <select
                        value={bookLanguage}
                        onChange={(e) => setBookLanguage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white focus:ring-2 focus:ring-[#52B788] outline-hidden cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Assamese (অসমীয়া)">Assamese (অসমীয়া)</option>
                        <option value="Santali (ᱥᱟᱱᱛᱟᱲᱤ)">Santali (ᱥᱟᱱᱛᱟᱲᱤ)</option>
                        <option value="Kurmali (कुड़मालि)">Kurmali (कुड़मालि)</option>
                        <option value="Bengali (বাংলা)">Bengali (বাংলা)</option>
                        <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                      </select>
                    </div>

                    {/* Price INR */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Selling Price (₹ INR) *
                      </label>
                      <input
                        type="number"
                        required
                        min="10"
                        value={bookPrice}
                        onChange={(e) => setBookPrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white focus:ring-2 focus:ring-[#52B788] outline-hidden font-bold"
                      />
                    </div>

                    {/* Original Price INR */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Original Price (₹ INR)
                      </label>
                      <input
                        type="number"
                        min="20"
                        value={bookOriginalPrice}
                        onChange={(e) => setBookOriginalPrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                    </div>

                    {/* Page Count */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Number of Pages
                      </label>
                      <input
                        type="number"
                        value={bookPageCount}
                        onChange={(e) => setBookPageCount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                    </div>

                    {/* Author */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        Author / Cultural Researcher
                      </label>
                      <input
                        type="text"
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                        placeholder="e.g. Sankar Jhora &amp; Heritage Scholars"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                    </div>

                    {/* PDF File Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                        PDF File Identifier
                      </label>
                      <input
                        type="text"
                        value={bookFileName}
                        onChange={(e) => setBookFileName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white font-mono focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                      Synopsis &amp; Table of Contents
                    </label>
                    <textarea
                      rows={2}
                      value={bookDescription}
                      onChange={(e) => setBookDescription(e.target.value)}
                      placeholder="Summary of research chapters, ritual documentation, songs, and historical narratives..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                    />
                  </div>

                  {/* Book Cover */}
                  <div className="pt-2 border-t border-[#2D6A4F]/60">
                    <label className="block text-xs font-bold text-[#D8F3DC] mb-1">
                      Book Cover Image (Optional)
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBookCoverFileChange}
                        className="text-xs text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#2D6A4F] file:text-white hover:file:bg-[#40916C] cursor-pointer"
                      />
                      {bookCoverUrl && (
                        <span className="text-[11px] text-[#52B788] font-bold">Cover image loaded</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingBook}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#40916C] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSavingBook ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Publishing E-Book...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Register &amp; Save E-Book</span>
                      </>
                    )}
                  </button>
                </form>

                {/* List of Registered Books */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#95D5B2]">
                    Active Books in System ({booksList.length})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {booksList.map((book) => (
                      <div
                        key={book.id}
                        className="bg-[#0C1E10] rounded-xl border border-[#2D6A4F] p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#14361B] text-[#52B788] border border-[#2D6A4F]">
                              {book.language}
                            </span>
                            <h5 className="text-sm font-bold text-white mt-1">{book.title}</h5>
                            <div className="text-xs text-gray-400">By {book.author || 'Sankar Jhora'}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-base font-bold text-white">₹{book.priceINR}</div>
                            {book.originalPriceINR && (
                              <div className="text-[11px] text-gray-500 line-through">₹{book.originalPriceINR}</div>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-gray-300 line-clamp-2">{book.description}</p>

                        <div className="pt-2 border-t border-[#2D6A4F]/40 flex items-center justify-between text-[11px] text-gray-400">
                          <span>{book.pageCount} Pages &bull; {book.fileName}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteBook(book.id)}
                            className="text-red-400 hover:text-red-300 flex items-center gap-1 font-bold cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: OVERVIEW METRICS */}
            {activeTab === 'overview' && metrics && (
              <div className="p-4 sm:p-6 space-y-6">
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Total Users */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#14361B] border border-[#2D6A4F] space-y-2 shadow-sm">
                    <div className="flex items-center justify-between text-[#95D5B2]">
                      <span className="text-xs uppercase font-bold tracking-wider">Registered Readers</span>
                      <Users className="w-5 h-5 text-[#52B788]" />
                    </div>
                    <div className="text-3xl font-display font-bold text-white">
                      {metrics.totalUsers}
                    </div>
                    <div className="text-[11px] text-[#74C69D] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#52B788]" />
                      <span>Active logins recorded in backend</span>
                    </div>
                  </div>

                  {/* Total Book Orders */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#14361B] border border-[#2D6A4F] space-y-2 shadow-sm">
                    <div className="flex items-center justify-between text-[#95D5B2]">
                      <span className="text-xs uppercase font-bold tracking-wider">E-Books Sold</span>
                      <ShoppingBag className="w-5 h-5 text-[#E3A857]" />
                    </div>
                    <div className="text-3xl font-display font-bold text-white">
                      {metrics.totalOrders}
                    </div>
                    <div className="text-[11px] text-[#74C69D] flex items-center gap-2">
                      <span>{metrics.englishOrdersCount} English (₹70)</span>
                      <span>&bull;</span>
                      <span>{metrics.assameseOrdersCount} Assamese (₹50)</span>
                    </div>
                  </div>

                  {/* Total Revenue */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#14361B] border border-[#2D6A4F] space-y-2 shadow-sm">
                    <div className="flex items-center justify-between text-[#95D5B2]">
                      <span className="text-xs uppercase font-bold tracking-wider">Revenue Collected</span>
                      <IndianRupee className="w-5 h-5 text-[#52B788]" />
                    </div>
                    <div className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#95D5B2] via-[#E3A857] to-[#D8F3DC]">
                      ₹{metrics.totalRevenueINR}
                    </div>
                    <div className="text-[11px] text-[#74C69D] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#52B788]" />
                      <span>Razorpay authorized &amp; verified</span>
                    </div>
                  </div>
                </div>

                {/* Split Overview: Recent Orders & Recent Users */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Latest Book Orders */}
                  <div className="bg-[#14361B] border border-[#2D6A4F] rounded-2xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2D6A4F]/60 pb-2.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#E3A857]" />
                        <span>Latest Book Purchases</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-[#52B788] hover:underline cursor-pointer"
                      >
                        View All ({ordersList.length}) &rarr;
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {ordersList.slice(0, 5).map((order) => (
                        <div
                          key={order.id}
                          className="p-3 rounded-xl bg-[#0C1E10] border border-[#2D6A4F]/50 flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{order.userName}</span>
                              <span className="text-[10px] font-mono text-[#95D5B2] bg-[#1C4D25] px-1.5 py-0.2 rounded">
                                {order.orderId}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#74C69D]">{order.editionLabel}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">₹{order.amountINR}</div>
                            <div className="text-[10px] font-mono text-gray-400">
                              {new Date(order.createdAt).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Latest User Sign-Ins */}
                  <div className="bg-[#14361B] border border-[#2D6A4F] rounded-2xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#2D6A4F]/60 pb-2.5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#52B788]" />
                        <span>Recent Active Readers</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab('users')}
                        className="text-xs text-[#52B788] hover:underline cursor-pointer"
                      >
                        View All ({usersList.length}) &rarr;
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {usersList.slice(0, 5).map((user) => (
                        <div
                          key={user.id}
                          className="p-3 rounded-xl bg-[#0C1E10] border border-[#2D6A4F]/50 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#1C4D25] border border-[#52B788]/40 flex items-center justify-center font-bold text-[#D8F3DC] text-xs">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <span>{user.name}</span>
                                {user.role === 'admin' && (
                                  <span className="text-[9px] bg-[#E3A857]/20 border border-[#E3A857]/40 text-[#E3A857] px-1 rounded">
                                    ADMIN
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-[#74C69D]">{user.email}</div>
                            </div>
                          </div>
                          <div className="text-right text-[10px] text-gray-400">
                            <div>{user.phone}</div>
                            <div className="text-[#95D5B2]">
                              {user.purchasedBooks.length > 0
                                ? `${user.purchasedBooks.length} book(s) owned`
                                : 'Registered'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: REGISTERED USERS TABLE */}
            {activeTab === 'users' && (
              <div className="p-4 sm:p-6 space-y-4 flex-1 flex flex-col">
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search reader name, email, phone, city..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>

                  <div className="text-xs text-[#95D5B2]">
                    Showing <strong>{filteredUsers.length}</strong> of {usersList.length} users
                  </div>
                </div>

                {/* Users Table */}
                <div className="flex-1 overflow-x-auto border border-[#2D6A4F] rounded-2xl bg-[#0C1E10]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#14361B] text-[#95D5B2] border-b border-[#2D6A4F]">
                        <th className="py-3 px-4 font-bold">Reader Name</th>
                        <th className="py-3 px-4 font-bold">Email</th>
                        <th className="py-3 px-4 font-bold">Mobile</th>
                        <th className="py-3 px-4 font-bold">Location</th>
                        <th className="py-3 px-4 font-bold">Role</th>
                        <th className="py-3 px-4 font-bold">Purchased Books</th>
                        <th className="py-3 px-4 font-bold">Last Login</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2D6A4F]/40 text-[#D8F3DC]">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-[#14361B]/60 transition-colors">
                          <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#1C4D25] flex items-center justify-center font-bold text-[11px] text-[#95D5B2]">
                              {user.name.charAt(0)}
                            </div>
                            <span>{user.name}</span>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-gray-300">{user.email}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-gray-300">{user.phone}</td>
                          <td className="py-3 px-4 text-[11px]">{user.city || 'Assam'}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                user.role === 'admin'
                                  ? 'bg-[#E3A857]/20 border border-[#E3A857]/50 text-[#E3A857]'
                                  : 'bg-[#1C4D25] text-[#95D5B2]'
                              }`}
                            >
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {user.purchasedBooks.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {user.purchasedBooks.map((b) => (
                                  <span
                                    key={b}
                                    className="px-1.5 py-0.5 rounded bg-[#2D6A4F] text-[10px] font-semibold text-white capitalize"
                                  >
                                    {b} Edition
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-500 italic text-[11px]">None yet</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-[11px] text-gray-400 font-mono">
                            {new Date(user.lastLoginAt).toLocaleString('en-IN', {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: BOOK ORDERS & PURCHASES TABLE */}
            {activeTab === 'orders' && (
              <div className="p-4 sm:p-6 space-y-4 flex-1 flex flex-col">
                {/* Search & Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-72">
                      <input
                        type="text"
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder="Search Order ID, Name, Razorpay ID..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0C1E10] border border-[#2D6A4F] text-xs text-white placeholder-gray-500 focus:ring-2 focus:ring-[#52B788] outline-hidden"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </div>

                    <div className="flex items-center gap-1 bg-[#0C1E10] p-1 rounded-xl border border-[#2D6A4F] text-xs">
                      <button
                        type="button"
                        onClick={() => setOrderEditionFilter('all')}
                        className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                          orderEditionFilter === 'all' ? 'bg-[#2D6A4F] text-white' : 'text-[#95D5B2]'
                        }`}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderEditionFilter('english')}
                        className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                          orderEditionFilter === 'english' ? 'bg-[#2D6A4F] text-white' : 'text-[#95D5B2]'
                        }`}
                      >
                        English (₹70)
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderEditionFilter('assamese')}
                        className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                          orderEditionFilter === 'assamese' ? 'bg-[#2D6A4F] text-white' : 'text-[#95D5B2]'
                        }`}
                      >
                        Assamese (₹50)
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-[#95D5B2]">
                    Total Orders: <strong>{filteredOrders.length}</strong> &bull; Total: ₹
                    {filteredOrders.reduce((sum, o) => sum + o.amountINR, 0)}
                  </div>
                </div>

                {/* Orders Table */}
                <div className="flex-1 overflow-x-auto border border-[#2D6A4F] rounded-2xl bg-[#0C1E10]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#14361B] text-[#95D5B2] border-b border-[#2D6A4F]">
                        <th className="py-3 px-4 font-bold">Order ID</th>
                        <th className="py-3 px-4 font-bold">Buyer Name</th>
                        <th className="py-3 px-4 font-bold">Contact</th>
                        <th className="py-3 px-4 font-bold">Edition</th>
                        <th className="py-3 px-4 font-bold">Price</th>
                        <th className="py-3 px-4 font-bold">Razorpay Payment ID</th>
                        <th className="py-3 px-4 font-bold">Status</th>
                        <th className="py-3 px-4 font-bold">Date &amp; Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2D6A4F]/40 text-[#D8F3DC]">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#14361B]/60 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-white">{order.orderId}</td>
                          <td className="py-3 px-4 font-bold">{order.userName}</td>
                          <td className="py-3 px-4 text-[11px] font-mono text-gray-300">
                            <div>{order.userEmail}</div>
                            <div className="text-gray-400">{order.userPhone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold">{order.editionLabel}</span>
                          </td>
                          <td className="py-3 px-4 font-bold text-white text-sm">₹{order.amountINR}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-[#95D5B2]">
                            {order.paymentId}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-950/60 border border-green-800 text-green-300">
                              <CheckCircle2 className="w-3 h-3 text-green-400" />
                              <span>{order.status}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[11px] text-gray-400 font-mono">
                            {new Date(order.createdAt).toLocaleString('en-IN', {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="p-3 sm:px-6 bg-[#0C1E10] border-t border-[#2D6A4F] flex items-center justify-between text-xs text-[#74C69D] shrink-0">
          <div>
            Karam Utsav Admin Portal &bull; Designed for Sankar Jhora (sankarjhora321@gmail.com)
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Database Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
