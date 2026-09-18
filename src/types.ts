export interface Ritual {
  id: string;
  number: number;
  title: string;
  localName: string;
  phase: string;
  dayTiming: string;
  shortSummary: string;
  description: string;
  culturalSignificance: string;
  symbolicItems: string[];
}

export interface JawaGrain {
  id: string;
  name: string;
  hindiName: string;
  botanicalName: string;
  significance: string;
  symbolicValue: string;
  colorTag: string;
}

export interface FolkSong {
  id: string;
  title: string;
  dialect: string;
  genre: 'Jawa Geet' | 'Karam Geet' | 'Bhasan Geet' | 'Khemta Geet';
  verses: {
    original: string;
    transliteration: string;
    meaning: string;
  }[];
  context: string;
}

export interface LegendChapter {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  summary: string;
  storyText: string[];
  moralLesson: string;
}

export interface FestivalEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  region: string;
  time: string;
  description: string;
  type: 'Public Akhra' | 'Cultural Seminar' | 'Traditional Dance' | 'Youth Workshop';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Rituals' | 'Akhra Dance' | 'Attire & Jewelry' | 'Instruments';
  caption: string;
  imageSrc: string;
  location: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AudioPattern {
  id: string;
  name: string;
  tempo: number;
  description: string;
  steps: {
    mandarBass: boolean;
    mandarSlap: boolean;
    nagara: boolean;
    ghungroo: boolean;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  role: 'user' | 'admin';
  joinedAt: string;
  lastLoginAt: string;
  purchasedBooks: string[];
}

export interface BookOrder {
  id: string;
  orderId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  editionId: 'english' | 'assamese';
  editionTitle: string;
  editionLabel: string;
  amountINR: number;
  paymentGateway: string;
  paymentId: string;
  status: 'Completed' | 'Pending' | 'Refunded';
  createdAt: string;
  deliveryEmailSent: boolean;
  deliverySmsSent: boolean;
}

export interface AdminMetrics {
  totalUsers: number;
  totalOrders: number;
  totalRevenueINR: number;
  englishOrdersCount: number;
  assameseOrdersCount: number;
  recentOrders: BookOrder[];
  recentUsers: UserProfile[];
}

export interface AdminBookItem {
  id: string;
  title: string;
  language: string;
  priceINR: number;
  originalPriceINR?: number;
  author?: string;
  description: string;
  pageCount?: number;
  coverImage?: string;
  fileUrl?: string;
  fileName?: string;
  uploadedAt: string;
}
