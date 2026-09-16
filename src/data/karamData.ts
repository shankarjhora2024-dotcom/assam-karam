import {
  Ritual,
  JawaGrain,
  FolkSong,
  LegendChapter,
  FestivalEvent,
  GalleryItem,
  QuizQuestion,
  AudioPattern,
} from '../types';

export const HERO_IMAGE = '/src/assets/images/karam_utsav_hero_1789452122660.jpg';
export const JAWA_IMAGE = '/src/assets/images/jawa_rituals_basket_1789452143016.jpg';
export const MANDAR_IMAGE = '/src/assets/images/mandar_drum_dance_1789452158040.jpg';

export const FESTIVAL_INFO = {
  name: 'Karam Utsav',
  santaliName: 'ᱠᱟᱨᱟᱢ ᱯᱚᱨᱚᱵᱽ',
  kurmaliName: 'करम परब',
  domain: 'karamutsav.org',
  tagline: 'Worship of Nature, Soil Fertility & Sibling Solidarity',
  tithi: 'Bhadra Shukla Paksha Ekadashi (Bhado 11th Lunar Day)',
  upcomingCelebration: 'September 22, 2026',
  coreTheme: 'Ecological Gratitude & Indigenous Cultural Continuity',
  regions: ['Jharkhand', 'West Bengal (Purulia, Bankura, Jhargram)', 'Odisha (Mayurbhanj, Sundargarh)', 'Bihar', 'Chhattisgarh', 'Assam Tea Gardens', 'Global Diaspora'],
};

export const SACRED_RITUALS: Ritual[] = [
  {
    id: 'ritual-1',
    number: 1,
    title: 'Jawa Jagaran & Sowing',
    localName: 'जावा जागरण / जावा जगाना',
    phase: '7 to 9 Days Prior',
    dayTiming: 'Bhadra Krishna Navami / Ekadashi',
    shortSummary: 'Maiden girls plant nine sacred grain varieties in bamboo baskets filled with pure river sand, nurturing tender golden seedlings.',
    description: 'Seven to nine days before the festival, unmarried sisters and young women (Dhangrin/Karam-Daitins) gather fine sand from the sacred riverbanks and place it in new bamboo baskets (Dala). Nine traditional grains are sown, tenderly sprinkled with water, and placed in a secluded chamber. Every evening, young women sing Jawa songs and dance around the baskets to invoke divine life force.',
    culturalSignificance: 'The germination of seeds is a biological pre-test of crop fertility for the upcoming harvest and a deep metaphor for womanhood, purity, and life creation.',
    symbolicItems: ['Nine Grains (Nao Anaaj)', 'Bamboo Dala', 'River Sand', 'Turmeric Water', 'Brass Diya']
  },
  {
    id: 'ritual-2',
    number: 2,
    title: 'Sankalp & Fasting',
    localName: 'करम उपवास एवं संकल्प',
    phase: 'Festival Eve & Morning',
    dayTiming: 'Morning of Bhadra Ekadashi',
    shortSummary: 'Sisters observe strict waterless fasting, preparing ceremonial offerings for their brothers’ long lives and household abundance.',
    description: 'On the main festival day, sisters undertake a rigorous fast (Nirjala Upavas). They cleanse their courtyards with fresh clay and cowdung wash (Lepan), draw sacred floor designs (Alpona/Chowk), and prepare the ceremonial baskets filled with cucumber, unboiled milk, paddy sheaves, and wild flowers.',
    culturalSignificance: 'Reinforces the primordial bond of sibling care; while brothers protect the community and land, sisters offer their spiritual austerity for their brothers’ wellbeing.',
    symbolicItems: ['Alpona / Rangoli', 'Ghee Lamp', 'Cucumber (Kera)', 'Raw Milk', 'Wild Forest Flowers']
  },
  {
    id: 'ritual-3',
    number: 3,
    title: 'Sacred Karam Branch Retrieval',
    localName: 'करम डारि कटाई / बरतन',
    phase: 'Late Afternoon',
    dayTiming: 'Sunset before Akhra assembly',
    shortSummary: 'Village youths enter the sacred forest with reverence and cut three pristine branches of the Karam tree without letting them touch the earth.',
    description: 'Youths, accompanied by elders and traditional drummers, proceed solemnly into the deciduous forest to locate a healthy Karam tree (Haldina cordifolia / Nauclea parvifolia). After offerings of water and vermilion, three unblemished branches (Karam Dali) are cut with a single stroke and caught by hand so they never touch the ground.',
    culturalSignificance: 'Reflects the reverence indigenous peoples hold for trees; no branch is severed without prior prayer and community permission.',
    symbolicItems: ['Iron Axe (Kapi)', 'Vermilion (Sindur)', 'Three Karam Branches', 'New Cotton Cloth']
  },
  {
    id: 'ritual-4',
    number: 4,
    title: 'Installation at the Akhra',
    localName: 'अखड़ा स्थापना / करम गाड़ना',
    phase: 'Dusk',
    dayTiming: 'Twilight',
    shortSummary: 'The branches are received with song and ululation by the women, then planted in the center of the village dancing ground.',
    description: 'The three branches are brought to the village boundary where village maidens welcome them with oil lamps, wash the youths’ feet, and escort the branches to the sacred Akhra (the circular community cultural ground). The branches are planted firmly in the center and adorned with white and red fabric, symbolizing the presence of Karam Raja.',
    culturalSignificance: 'The Akhra transforms into the spiritual epicenter of the village, dissolving hierarchical barriers in shared community worship.',
    symbolicItems: ['Red-bordered White Fabric', 'Marigold Garlands', 'Sal Leaves', 'Earthen Akhra']
  },
  {
    id: 'ritual-5',
    number: 5,
    title: 'Pahan Puja & Karam Katha',
    localName: 'पाहन पूजा एवं करम कथा श्रवण',
    phase: 'First Watch of the Night',
    dayTiming: '8:00 PM – 10:00 PM',
    shortSummary: 'The village priest offers sacrifices of incense and sweets, followed by the solemn recitation of the Karma-Dharma narrative.',
    description: 'The Pahan (indigenous priest) or village elder initiates the sacred liturgy. Fragrant dhoop, milk, and seasonal fruits are placed at the base of the Karam branches. All participants sit in reverence as the ancient oral epic of the two brothers—Karma and Dharma—is recited, conveying the eternal truth that fortune favors selfless labor and ecological respect.',
    culturalSignificance: 'Oral transmission of ecological ethics across generations without relying on written scriptures.',
    symbolicItems: ['Incense (Dhuna)', 'Jawa Seedlings', 'Raw Paddy', 'Curd & Sweets']
  },
  {
    id: 'ritual-6',
    number: 6,
    title: 'All-Night Akhra Jhumair & Dance',
    localName: 'अखड़ा नाचा-गाना / रातजगा',
    phase: 'Night to Dawn',
    dayTiming: '10:00 PM – 5:00 AM',
    shortSummary: 'Hundreds of villagers dance hand-in-hand in synchronised arcs to the hypnotic thunder of Mandar and Nagara drums.',
    description: 'As the story concludes, the drummers unleash the signature Karam rhythms. Women in pristine red-bordered sarees join arms in linked chains, stepping back and forward in fluid undulating waves around the Karam tree. The dance continues through all watches of the night (Rani Jagran), welcoming the morning star with ecstatic folk verses.',
    culturalSignificance: 'Celebration of unity, artistic expression, and collective euphoria where the entire community breathes as a single living organism.',
    symbolicItems: ['Mandar Drum (Tumdak)', 'Nagara', 'Bansi (Bamboo Flute)', 'Ghungroos', 'Wild Feather Headdress']
  },
  {
    id: 'ritual-7',
    number: 7,
    title: 'Visarjan & Jawa Bhasan',
    localName: 'करम भासान / विसर्जन',
    phase: 'Next Morning',
    dayTiming: 'Sunrise of Dwadashi',
    shortSummary: 'With tender songs and affectionate farewells, the Karam branches and Jawa shoots are immersed in the flowing river.',
    description: 'At dawn, after a final circumambulation, the Karam branches are gently uprooted. Sisters distribute the auspicious yellow Jawa shoots (Jawa Phool) to their brothers and village elders to tuck behind their ears as a blessing. The procession then marches with singing to the river or lake, where the branches are immersed, returning nutrients and spirit back to nature.',
    culturalSignificance: 'Acknowledges the natural cycle of arrival and departure; the festival leaves no waste, only organic gratitude returned to water and earth.',
    symbolicItems: ['Flowing River Water', 'Jawa Phool for Ears', 'Farewell Songs', 'Pitha Sweets']
  }
];

export const JAWA_GRAINS: JawaGrain[] = [
  {
    id: 'grain-1',
    name: 'Paddy',
    hindiName: 'धान (Dhan)',
    botanicalName: 'Oryza sativa',
    significance: 'The staple food of tribal agrarian society; symbolizes sustained sustenance and full storehouses.',
    symbolicValue: 'Life Sustenance & Food Security',
    colorTag: '#EAB308'
  },
  {
    id: 'grain-2',
    name: 'Maize',
    hindiName: 'मक्का / जोन्हरा (Jonhra)',
    botanicalName: 'Zea mays',
    significance: 'Resilient upland grain that thrives in arid soil; symbolizes endurance against adversity.',
    symbolicValue: 'Physical Vitality & Resilience',
    colorTag: '#F59E0B'
  },
  {
    id: 'grain-3',
    name: 'Black Gram',
    hindiName: 'उड़द / उड़िद (Urad)',
    botanicalName: 'Vigna mungo',
    significance: 'Vital pulse rich in nitrogen that replenishes soil fertility; represents health and muscle strength.',
    symbolicValue: 'Soil Regeneration & Strength',
    colorTag: '#4B5563'
  },
  {
    id: 'grain-4',
    name: 'Horse Gram',
    hindiName: 'कुरथी (Kurthi)',
    botanicalName: 'Macrotyloma uniflorum',
    significance: 'Ancient hardy winter pulse, native to plateau rocks; revered for medicinal and medicinal cleansing power.',
    symbolicValue: 'Healing & Ancestral Hardiness',
    colorTag: '#B45309'
  },
  {
    id: 'grain-5',
    name: 'Pigeon Pea',
    hindiName: 'अरहर / रहर (Rahar)',
    botanicalName: 'Cajanus cajan',
    significance: 'Golden lentil harvested late in winter; symbolizes patience, dignity, and deep roots.',
    symbolicValue: 'Dignity & Steadfast Care',
    colorTag: '#D97706'
  },
  {
    id: 'grain-6',
    name: 'Mustard',
    hindiName: 'सरसों / तोरी (Tori)',
    botanicalName: 'Brassica nigra',
    significance: 'Produces soothing oil used for lamps and ceremonial body massage; dispels negative spirits.',
    symbolicValue: 'Inner Illumination & Purity',
    colorTag: '#CA8A04'
  },
  {
    id: 'grain-7',
    name: 'Chickpea',
    hindiName: 'चना / बूट (Boot)',
    botanicalName: 'Cicer arietinum',
    significance: 'Symbol of fertility and agricultural wealth; tender shoots represent the sprout of the next generation.',
    symbolicValue: 'Generational Continuity',
    colorTag: '#A16207'
  },
  {
    id: 'grain-8',
    name: 'Green Gram',
    hindiName: 'मूंग (Moong)',
    botanicalName: 'Vigna radiata',
    significance: 'Cooling, gentle pulse that brings peace and light digestive harmony to fasting observers.',
    symbolicValue: 'Gentleness & Compassion',
    colorTag: '#65A30D'
  },
  {
    id: 'grain-9',
    name: 'Sesame',
    hindiName: 'तिल (Til)',
    botanicalName: 'Sesamum indicum',
    significance: 'Sacred micro-seed used in all ancient rites; symbolizes eternity, remembrance, and cosmic balance.',
    symbolicValue: 'Cosmic Immortality & Memory',
    colorTag: '#1F2937'
  }
];

export const LEGEND_CHAPTERS: LegendChapter[] = [
  {
    id: 'ch-1',
    order: 1,
    title: 'The Two Brothers: Karma & Dharma',
    subtitle: 'Two paths in an agrarian kingdom',
    summary: 'The story begins in an ancient land where two brothers lived side by side with radically contrasting philosophies of life.',
    storyText: [
      'Once upon a time in the forested valleys of Chotanagpur, there lived two brothers named Karma and Dharma. Karma was earnest, diligent, and deeply attuned to the heartbeat of the soil.',
      'From the first crimson dawn to twilight, Karma toiled in the fields with his bullocks, mending irrigation bunds and offering grateful whispers to the sal and mahua trees.',
      'Dharma, the elder brother, took pride only in rituals and outward ceremonies, neglecting physical toil and mocking his younger brother’s muddy hands, claiming that chanting alone would grant riches.'
    ],
    moralLesson: 'Labor (Karma) is the true essence of sacred devotion. Spirituality disconnected from labor bears no harvest.'
  },
  {
    id: 'ch-2',
    order: 2,
    title: 'The Insult to the Karam Tree',
    subtitle: 'Pride precedes the ecological curse',
    summary: 'When Karma Raja blessed the village courtyard, arrogance blinded Dharma to the sacred presence of nature.',
    storyText: [
      'On the auspicious night of Bhadrapada Ekadashi, Karma brought the sacred branch of the Karam tree to their courtyard. With pure heart, Karma and his sisters offered flowers, water, and sweet pitha.',
      'Karam Raja, pleased with their devotion, poured prosperity upon Karma: his granaries overflowed with fragrant golden grain, his cattle yielded abundant milk, and well water stayed crystal clear.',
      'Dharma returned home in a boastful state. Seeing the Karam branch planted in the center of the courtyard, he shouted in anger, "What is this wild twig doing in my spotless house?" and kicked the sacred branch into the dust.'
    ],
    moralLesson: 'Disrespecting nature and discarding ancestral gratitude brings sudden ruin upon human vanity.'
  },
  {
    id: 'ch-3',
    order: 3,
    title: 'The Seven Trials of Repentance',
    subtitle: 'The drought of the soul and the great search',
    summary: 'Deprived of grace, Dharma watches his world crumble and embarks on a desperate journey to locate the wandering Karam Raja.',
    storyText: [
      'The morning following the insult, Dharma’s world turned barren. The standing paddy withered into black ash, his cattle broke free into the forest, his house developed cracks, and famine struck.',
      'Humbled and weeping, Dharma realized his grave sin. The village elder said, "There is only one path to salvation: you must wander barefoot across seven hills and seven rivers until you find Karam Raja and earn his pardon."',
      'Along his arduous journey, Dharma encountered a starving horse that could not eat the sweetest grass, a mango tree whose delicious fruit turned into worms upon touch, and a dried river that refused to quench his thirst. Each asked him to inquire of Karam Raja the cause of their eternal suffering.'
    ],
    moralLesson: 'Unresolved guilt and ecological disharmony affect not just the wrongdoer, but the entire living biosphere.'
  },
  {
    id: 'ch-4',
    order: 4,
    title: 'The Revelation & The Return of Grace',
    subtitle: 'Reconciliation with the Green Divinity',
    summary: 'Dharma discovers Karam Raja floating upon an ocean of water and pledges his eternal devotion to nature and his kin.',
    storyText: [
      'Finally, after years of grueling wanderings, Dharma reached the shore of a roaring sea. In the middle of the turbulent waters, he spotted the divine Karam branch floating upright like a green emerald beacon.',
      'Dharma threw himself into the waters, crying: "O Karam Raja! Forgive my arrogant blindness! I now know that without your shade and blessings, humanity is nothing but dust."',
      'Karam Raja smiled with the rustling of leaves and forgave him. The deity revealed the answers to the three suffering creatures (the mango tree was hoarding its fruit without sharing, the horse was ridden without kindness, the river was dammed greedily).',
      'Dharma brought the Karam branch gently back to his village on his head. Together with brother Karma and his sisters, they established the perpetual Karam Utsav so no human soul would ever forget to bow to the trees that grant them life.'
    ],
    moralLesson: 'True redemption comes through honest humility, active amends, and sharing blessings with the entire community.'
  }
];

export const FOLK_SONGS: FolkSong[] = [
  {
    id: 'song-1',
    title: 'Karam Gada Gelay Re (The Planting of Karam)',
    dialect: 'Kurmali / Panchpargania',
    genre: 'Karam Geet',
    context: 'Sung by the women and youth as the three Karam branches are hoisted and planted inside the village Akhra.',
    verses: [
      {
        original: 'करम गाड़ा गेलाय रे अखड़ा मांझे, \nमांदर बाजे रे धिनिक-धिन ता धिन ता। \nभाई लागे करम धरम बहिन करे आस, \nजुग जुग जिया रे मोर सहोदर भाय!',
        transliteration: 'Karam gāḍā gelāy re akhaṛā māñjhe,\nMāndar bāje re dhinik-dhin tā dhin tā.\nBhāi lāge Karam Dharam bahin kare ās,\nJug jug jiyā re mor sahodar bhāy!',
        meaning: 'The sacred Karam tree is now planted in the heart of the Akhra; the Mandar drum resounds with "Dhinik-dhin ta". As brothers embody Karma and Dharma, the sisters hold deep hope: May my dear brother live for countless ages!'
      },
      {
        original: 'अमवा फूले रे मंजर झरे, \nकरम राजा देलन रे बरदान। \nघर-अंगना भराय गेल अन्न धने, \nजोहार करम राजा जोहार तोहे!',
        transliteration: 'Amwā phūle re manjar jhare,\nKaram Rājā delan re bardān.\nGhar-anganā bharāy gel anna dhane,\nJohār Karam Rājā Johār tohe!',
        meaning: 'The mango blossoms fragrance the air; Lord Karam has bestowed his generous boons upon us. Our home and courtyards overflow with rich harvest. We bow to you with folded hands, O King Karam!'
      }
    ]
  },
  {
    id: 'song-2',
    title: 'Jawa Jagabe Re Chhotki Bahin (Waking the Seeds)',
    dialect: 'Sadri / Nagpuri',
    genre: 'Jawa Geet',
    context: 'Sung nightly by sisters inside the seed chamber as they sprinkle turmeric water on the growing Jawa shoots.',
    verses: [
      {
        original: 'जावा जगाबे रे छोटकी बहिन, \nनदी केरे बालू मांझे धान छिटाले। \nपीयर पीयर जावा फूले रे, \nभाई मोर साजेला पगड़िया मांझे!',
        transliteration: 'Jāwā jagābe re chhoṭkī bahin,\nNadī kere bālū māñjhe dhān chhiṭāle.\nPīyar pīyar jāwā phūle re,\nBhāi mor sājelā pagaṛiyā māñjhe!',
        meaning: 'Wake the tender Jawa, dear younger sister! Sown gently in pure river sand, the golden-yellow shoots have bloomed like flowers. My brother shall wear them proudly tucked inside his ceremonial turban!'
      }
    ]
  },
  {
    id: 'song-3',
    title: 'Karam Bhasan Geet (The River Farewell)',
    dialect: 'Kudmali / Bengali folk',
    genre: 'Bhasan Geet',
    context: 'Sung at dawn of the final day with tearful affection as the Karam branch is carried to the river for immersion.',
    verses: [
      {
        original: 'आजु रे करम राजा घरे बिराजे, \nकालि रे करम राजा जइबा भासने। \nआंखि छलकय रे बहिन के, \nआरो एक बछर परे घुरि आसिबा!',
        transliteration: 'Āju re Karam Rājā ghare birāje,\nKāli re Karam Rājā jaibā bhāsane.\nĀnkhi chhalakay re bahin ke,\nĀro ek bachhar pare ghuri āsibā!',
        meaning: 'Today Lord Karam graces our home; tomorrow you depart for the river waters. Tears brim in the sisters’ eyes as they pray: Promise to return to us again with the next monsoon cycle!'
      }
    ]
  }
];

export const AUDIO_PATTERNS: AudioPattern[] = [
  {
    id: 'khemta',
    name: 'Khemta Rhythm (Medium-Fast)',
    tempo: 108,
    description: 'The energetic step-rhythm that animates the peak of the Akhra circular dance.',
    steps: [
      { mandarBass: true, mandarSlap: false, nagara: true, ghungroo: true },
      { mandarBass: false, mandarSlap: true, nagara: false, ghungroo: false },
      { mandarBass: true, mandarSlap: false, nagara: false, ghungroo: true },
      { mandarBass: false, mandarSlap: true, nagara: true, ghungroo: false },
      { mandarBass: true, mandarSlap: true, nagara: false, ghungroo: true },
      { mandarBass: false, mandarSlap: false, nagara: false, ghungroo: false },
    ]
  },
  {
    id: 'lujhri',
    name: 'Lujhri Rhythm (Graceful Sway)',
    tempo: 84,
    description: 'Slower, swaying tempo for reflective songs during the midnight watch.',
    steps: [
      { mandarBass: true, mandarSlap: false, nagara: true, ghungroo: true },
      { mandarBass: false, mandarSlap: false, nagara: false, ghungroo: false },
      { mandarBass: false, mandarSlap: true, nagara: false, ghungroo: true },
      { mandarBass: true, mandarSlap: false, nagara: false, ghungroo: false },
      { mandarBass: false, mandarSlap: true, nagara: true, ghungroo: true },
      { mandarBass: false, mandarSlap: false, nagara: false, ghungroo: false },
    ]
  },
  {
    id: 'bhinshariya',
    name: 'Bhinshariya Rhythm (Dawn Call)',
    tempo: 96,
    description: 'The dawn cadence announcing sunrise and the completion of the night vigil.',
    steps: [
      { mandarBass: true, mandarSlap: true, nagara: true, ghungroo: true },
      { mandarBass: true, mandarSlap: false, nagara: false, ghungroo: false },
      { mandarBass: false, mandarSlap: true, nagara: true, ghungroo: true },
      { mandarBass: true, mandarSlap: false, nagara: false, ghungroo: false },
    ]
  }
];

export const FESTIVAL_EVENTS: FestivalEvent[] = [
  {
    id: 'evt-1',
    title: 'Maha Akhra Central Gathering - Ranchi',
    date: 'Bhadra Shukla Ekadashi (Annual)',
    location: 'Morabadi Grounds & Tribal Research Institute',
    region: 'Jharkhand',
    time: '4:00 PM – Dawn',
    description: 'Over 5,000 dancers and 200 traditional Mandar drummers gather for the state-level Karam Mahotsav, showcasing authentic village Akhra traditions.',
    type: 'Public Akhra'
  },
  {
    id: 'evt-2',
    title: 'Purulia Manbhum Folk Karam Utsav',
    date: 'Bhadra Dwadashi',
    location: 'Kashipur & Balarampur Akhra',
    region: 'West Bengal',
    time: '5:30 PM – 11:30 PM',
    description: 'Celebrated with traditional Jhumair melodies, Chhau dance influences, and distribution of ancestral Jawa seedlings.',
    type: 'Traditional Dance'
  },
  {
    id: 'evt-3',
    title: 'Mayurbhanj Indigenous Heritage Assembly',
    date: 'Bhadra Ekadashi Night',
    location: 'Baripada Town Hall & Sacred Sarna Sthal',
    region: 'Odisha',
    time: '6:00 PM – 2:00 AM',
    description: 'Karam tree plantation drive followed by Pahan blessing rituals, oral folklore recitation, and community feast.',
    type: 'Public Akhra'
  },
  {
    id: 'evt-4',
    title: 'National Seminar on Tribal Ecology & Oral Archives',
    date: 'Two Days Prior to Bhado Ekadashi',
    location: 'Karam Cultural Center & Online Stream (karamutsav.org)',
    region: 'Hybrid / Global',
    time: '10:00 AM – 4:00 PM',
    description: 'Ecologists, tribal elders, and youth discuss preservation of the Karam tree species and digitalization of indigenous folk songbooks.',
    type: 'Cultural Seminar'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Great Akhra Circle',
    category: 'Akhra Dance',
    caption: 'Hundreds of dancers linked arm-in-arm in concentric circles around the sacred Karam branches as night turns into dawn.',
    imageSrc: HERO_IMAGE,
    location: 'Ranchi, Jharkhand'
  },
  {
    id: 'gal-2',
    title: 'Sacred Jawa Seedling Baskets',
    category: 'Rituals',
    caption: 'Golden shoots of germinated grains nestled in handwoven bamboo baskets with marigold blossoms and fresh river sand.',
    imageSrc: JAWA_IMAGE,
    location: 'Purulia, West Bengal'
  },
  {
    id: 'gal-3',
    title: 'The Soul of Mandar',
    category: 'Instruments',
    caption: 'Master percussionist striking the earthen clay body of the Mandar drum, producing the deep heartbeat of the plateau.',
    imageSrc: MANDAR_IMAGE,
    location: 'Mayurbhanj, Odisha'
  },
  {
    id: 'gal-4',
    title: 'Panchi-Parhan Attire & Floral Adornment',
    category: 'Attire & Jewelry',
    caption: 'Women in traditional handloom cotton sarees with red madder borders, wearing silver hasli and fresh wild sal blossoms in their hair.',
    imageSrc: HERO_IMAGE,
    location: 'Sundargarh, Odisha'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'In which lunar month of the indigenous calendar is the main Karam Utsav celebrated?',
    options: [
      'Chaitra (Spring onset)',
      'Bhadrapada / Bhado (Monsoon harvest season)',
      'Kartik (Winter onset)',
      'Phalguna (Holi season)'
    ],
    correctIndex: 1,
    explanation: 'Karam is celebrated in the month of Bhado (Bhadrapada) on the 11th lunar day (Shukla Ekadashi) during the lush green monsoon crop cycle.'
  },
  {
    id: 'q-2',
    question: 'What is the sacred "Jawa" nurtured by sisters for the festival?',
    options: [
      'A special variety of earthen pottery',
      'Germinated shoots of nine sacred grains grown in river sand',
      'A traditional sweet made of puffed rice',
      'The sacred flag planted atop the temple'
    ],
    correctIndex: 1,
    explanation: 'Jawa consists of delicate golden-yellow seedlings sprouted from nine sacred grains in fine river sand over 7 to 9 days with daily devotional songs.'
  },
  {
    id: 'q-3',
    question: 'How many branches of the sacred Karam tree are cut and planted in the Akhra?',
    options: ['One solitary branch', 'Three pristine branches', 'Five branches', 'Seven branches'],
    correctIndex: 1,
    explanation: 'Three unblemished branches of the Karam tree (Nauclea parvifolia / Haldina cordifolia) are cut with reverence and brought to the Akhra without touching the ground.'
  },
  {
    id: 'q-4',
    question: 'Which instrument made of terracotta clay and animal hide provides the primary heartbeat of Karam dance?',
    options: ['Tabla', 'Mandar (Tumdak)', 'Sitar', 'Harmonium'],
    correctIndex: 1,
    explanation: 'The Mandar (or Tumdak) is the ancient earthen drum of indigenous communities, tuned with a black paste to produce deep resonant bass.'
  },
  {
    id: 'q-5',
    question: 'What core ecological lesson is taught by the Legend of Karma and Dharma?',
    options: [
      'Wealth is supreme above all beings',
      'Nature is self-replenishing without human care',
      'Humility, honest physical labor, and reverence for nature are the true fountain of prosperity',
      'Rituals can replace hard work in the fields'
    ],
    correctIndex: 2,
    explanation: 'The legend demonstrates that when Dharma disrespected nature and refused honest toil, all his wealth evaporated; prosperity only returned when he humbled himself before the sacred Karam tree.'
  }
];

export const PRESERVATION_PROJECT = {
  title: 'The Karam Utsav Heritage Project',
  mission: 'Preserving Sacred Groves, Documenting Indigenous Folklore & Empowering Youth',
  stats: [
    { value: '10,000+', label: 'Karam Saplings Planted' },
    { value: '120+', label: 'Folk Songs Recorded & Archived' },
    { value: '45+', label: 'Community Akhras Restored' },
    { value: '25,000+', label: 'Youth Reconnected to Heritage' }
  ],
  pillars: [
    {
      title: 'Botanical Revival (Karam Vriksha Sanrakshan)',
      desc: 'Planting and protecting the sacred Karam tree (Haldina cordifolia / Nauclea parvifolia) across school campuses, village borders, and sacred groves (Sarna/Jaherthan).'
    },
    {
      title: 'Digital Folk Archive (Oral History Documentation)',
      desc: 'Recording village elders and master Mandar players in Kurmali, Santali, Sadri, Mundari, and Ho dialects to preserve vanishing oral songs before they are lost.'
    },
    {
      title: 'Youth & Akhra Revival',
      desc: 'Organizing inter-village Jhumair dance festivals and teaching traditional instrument making (Mandar clay tuning, bamboo flutes) to the next generation.'
    }
  ]
};
