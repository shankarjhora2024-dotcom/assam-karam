import { UserProfile, BookOrder, AdminMetrics, GalleryItem, AdminBookItem } from '../types';
import { GALLERY_ITEMS } from '../data/karamData';

const STORAGE_USERS_KEY = 'karam_utsav_users_v1';
const STORAGE_ORDERS_KEY = 'karam_utsav_orders_v1';
const STORAGE_CURRENT_USER_KEY = 'karam_utsav_current_user';
const STORAGE_ADMIN_SESSION_KEY = 'karam_utsav_admin_session';
const STORAGE_GALLERY_KEY = 'karam_utsav_custom_gallery_v2';
const STORAGE_BOOKS_KEY = 'karam_utsav_custom_books_v2';

// Initial realistic community data
const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr_101',
    name: 'Sankar Jhora',
    email: 'sankarjhora321@gmail.com',
    phone: '9864012345',
    city: 'Dibrugarh, Assam',
    role: 'admin',
    joinedAt: '2026-09-10T10:30:00Z',
    lastLoginAt: '2026-09-17T11:45:00Z',
    purchasedBooks: ['english', 'assamese'],
  },
  {
    id: 'usr_102',
    name: 'Anjali Kerketta',
    email: 'anjali.kerketta@gmail.com',
    phone: '9435019876',
    city: 'Tezpur, Sonitpur',
    role: 'user',
    joinedAt: '2026-09-12T14:15:00Z',
    lastLoginAt: '2026-09-16T18:20:00Z',
    purchasedBooks: ['english'],
  },
  {
    id: 'usr_103',
    name: 'Bikash Karmakar',
    email: 'bikash.tea@rediffmail.com',
    phone: '9854034567',
    city: 'Jorhat, Assam',
    role: 'user',
    joinedAt: '2026-09-14T09:00:00Z',
    lastLoginAt: '2026-09-17T08:10:00Z',
    purchasedBooks: ['assamese'],
  },
  {
    id: 'usr_104',
    name: 'Priyanka Tanti',
    email: 'priyanka.tanti@gmail.com',
    phone: '8721945678',
    city: 'Tinsukia, Assam',
    role: 'user',
    joinedAt: '2026-09-15T16:40:00Z',
    lastLoginAt: '2026-09-16T21:05:00Z',
    purchasedBooks: ['english', 'assamese'],
  },
  {
    id: 'usr_105',
    name: 'Ranjit Munda',
    email: 'ranjit.munda@outlook.com',
    phone: '7002134980',
    city: 'Ranchi, Jharkhand',
    role: 'user',
    joinedAt: '2026-09-16T11:20:00Z',
    lastLoginAt: '2026-09-17T09:30:00Z',
    purchasedBooks: ['english'],
  },
];

const INITIAL_ORDERS: BookOrder[] = [
  {
    id: 'ord_201',
    orderId: 'KU-847291',
    userName: 'Sankar Jhora',
    userEmail: 'sankarjhora321@gmail.com',
    userPhone: '9864012345',
    editionId: 'english',
    editionTitle: 'Karam Utsav: Sacred Boughs of the Akhra',
    editionLabel: 'English Edition',
    amountINR: 70,
    paymentGateway: 'Razorpay',
    paymentId: 'pay_Pq7vM91La4kQ',
    status: 'Completed',
    createdAt: '2026-09-10T10:45:00Z',
    deliveryEmailSent: true,
    deliverySmsSent: true,
  },
  {
    id: 'ord_202',
    orderId: 'KU-519284',
    userName: 'Anjali Kerketta',
    userEmail: 'anjali.kerketta@gmail.com',
    userPhone: '9435019876',
    editionId: 'english',
    editionTitle: 'Karam Utsav: Sacred Boughs of the Akhra',
    editionLabel: 'English Edition',
    amountINR: 70,
    paymentGateway: 'Razorpay',
    paymentId: 'pay_Lk2wX83Op1mZ',
    status: 'Completed',
    createdAt: '2026-09-12T14:30:00Z',
    deliveryEmailSent: true,
    deliverySmsSent: true,
  },
  {
    id: 'ord_203',
    orderId: 'KU-362910',
    userName: 'Bikash Karmakar',
    userEmail: 'bikash.tea@rediffmail.com',
    userPhone: '9854034567',
    editionId: 'assamese',
    editionTitle: 'কৰম পৰব: প্ৰকৃতি আৰু চাহ জনগোষ্ঠীৰ ঐতিহ্য',
    editionLabel: 'Assamese Edition',
    amountINR: 50,
    paymentGateway: 'Razorpay',
    paymentId: 'pay_Za9bC74Qe5rT',
    status: 'Completed',
    createdAt: '2026-09-14T09:15:00Z',
    deliveryEmailSent: true,
    deliverySmsSent: true,
  },
  {
    id: 'ord_204',
    orderId: 'KU-928471',
    userName: 'Priyanka Tanti',
    userEmail: 'priyanka.tanti@gmail.com',
    userPhone: '8721945678',
    editionId: 'english',
    editionTitle: 'Karam Utsav: Sacred Boughs of the Akhra',
    editionLabel: 'English Edition',
    amountINR: 70,
    paymentGateway: 'Razorpay',
    paymentId: 'pay_Mn4pY62Vw8kL',
    status: 'Completed',
    createdAt: '2026-09-15T16:50:00Z',
    deliveryEmailSent: true,
    deliverySmsSent: true,
  },
  {
    id: 'ord_205',
    orderId: 'KU-194820',
    userName: 'Priyanka Tanti',
    userEmail: 'priyanka.tanti@gmail.com',
    userPhone: '8721945678',
    editionId: 'assamese',
    editionTitle: 'কৰম পৰব: প্ৰকৃতি আৰু চাহ জনগোষ্ঠীৰ ঐতিহ্য',
    editionLabel: 'Assamese Edition',
    amountINR: 50,
    paymentGateway: 'Razorpay',
    paymentId: 'pay_Rt8vU31Hg2jK',
    status: 'Completed',
    createdAt: '2026-09-15T16:55:00Z',
    deliveryEmailSent: true,
    deliverySmsSent: true,
  },
  {
    id: 'ord_206',
    orderId: 'KU-773821',
    userName: 'Ranjit Munda',
    userEmail: 'ranjit.munda@outlook.com',
    userPhone: '7002134980',
    editionId: 'english',
    editionTitle: 'Karam Utsav: Sacred Boughs of the Akhra',
    editionLabel: 'English Edition',
    amountINR: 70,
    paymentGateway: 'Razorpay',
    paymentId: 'pay_Gh5tY90Bn1mK',
    status: 'Completed',
    createdAt: '2026-09-16T11:35:00Z',
    deliveryEmailSent: true,
    deliverySmsSent: true,
  },
];

export class DBService {
  // Read Users
  static getUsers(): UserProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  }

  // Save Users
  static saveUsers(users: UserProfile[]): void {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to localStorage:', e);
    }
  }

  // Register or Sign In a User
  static signInOrRegister(name: string, email: string, phone: string, city?: string): UserProfile {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const users = this.getUsers();

    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);
    const now = new Date().toISOString();

    let user: UserProfile;
    if (existingIndex >= 0) {
      // Update existing user's last login
      user = {
        ...users[existingIndex],
        name: cleanName || users[existingIndex].name,
        phone: cleanPhone || users[existingIndex].phone,
        city: city?.trim() || users[existingIndex].city,
        lastLoginAt: now,
      };
      users[existingIndex] = user;
    } else {
      // New user
      user = {
        id: 'usr_' + Math.floor(1000 + Math.random() * 9000),
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        city: city?.trim() || 'Assam / Tea Tribe Region',
        role: cleanEmail === 'sankarjhora321@gmail.com' || cleanEmail.includes('admin') ? 'admin' : 'user',
        joinedAt: now,
        lastLoginAt: now,
        purchasedBooks: [],
      };
      users.unshift(user);
    }

    this.saveUsers(users);
    this.setCurrentUser(user);
    return user;
  }

  // Current session user
  static getCurrentUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: UserProfile | null): void {
    try {
      if (user) {
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Error setting current user:', e);
    }
  }

  static signOutUser(): void {
    this.setCurrentUser(null);
  }

  // Read Orders
  static getOrders(): BookOrder[] {
    try {
      const stored = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  }

  // Save Orders
  static saveOrders(orders: BookOrder[]): void {
    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to localStorage:', e);
    }
  }

  // Record a New Book Purchase Order
  static recordBookPurchase(order: Omit<BookOrder, 'id' | 'createdAt'>): BookOrder {
    const orders = this.getOrders();
    const newOrder: BookOrder = {
      ...order,
      id: 'ord_' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    this.saveOrders(orders);

    // Also register or update user record
    const user = this.signInOrRegister(order.userName, order.userEmail, order.userPhone);
    const users = this.getUsers();
    const userIdx = users.findIndex((u) => u.id === user.id);
    if (userIdx >= 0) {
      if (!users[userIdx].purchasedBooks.includes(order.editionId)) {
        users[userIdx].purchasedBooks.push(order.editionId);
        this.saveUsers(users);
        this.setCurrentUser(users[userIdx]);
      }
    }

    return newOrder;
  }

  // Compute Metrics for Admin Dashboard
  static getMetrics(): AdminMetrics {
    const users = this.getUsers();
    const orders = this.getOrders();

    const totalRevenueINR = orders
      .filter((o) => o.status === 'Completed')
      .reduce((sum, o) => sum + o.amountINR, 0);

    const englishOrdersCount = orders.filter((o) => o.editionId === 'english').length;
    const assameseOrdersCount = orders.filter((o) => o.editionId === 'assamese').length;

    return {
      totalUsers: users.length,
      totalOrders: orders.length,
      totalRevenueINR,
      englishOrdersCount,
      assameseOrdersCount,
      recentOrders: orders.slice(0, 10),
      recentUsers: users.slice(0, 10),
    };
  }

  // Admin Authentication
  static isAdminLoggedIn(): boolean {
    try {
      const token = sessionStorage.getItem(STORAGE_ADMIN_SESSION_KEY) || localStorage.getItem(STORAGE_ADMIN_SESSION_KEY);
      return token === 'karam_admin_authenticated_2026';
    } catch {
      return false;
    }
  }

  static verifyAdminLogin(passwordOrPin: string, email?: string): boolean {
    const cleanPass = passwordOrPin.trim();
    // Default master admin password or PIN
    const validPasswords = ['karam2026', 'admin123', 'karam@2026', '9864'];
    if (validPasswords.includes(cleanPass)) {
      try {
        sessionStorage.setItem(STORAGE_ADMIN_SESSION_KEY, 'karam_admin_authenticated_2026');
        localStorage.setItem(STORAGE_ADMIN_SESSION_KEY, 'karam_admin_authenticated_2026');
      } catch {}
      return true;
    }
    return false;
  }

  static adminLogout(): void {
    try {
      sessionStorage.removeItem(STORAGE_ADMIN_SESSION_KEY);
      localStorage.removeItem(STORAGE_ADMIN_SESSION_KEY);
    } catch {}
  }

  // Export Data to CSV
  static exportOrdersToCSV(): void {
    const orders = this.getOrders();
    const headers = ['Order ID', 'Reader Name', 'Email', 'Phone', 'Edition', 'Amount (INR)', 'Payment Gateway', 'Payment ID', 'Status', 'Date Time'];
    const rows = orders.map((o) => [
      o.orderId,
      `"${o.userName.replace(/"/g, '""')}"`,
      o.userEmail,
      o.userPhone,
      `"${o.editionLabel}"`,
      o.amountINR,
      o.paymentGateway,
      o.paymentId,
      o.status,
      new Date(o.createdAt).toLocaleString('en-IN'),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `karam_utsav_orders_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  static exportUsersToCSV(): void {
    const users = this.getUsers();
    const headers = ['User ID', 'Name', 'Email', 'Phone', 'City', 'Role', 'Books Purchased', 'Joined Date', 'Last Active'];
    const rows = users.map((u) => [
      u.id,
      `"${u.name.replace(/"/g, '""')}"`,
      u.email,
      u.phone,
      `"${(u.city || '').replace(/"/g, '""')}"`,
      u.role,
      `"${u.purchasedBooks.join(', ')}"`,
      new Date(u.joinedAt).toLocaleString('en-IN'),
      new Date(u.lastLoginAt).toLocaleString('en-IN'),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `karam_utsav_registered_users_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // ==================== GALLERY IMAGES MANAGEMENT ====================
  static getCustomGalleryItems(): GalleryItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_GALLERY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static getGalleryItems(): GalleryItem[] {
    const custom = this.getCustomGalleryItems();
    return [...custom, ...GALLERY_ITEMS];
  }

  static addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const custom = this.getCustomGalleryItems();
    const newItem: GalleryItem = {
      ...item,
      id: 'gal_custom_' + Date.now(),
    };
    custom.unshift(newItem);
    try {
      localStorage.setItem(STORAGE_GALLERY_KEY, JSON.stringify(custom));
      window.dispatchEvent(new CustomEvent('karam_gallery_updated'));
    } catch (e) {
      console.error('Failed to save gallery item:', e);
    }
    return newItem;
  }

  static deleteGalleryItem(id: string): void {
    const custom = this.getCustomGalleryItems().filter((item) => item.id !== id);
    try {
      localStorage.setItem(STORAGE_GALLERY_KEY, JSON.stringify(custom));
      window.dispatchEvent(new CustomEvent('karam_gallery_updated'));
    } catch (e) {
      console.error('Failed to delete gallery item:', e);
    }
  }

  // ==================== BOOKS MANAGEMENT ====================
  static getBooks(): AdminBookItem[] {
    const defaultBooks: AdminBookItem[] = [
      {
        id: 'book-english-1',
        title: 'The Sacred Karam Festival: Heritage & Rituals of the Tea Tribes',
        language: 'English',
        priceINR: 70,
        originalPriceINR: 150,
        author: 'Sankar Jhora & Heritage Collective',
        pageCount: 58,
        description: 'Comprehensive cultural monograph on Karam rituals, Jawa germination, Akhra songs, Haldina cordifolia reverence, and tea garden history.',
        fileName: 'Karam-Puja-Tea-Tribe-Heritage-English.pdf',
        uploadedAt: '2026-09-10T10:00:00Z',
      },
      {
        id: 'book-assamese-1',
        title: 'পবিত্ৰ কৰম পূজা: চাহ জনগোষ্ঠীৰ ঐতিহ্য আৰু লোকসংষ্কৃতি',
        language: 'Assamese (অসমীয়া)',
        priceINR: 50,
        originalPriceINR: 120,
        author: 'শংকৰ ঝোৰা আৰু গৱেষণা দল',
        pageCount: 64,
        description: 'অসমৰ চাহ বাগানৰ কৰম পৰব, আখৰা নৃত্য, ঝুমুৰ গীত, ৯ বিধ শস্যৰ জাৱা জগোৱা আৰু কৰম কাঠ স্থাপনৰ সম্পূৰ্ণ চিত্ৰসমৃদ্ধ অসমীয়া সংস্কৰণ।',
        fileName: 'Karam-Puja-Asomiya-Edition.pdf',
        uploadedAt: '2026-09-12T12:00:00Z',
      },
    ];

    try {
      const stored = localStorage.getItem(STORAGE_BOOKS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_BOOKS_KEY, JSON.stringify(defaultBooks));
      return defaultBooks;
    } catch {
      return defaultBooks;
    }
  }

  static addBook(book: Omit<AdminBookItem, 'id' | 'uploadedAt'>): AdminBookItem {
    const current = this.getBooks();
    const newBook: AdminBookItem = {
      ...book,
      id: 'book_' + Date.now(),
      uploadedAt: new Date().toISOString(),
    };
    current.unshift(newBook);
    try {
      localStorage.setItem(STORAGE_BOOKS_KEY, JSON.stringify(current));
    } catch (e) {
      console.error('Failed to save book:', e);
    }
    return newBook;
  }

  static deleteBook(id: string): void {
    const current = this.getBooks().filter((b) => b.id !== id);
    try {
      localStorage.setItem(STORAGE_BOOKS_KEY, JSON.stringify(current));
    } catch (e) {
      console.error('Failed to delete book:', e);
    }
  }
}
