export interface EBookEdition {
  id: 'english' | 'assamese';
  language: 'english' | 'assamese';
  label: string;
  nativeLabel: string;
  priceINR: number;
  originalPriceINR: number;
  pageCount: number;
  format: string;
  coverSubtitle: string;
  title: string;
  description: string;
  fileName: string;
  coverTheme: {
    bgGradient: string;
    accentColor: string;
    spineColor: string;
    textColor: string;
    badgeBg: string;
  };
  samplePreview: string[];
  chapters: string[];
}

export const EBOOK_EDITIONS: Record<'english' | 'assamese', EBookEdition> = {
  english: {
    id: 'english',
    language: 'english',
    label: 'English Edition',
    nativeLabel: 'English Edition',
    priceINR: 70,
    originalPriceINR: 150,
    pageCount: 58,
    format: 'Printable PDF (Vector Quality)',
    coverSubtitle: 'Heritage, Botany & Rituals of the Tea Tribes',
    title: 'The Sacred Karam Festival: Heritage & Rituals of the Tea Tribes',
    description: 'A comprehensive cultural monograph documenting the migration, Akhra rituals, sacred Haldina cordifolia tree biology, 9-seed Jawa germination, and the folk songs of the tea garden communities of Assam, Dooars, and Chotanagpur.',
    fileName: 'Karam-Puja-Tea-Tribe-Heritage-English.pdf',
    coverTheme: {
      bgGradient: 'from-[#0D2818] via-[#164223] to-[#081C10]',
      accentColor: '#E2C044',
      spineColor: '#07170D',
      textColor: '#FFFFFF',
      badgeBg: '#1B4324'
    },
    samplePreview: [
      'The Karam festival celebrated by tea garden tribes stands as one of the most enduring testaments of ecological reverence and ancestral memory.',
      'Brought from the plateaus of Chotanagpur to the verdant expanses of Assam and the Dooars in the 19th century, the sacred Karam bough remains the eternal beacon of community unity.',
      'As night descends on Bhadrapada Ekadashi, the deep acoustic resonance of the Madal echoes between tea bushes, calling youth to the Akhra.'
    ],
    chapters: [
      'Chapter 1: Historical Migration into Assam and Dooars Tea Estates',
      'Chapter 2: Botanical Reverence: The Sacred Karam Tree (Haldina cordifolia)',
      'Chapter 3: The 9-Grain Jawa: Sprouting Rituals & Maiden Prayers',
      'Chapter 4: Legend of Karma and Dharma: Universal Moral Philosophy',
      'Chapter 5: Akhra Rhythms, Jhumair Songs, and Madal Drum Acoustics',
      'Chapter 6: Modern Cultural Preservation & Community Archives'
    ]
  },
  assamese: {
    id: 'assamese',
    language: 'assamese',
    label: 'Assamese Edition (অসমীয়া)',
    nativeLabel: 'অসমীয়া সংস্কৰণ',
    priceINR: 50,
    originalPriceINR: 120,
    pageCount: 52,
    format: 'Printable PDF (Vector Quality)',
    coverSubtitle: 'চাহ জনগোষ্ঠীৰ লোক-জীৱন আৰু ধৰ্মীয় পৰম্পৰা',
    title: 'কৰম পূজা আৰু চাহ জনগোষ্ঠীৰ ঐতিহাসিক ঐতিহ্য',
    description: 'অসম আৰু উত্তৰ বংগৰ চাহ বাগিচাসমূহত উদযাপিত পৱিত্ৰ কৰম পৰবৰ সম্পূৰ্ণ ইতিহাস, ঝুমুৰ গীত, আখৰা নৃত্য, জাৱা অংকুৰণ বিধি আৰু সংৰক্ষণৰ তথ্য সম্বলিত বিশেষ ডিজিটেল গ্ৰন্থ।',
    fileName: 'Karam-Puja-Tea-Tribe-Heritage-Assamese.pdf',
    coverTheme: {
      bgGradient: 'from-[#1A3A22] via-[#245330] to-[#0F2415]',
      accentColor: '#F4D06F',
      spineColor: '#0A1B0E',
      textColor: '#FFFFFF',
      badgeBg: '#14361B'
    },
    samplePreview: [
      'অসমৰ সেউজীয়া চাহ বাগিচাসমূহত ভাদ মাহৰ শুক্লা একাদশীত উদযাপিত হোৱা কৰম পূজা চাহ জনগোষ্ঠীৰ প্ৰাণস্পন্দন।',
      'ছোটা-নাগপুৰৰ পৰা অসমলৈ চাহ শ্ৰমিক হিচাপে অহা আদিবাসীসকলে নিজৰ বুকুত সাঁচি ৰখা ঐতিহ্য হʼল এই কৰম ৰজাৰ বন্দনা।',
      'হাতত হাত ধৰি বৃত্তাকাৰে নচা ঝুমুৰ আৰু মাদলৰ গম্ভীৰ গুৰু-গুৰু ধ্বনিয়ে পাহাৰ-ভৈয়াম একাকাৰ কৰি তোলে।'
    ],
    chapters: [
      '১ম অধ্যায়: অসম আৰু ডুয়ার্সৰ চাহ বাগিচালৈ কৰম পৰবৰ আগমন',
      '২য় অধ্যায়: পৱিত্ৰ কৰম গছ (Haldina cordifolia) আৰু পৰিবেশ চেতনা',
      '৩য় অধ্যায়: কুমাৰী ছোৱালীৰ ন-ধানৰ জাৱা ডালি প্ৰস্তুতকৰণ',
      '৪র্থ অধ্যায়: আখৰাত কৰম আৰু ধৰমৰ চিৰন্তন সাধুকথা',
      '৫ম অধ্যায়: ঝুমুৰ গীত, মাদলৰ তাল আৰু পৰম্পৰাগত সাজ-পোছাক',
      '৬ষ্ঠ অধ্যায়: আধুনিক যুগত চাহ জনগোষ্ঠীয় ঐতিহ্যৰ সংৰক্ষণ'
    ]
  }
};
