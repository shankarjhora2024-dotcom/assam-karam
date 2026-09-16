export interface EBookChapter {
  id: string;
  number: number;
  title: string;
  teaTribeContext: string;
  summary: string;
  content: string[];
  culturalKeynotes: string[];
}

export const TEA_GARDEN_EBOOK_INFO = {
  title: 'Karam Puja & The Tea Tribe Heritage',
  subtitle: 'Sacred Groves, Jhumair Rhythms, and the Living Traditions of Assam & Dooars Tea Gardens',
  author: 'Karam Utsav Cultural Research & Archival Initiative',
  edition: '2026 Digital Commemorative Edition',
  pagesCount: 48,
  format: 'Interactive Digital E-Book & Printable Reader',
  downloadFileName: 'Karam-Puja-Tea-Tribe-Heritage-EBook.txt',
  introduction: 'Karam Puja is the greatest socio-cultural festival of the Tea Garden Tribes (Adivasis of Assam, North Bengal Dooars, Terai, and Chotanagpur). When generations of Oraon, Munda, Santhal, Kharia, Kurmi, and Gond ancestors migrated to establish tea plantations in Assam and Bengal, they carried their most sacred heritage in their hearts: reverence for Karam Raja, the sacred soil, the Mandar drum, and the brotherhood of the Akhra.',
};

export const EBOOK_CHAPTERS: EBookChapter[] = [
  {
    id: 'ch-1',
    number: 1,
    title: 'The Journey of Karam into the Tea Gardens',
    teaTribeContext: 'Assam Valley & Dooars Tea Estates',
    summary: 'How ancestral tribes carried the worship of Karam Raja from the Chotanagpur plateau into the lush tea valleys of Assam and Bengal.',
    content: [
      'In the 19th and early 20th centuries, millions of indigenous people from Chotanagpur (Jharkhand, Odisha, West Bengal, and Chhattisgarh) traveled to the verdant slopes of Assam, the Dooars, and Sylhet to cultivate tea bushes. Uprooted from their ancestral forests, they preserved their cultural identity through their sacred ceremonies.',
      'Among these, Karam Puja emerged as the grandest unifying beacon. In tea estates from Dibrugarh, Tinsukia, Golaghat, and Sonitpur to Jalpaiguri and Alipurduar, the lines dividing different clans melted away around the Akhra.',
      'In the tea gardens, Karam is not merely a seasonal ritual; it is a sacred declaration of tribal solidarity, resilience against hardships, and continuous communion with nature amidst emerald green tea hedges.'
    ],
    culturalKeynotes: [
      'Universal celebration across all Tea Garden labor lines (Coolie Lines & Bagans).',
      'Syncretism of Oraon, Munda, Kurmi, and Santhal customs into a unified Tea Tribe cultural ethos.',
      'State-recognized official holiday in Assam tea districts celebrating indigenous labor identity.'
    ]
  },
  {
    id: 'ch-2',
    number: 2,
    title: 'Tea Garden Akhra: Night of Jhumair & Madal',
    teaTribeContext: 'Lujhri & Jhumair Rhythms in Estate Courtyards',
    summary: 'The mesmerizing circular Jhumair dance of women workers and youth beneath the tea garden shade trees.',
    content: [
      'When the evening bell sounds in the tea estate on Bhadra Ekadashi, workers wash away the fatigue of pruning and plucking. The community gathers at the estate central ground or Akhra.',
      'Young women and experienced tea pluckers wear their pristine white sarees with red and green borders (Panchi), fresh tea blossoms or Sal flowers pinned into their coiled buns, interlinking arms in long crescent chains.',
      'Accompanied by the roaring heartbeat of the Madal (Mandar), Dhol, and Nagara, and the piercing melody of the Flute (Bansi) and Kartal, dancers step forward and sway backwards in the hypnotic Tea Tribe Jhumair rhythm.',
      'The dust rises from the red tea earth under rhythmic footbeats as songs honor both the sacred tree and the toil of the working hands that nurture the earth.'
    ],
    culturalKeynotes: [
      'Jhumair styles: Darbari Jhumair, Bhaduria Jhumair, and Chali Jhumair.',
      'Interlinked arm-in-arm formation symbolizes unbroken community solidarity.',
      'All-night dance vigil (Rati Jaga) until the dawn mist rises over tea canopies.'
    ]
  },
  {
    id: 'ch-3',
    number: 3,
    title: 'The Sacred Jawa Baskets & Tea Soil Blessings',
    teaTribeContext: 'Nine Grains Germination & Agrarian Wisdom',
    summary: 'How maiden girls foster the golden Jawa sprouts in bamboo baskets to divine the vitality of plantation soil.',
    content: [
      'Nine days before Karam night, young unmarried women (Karam-Daitins) walk together to the nearby mountain stream or river in the tea valley. With sacred songs, they collect clean river silt.',
      'In woven bamboo baskets (Dala), nine grains—paddy, maize, black gram, chickpea, mustard, and lentils—are tenderly sown in layers of silt. Placed in a quiet corner of the household, they are sprinkled daily with fresh water and turmeric.',
      'The sprouts grow pale golden-yellow in darkness. On the morning of Karam, these tender golden Jawa shoots are brought out to the Akhra. Elders inspect the vigor of the shoots, interpreting them as divine omens of good harvests and good health for plantation families.',
      'Sisters tuck these golden sprigs into the shirts and hair of their brothers as amulets of long life, mutual respect, and lifelong protection.'
    ],
    culturalKeynotes: [
      'Nine sacred grains (Nao Anaaj) nurtured in darkness for 7 to 9 days.',
      'Bio-indicator ritual celebrating seedling fertility and botanical reverence.',
      'Exchanged with solemn Johar greetings between brothers, elders, and neighbors.'
    ]
  },
  {
    id: 'ch-4',
    number: 4,
    title: 'Karam Katha: The Parable of Karma & Dharma',
    teaTribeContext: 'Oral Wisdom of Labor, Humility, and Forest Laws',
    summary: 'The timeless folk narrative passed down by the village elder (Pahan or Deori) around the Karam branches.',
    content: [
      'At midnight, surrounding the three freshly cut branches of the sacred Karam tree planted in the Akhra center, silence falls. The Pahan or senior elder sprinkles milk and rice grains, then recounts the story of Karma and Dharma.',
      'Karma, an honest and hard-working laborer, always treated the land, forests, and trees with love and respect. Dharma, his brother, was swept up in arrogance, wealth, and laziness, discarding the sacred Karam branch and insulting mother nature.',
      'Consequently, Dharma was struck with ruin: his cattle strayed, his crops withered, and his water sources dried to sand. Recognizing his pride, Dharma undertook a relentless journey through barren lands to find Karam Raja and plead for forgiveness.',
      'The deity revealed that nature will never bless a hand that refuses honest labor. When Dharma bowed down and promised to honor the sacred trees and toil sincerely with his hands, prosperity and peace returned to the household.'
    ],
    culturalKeynotes: [
      'Sacred moral: Wealth without respect for ecological balance leads to ruin.',
      'Physical toil (Karma) is venerated as divine duty for plantation workers.',
      'Recited in Sadri, Mundari, Kurmali, and Santali dialects across estates.'
    ]
  },
  {
    id: 'ch-5',
    number: 5,
    title: 'Preserving Tea Tribe Culture in the Modern Era',
    teaTribeContext: 'Education, Language Documentation & Tree Conservation',
    summary: 'Actionable steps for new generations to document folk songs, protect sacred Karam trees, and cherish tribal identity.',
    content: [
      'Today, the Tea Garden community faces challenges of youth migration, cultural erosion, and deforestation. Preserving Karam Puja is key to maintaining the rich cultural tapestry of the tea tribes.',
      'Initiatives like karamutsav.org work alongside youth organizations in Assam, North Bengal, and Jharkhand to plant genuine Karam saplings (Haldina cordifolia / Nauclea parvifolia), record elder folk singers in local Sadri and indigenous dialects, and archive oral songbooks.',
      'By combining digital accessibility with grassroots Akhra assemblies, the sacred heartbeat of Karam remains as resilient and vibrant as the evergreen tea hills.'
    ],
    culturalKeynotes: [
      'Sapling plantation drives along tea estate boundaries and village commons.',
      'Digital preservation of authentic Sadri and Tea Tribe Jhumair recordings.',
      'Empowering tea tribe students with educational pride in their ancestral heritage.'
    ]
  }
];
