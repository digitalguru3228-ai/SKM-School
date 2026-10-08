import { Milestone, AcademicStream, Facility, GalleryItem, Announcement, Teacher, Achievement, FaqItem } from '../types';
import { IMAGES } from '../assets';

export const SCHOOL_INFO = {
  name: "SKM High School & Higher Secondary School",
  shortName: "SKM High School, Kanodar",
  trustName: "Sarvoday Kelavani Mandal, Kanodar",
  establishedYear: "1956",
  motto: "Knowledge, Character, Self-Reliance",
  location: "Kanodar, Banaskantha District, Gujarat 385520",
  plusCode: "39VX+33X, Kanodar, Gujarat 385520, India",
  phone: "02742 242 933",
  alternatePhone: "+91 2742 242 934",
  email: "info@skmkanodar.org",
  officeHours: "Monday – Saturday: 7:30 AM – 1:30 PM (Morning Shift) | 11:30 AM – 5:30 PM (General Shift)",
  website: "www.kanodar.com/education/skm-high-school",
  boardAffiliation: "Gujarat Secondary and Higher Secondary Education Board (GSEB)",
  schoolIndexNo: "02.045 / 52.012",
  totalStudents: "1,450+",
  alumniWorldwide: "25,000+",
  boardPassRate: "98.4%",
  computerCount: "80+ High-Performance Systems with Gigabit LAN",
  libraryBooks: "1,400+ Curated Books & Periodicals",
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'n1',
    title: 'Admissions Open for Academic Year 2026–2027 (Std 8th to 12th Science, General & Vocational)',
    date: 'August 15, 2026',
    category: 'Admissions',
    isUrgent: true,
    fileSize: '1.4 MB PDF',
    refNo: 'SKM/ADM/2026-27/01',
    summary: 'Online registration and offline prospectus distribution for Secondary and Higher Secondary sections are now active. Merit-based counseling begins shortly.',
    fullContent: 'Sarvoday Kelavani Mandal announces the commencement of admission formalities for the Academic Session 2026-2027 across Class 8 to Class 12 (Higher Secondary Science Group A & B, Higher Secondary General Stream, and Technical Vocational wings). Application forms can be submitted online through the admissions inquiry form or collected directly from the school administrative office between 8:00 AM and 1:30 PM.',
    attachmentName: 'SKM_Admission_Prospectus_2026-27.pdf'
  },
  {
    id: 'n2',
    title: 'GSEB Board Examination Assessment Center Schedule & Guidelines',
    date: 'August 10, 2026',
    category: 'Exams',
    isUrgent: true,
    fileSize: '820 KB PDF',
    refNo: 'SKM/EXAM/GSEB-2026/08',
    summary: 'Official GSEB notification regarding seat allotments, hall ticket verification, and timetable for upcoming board assessments.',
    fullContent: 'All candidates appearing for the Gujarat Secondary and Higher Secondary Education Board (GSEB) examinations at the SKM High School Center (School Index 02.045 / 52.012) are advised to verify hall tickets and review the authorized seating layout and laboratory examination schedule. Identity cards and authorized stationery are strictly mandatory.',
    attachmentName: 'GSEB_Board_Exam_Guidelines_2026.pdf'
  },
  {
    id: 'n3',
    title: 'Dawoodi Bohra Welfare Trust & R.K. Palasara Pariwar Merit Scholarship Announcement',
    date: 'August 02, 2026',
    category: 'Scholarships',
    isUrgent: false,
    fileSize: '540 KB PDF',
    refNo: 'SKM/SCHOL/2026/04',
    summary: 'Applications invited for annual meritorious student scholarships, book bank access, and tuition waivers for deserving students.',
    fullContent: 'Sarvoday Kelavani Mandal in conjunction with generous patrons from the Dawoodi Bohra Welfare Trust and R.K. Palasara Pariwar invites scholarship applications from high-achieving and economically deserving scholars enrolled in Secondary and Higher Secondary streams. Download the criteria sheet to apply before the due date.',
    attachmentName: 'SKM_Merit_Scholarship_Application.pdf'
  },
  {
    id: 'n4',
    title: 'Annual Inter-School Science Fair & Innovation Model Exhibition',
    date: 'July 28, 2026',
    category: 'Events',
    isUrgent: false,
    fileSize: '1.1 MB PDF',
    refNo: 'SKM/EVENT/SCI-2026/12',
    summary: 'Students from Std 8th to 12th will showcase live physics mechanics, robotics, solar models, and chemistry demonstrations.',
    fullContent: 'The Annual Banaskantha District Inter-School Science & Mathematics Fair will be hosted at the SKM Science Laboratory Complex and A.N. Musa Computer Centre. Parents, educators, and alumni are warmly invited to witness innovative student projects and working models.',
    attachmentName: 'Science_Fair_Schedule_2026.pdf'
  },
  {
    id: 'n5',
    title: 'GSEB Secondary & Higher Secondary Board Results 2025–26: 98.4% Historic Pass Rate',
    date: 'July 15, 2026',
    category: 'Circular',
    isUrgent: false,
    fileSize: '650 KB PDF',
    refNo: 'SKM/CIR/RES-2026/02',
    summary: 'Heartiest congratulations to our HSC Science & General stream toppers for achieving outstanding state and district rankings.',
    fullContent: 'SKM High School students have once again brought immense glory to Kanodar by securing an overall 98.4% pass percentage in the GSEB Board Exams. 18 students achieved over 95th percentile, with top honors in Physics, Mathematics, and Accountancy.',
    attachmentName: 'Board_Merit_List_Toppers_2026.pdf'
  },
  {
    id: 'n6',
    title: 'Diwali & Mid-Term Vacation Academic Calendar 2026–27',
    date: 'July 05, 2026',
    category: 'Holidays',
    isUrgent: false,
    fileSize: '430 KB PDF',
    refNo: 'SKM/CAL/VAC-2026/01',
    summary: 'Official calendar covering terminal examinations, parent-teacher conferences, and holiday breaks.',
    fullContent: 'The approved academic calendar for the current academic session is hereby published. It outlines unit test dates, mid-term examinations, sports week, and scheduled vacation breaks in compliance with the Gujarat Education Department directives.',
    attachmentName: 'SKM_Academic_Calendar_2026-27.pdf'
  }
];

export const NOTICES = ANNOUNCEMENTS;

export const TIMELINE_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    year: '1956',
    period: 'May 28, 1956',
    title: 'Establishment of Sarvoday Kelavani Mandal & Humble Beginnings',
    description: 'Sarvoday Kelavani Mandal was founded by visionary community elders in Kanodar. In an inspiring act of selflessness, primary classes commenced in the home of Late Shri Mamjibhai Alimad Mukhi with a mission to bring formal education to every child.',
    highlight: 'Foundation Stone of Educational Transformation in North Gujarat',
    category: 'founding',
    iconName: 'GraduationCap',
    details: [
      'Founded under the visionary leadership of Sarvoday Kelavani Mandal trustees.',
      'Classes inaugurated in the residence of Late Shri Mamjibhai Alimad Mukhi.',
      'Began with dedicated volunteer teachers and a fervent community spirit to eradicate educational backwardness.'
    ],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm2',
    year: '1959 - 1960',
    period: '1959 – 1960',
    title: 'School Campus Construction & First S.S.C. Graduating Batch',
    description: 'A permanent, sprawling school building was constructed through collective community philanthropy. The S.S.C. (Secondary School Certificate) class was officially started, graduating its very first matriculation cohort with flying colors.',
    highlight: 'Permanent Campus & First Historic Matriculation Batch',
    category: 'expansion',
    iconName: 'Building',
    details: [
      'Construction of dedicated brick-and-mortar classrooms, administrative wing, and central courtyard.',
      'Official recognition from the State Department of Education.',
      'Celebration of Kanodar’s first native batch of high school graduates who went on to become doctors, engineers, and teachers.'
    ],
    image: IMAGES.building
  },
  {
    id: 'm3',
    year: '1976',
    period: '1976',
    title: 'Commencement of Higher Secondary Section (H.S.C. 10+2)',
    description: 'Meeting the surging academic aspirations of students from Kanodar and surrounding villages, the Higher Secondary Section (Std 11th & 12th) was launched, creating a seamless pathway into college and professional careers.',
    highlight: 'Pioneering 10+2 Higher Secondary Education in the Region',
    category: 'stream',
    iconName: 'Award',
    details: [
      'Introduced advanced higher secondary pedagogy under the 10+2 education system.',
      'Expanded library and lecture halls to accommodate higher secondary scholars.',
      'Attracted motivated students across Banaskantha district.'
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm4',
    year: '1987 - 1989',
    period: '1987 – 1989',
    title: 'Vocational Empowerment: Home Science & Electrical Labs',
    description: 'Recognizing the importance of hands-on skills, the school introduced specialized Home Science curriculum for female students and Electrical/Technical workshops for male students, backed by a custom-built Home Science practical laboratory.',
    highlight: 'Life-Skills & Practical Vocational Workshop Integration',
    category: 'expansion',
    iconName: 'Wrench',
    details: [
      'Built a dedicated Home Science Laboratory with modern culinary, tailoring, and nutrition stations for girl students.',
      'Established Electrical Gadgets and Electronics practical workshops for vocational self-reliance.',
      'Created career readiness and entrepreneurial foundations for both girls and boys.'
    ],
    image: IMAGES.physicsLab
  },
  {
    id: 'm5',
    year: '1995 - 1997',
    period: '1995 – 1997',
    title: 'Dawoodi Bohra Welfare Trust, R.K. Palasara Pariwar & Science Stream',
    description: 'A watershed era marked by generous philanthropic support from the Dawoodi Bohra Welfare Trust and R.K. Palasara Pariwar. The school established the elite Higher Secondary Science Stream and founded the state-of-the-art A.N. Musa Computer Centre.',
    highlight: 'Launch of Science Stream & A.N. Musa Computer Centre',
    category: 'stream',
    iconName: 'Cpu',
    details: [
      'Inauguration of the prestigious A.N. Musa Computer Centre providing IT literacy.',
      'Formal launch of Higher Secondary Science Stream with specialized Physics, Chemistry, and Biology laboratories.',
      'Generous funding and infrastructural grants from Dawoodi Bohra Welfare Trust and R.K. Palasara Pariwar.'
    ],
    image: IMAGES.computerLab
  },
  {
    id: 'm6',
    year: '2004 - Present',
    period: '2004 – Present Day',
    title: 'Digital High-Tech Labs, Smart Campus & Board Assessment Hub',
    description: 'Continuous evolution into a 21st-century digital center of excellence with high-speed LAN networking, smart interactive teaching boards, digital knowledge repositories, and being designated as an official GSEB Board Examination Assessment Hub.',
    highlight: 'Futuristic Digital Classrooms & Regional Assessment Center',
    category: 'modernization',
    iconName: 'Sparkles',
    details: [
      'Upgraded computer labs with 80+ networked desktop units and gigabit optical fiber connectivity.',
      'Official Board Examination Assessment and Evaluation Center for Banaskantha GSEB exams.',
      'Integration of interactive digital pedagogy, Adarsh Public Library automation, and solar eco-initiatives.'
    ],
    image: IMAGES.physicsLab
  }
];

export const ACADEMIC_STREAMS: AcademicStream[] = [
  {
    id: 'secondary',
    title: 'Secondary School Section',
    subtitle: 'Standards 8th, 9th & 10th (S.S.C.)',
    badge: 'Foundation & Excellence',
    grades: 'Std 8 to 10',
    description: 'A comprehensive curriculum designed to develop deep conceptual understanding, strong analytical thinking, ethical values, and multilingual fluency in Gujarati, English, and Hindi.',
    subjects: [
      'Mathematics & Logical Reasoning',
      'Science & Technology',
      'Social Studies & Civics',
      'Gujarati (First/Second Language)',
      'English Language & Literature',
      'Hindi & Sanskrit Foundations',
      'Computer Literacy & Environmental Studies',
      'Physical Education & Yoga'
    ],
    keyFeatures: [
      '100% Board preparation with regular unit tests and mock exams.',
      'Specialized remedial sessions for slow learners and enrichment for high achievers.',
      'Interactive science lab practicals starting from Std 8th.',
      'Active participation in Scout & Guide and inter-school competitions.'
    ],
    careerPaths: ['Higher Secondary Science (Group A/B)', 'Commerce & Economics', 'Arts & Humanities', 'Diploma Engineering / Polytechnic'],
    icon: 'BookOpen'
  },
  {
    id: 'science',
    title: 'Higher Secondary Science Stream',
    subtitle: 'Standards 11th & 12th (H.S.C. Science)',
    badge: 'Premium STEM Stream',
    grades: 'Std 11 & 12',
    description: 'An intensive, experiment-driven pre-university science track with specialized Group A (Engineering / Mathematics) and Group B (Medical / Biology) preparing students for competitive entrance exams.',
    subjects: [
      'Advanced Physics (Theory + Lab)',
      'Inorganic, Organic & Physical Chemistry (Lab)',
      'Biology / Life Sciences (Group B)',
      'Higher Mathematics (Group A)',
      'English Higher Level',
      'Computer Science & Informatics',
      'GUJCET, NEET & JEE Foundation Coaching'
    ],
    keyFeatures: [
      'Fully equipped Physics, Chemistry, and Biology labs with individual workstation kits.',
      'Experienced senior postgraduate faculty with decades of proven board results.',
      'Integrated problem-solving modules for GUJCET, JEE Main, and NEET-UG.',
      'Regular guest lectures by medical doctors, research scientists, and IIT/NIT alumni.'
    ],
    careerPaths: ['Medicine (MBBS, BDS, BHMS, BAMS)', 'Engineering (CSE, AI/ML, Mechanical, Civil)', 'Pharmacy & Biotechnology', 'Pure Research & Data Science'],
    icon: 'Atom'
  },
  {
    id: 'general-vocational',
    title: 'General, Commerce & Vocational Stream',
    subtitle: 'Standards 11th & 12th (H.S.C. General)',
    badge: 'Practical Life Skills',
    grades: 'Std 11 & 12',
    description: 'A dynamic stream combining rigorous commercial and humanities knowledge with real-world practical vocational training in Home Science for girls and Electrical/Technical workshops for boys.',
    subjects: [
      'Accountancy & Book-Keeping',
      'Economics & Financial Literacy',
      'Organization of Commerce & Management',
      'Statistics & Commercial Math',
      'Home Science (Food, Nutrition, Child Care & Textiles)',
      'Electrical Technology & Electronics Workshop',
      'English & Gujarati Literature'
    ],
    keyFeatures: [
      'Home Science Lab practicals for nutrition, culinary science, interior planning, and entrepreneurship.',
      'Hands-on Electrical Workshop where boys learn circuitry, domestic appliances repair, and wiring standards.',
      'Stock market fundamentals, accounting software exposure (Tally/Excel), and business planning.',
      'Strong track record in university commerce degrees and self-employment ventures.'
    ],
    careerPaths: ['Chartered Accountancy (CA / CS / CMA)', 'Business Administration (BBA / MBA)', 'Banking & Civil Services (UPSC/GPSC)', 'Interior Design, Nutrition & Technical Entrepreneurship'],
    icon: 'Briefcase'
  },
  {
    id: 'cocurricular',
    title: 'Co-Curricular & Leadership Wings',
    subtitle: 'Character Building, NSS & Bharat Scouts',
    badge: 'Holistic Development',
    grades: 'All Grades',
    description: 'Beyond textbook learning, SKM nurtures disciplined leaders through active Bharat Scouts and Guides, National Service Scheme (NSS), sports championships, and cultural arts.',
    subjects: [
      'Bharat Scouts & Guides Troop',
      'National Service Scheme (NSS) Community Camps',
      'Elocution, Debate & Quiz Society',
      'Annual District Sports & Athletics Meet',
      'Eco-Club & Tree Plantation Mission',
      'Disaster Management & First-Aid Training'
    ],
    keyFeatures: [
      'Governor Award winning Scout & Guide commanders from SKM High School.',
      'Annual rural immersion camps promoting hygiene, literacy, and environmental care.',
      'Inter-house sports tournaments in Cricket, Volleyball, Badminton, and Kabaddi.',
      'Cultural celebrations including Republic Day, Independence Day, and Annual Prize Day.'
    ],
    careerPaths: ['Defense & Police Services', 'Public Administration', 'Sports Coaching', 'Community Leadership'],
    icon: 'Users'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'computer-lab',
    title: 'A.N. Musa Modern Computer Centre',
    subtitle: 'High-Speed LAN & Digital Literacy Hub',
    stats: '80+ Workstations | Gigabit Optical Fiber',
    description: 'Established with the support of community patrons, the A.N. Musa Computer Centre is equipped with modern high-performance desktop computers, uninterrupted power backup, high-speed fiber broadband, and interactive presentation screens for digital learning and coding.',
    features: [
      'Dedicated LAN network connecting all systems for collaborative programming.',
      'Licensed educational software, Python, Scratch, Office suites, and web design tools.',
      'Digital literacy curriculum starting from secondary classes.',
      'Fully air-conditioned, ergonomically designed workstation layout.'
    ],
    image: IMAGES.computerLab,
    icon: 'Monitor',
    tag: 'Digital Learning'
  },
  {
    id: 'library',
    title: 'Adarsh Public & School Central Library',
    subtitle: 'Treasury of Knowledge and Research',
    stats: '1,400+ Volumes | 20+ Periodicals & Journals',
    description: 'A sanctuary for avid readers and researchers. The Adarsh Public Library houses rich collections of Gujarati literature, world classics, encyclopedia series, NCERT reference books, and competitive exam preparation material for GPSC/UPSC/NEET.',
    features: [
      'Over 1,400 cataloged books covering science, history, philosophy, and competitive exams.',
      'Quiet, well-ventilated reading hall with dedicated study cubicles.',
      'Daily national and regional newspapers in Gujarati, English, and Hindi.',
      'Digital index system for rapid book search and borrowing management.'
    ],
    image: IMAGES.library,
    icon: 'Library',
    tag: 'Knowledge Vault'
  },
  {
    id: 'science-labs',
    title: 'Advanced Science & Physics Laboratories',
    subtitle: 'Physics, Chemistry & Life Science Practical Labs',
    stats: '3 Dedicated Labs | Individual Workstations',
    description: 'Equipped to meet and exceed GSEB and national STEM standards, our science laboratories provide students with experiential learning opportunities. Calibrated apparatus, optical benches, analytical balances, and safety-certified chemical reagent stations ensure hands-on mastery.',
    features: [
      'Separate state-of-the-art labs for Physics, Chemistry, and Biology.',
      'Safety emergency showers, eye-wash stations, and chemical fume exhaust systems.',
      'High-resolution compound microscopes and prepared botanical/zoological specimens.',
      'Teacher demonstration bench equipped with digital projection.'
    ],
    image: IMAGES.physicsLab,
    icon: 'FlaskConical',
    tag: 'STEM Practical'
  },
  {
    id: 'home-science-lab',
    title: 'Home Science & Practical Workshop Wing',
    subtitle: 'Vocational Life-Skills Training Center',
    stats: 'Dedicated Cooking Stations & Sewing Units',
    description: 'Established in the late 1980s and continuously upgraded, our Home Science lab provides hands-on culinary science, dietetics, nutrition calculation, garment design, and household management practicals for girl students.',
    features: [
      'Modern kitchen stations with gas piping, ovens, and food processing equipment.',
      'Fabric design and stitching machines for vocational tailoring.',
      'Dietary planning and child development laboratory modules.',
      'Practical demonstration areas for healthy cooking and preservation.'
    ],
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
    icon: 'Utensils',
    tag: 'Vocational Skill'
  },
  {
    id: 'sports-campus',
    title: 'Sports Grounds & Campus Amenities',
    subtitle: 'Spacious Playfields & Clean Water Tube-Well Facility',
    stats: 'Full-Sized Grounds | 24/7 RO Purified Water',
    description: 'Physical vigor and campus well-being are central to SKM values. Our sprawling grounds accommodate cricket pitches, volleyball courts, running tracks, and open-air assembly pavilions. Supported by our deep-bore tube-well and RO purification systems.',
    features: [
      'Spacious sports playground for football, cricket, volleyball, and kabaddi.',
      'Dedicated drinking water tube-well facility with advanced RO filtration systems.',
      'Lush green tree-lined walkways and open-air assembly ground.',
      'Modern clean washroom facilities with continuous running water.'
    ],
    image: IMAGES.playground,
    icon: 'Trophy',
    tag: 'Health & Wellness'
  },
  {
    id: 'board-center',
    title: 'Official GSEB Board Examination Hub',
    subtitle: 'State Board Certified Examination & Assessment Center',
    stats: '100% CCTV Monitored | 600+ Seating Capacity',
    description: 'SKM High School proudly serves as a designated, high-security GSEB Board Examination Center for Banaskantha district. Featuring comprehensive CCTV surveillance, soundproof testing halls, and biometric authentication protocols.',
    features: [
      'GSEB accredited testing facility with high-definition CCTV recording.',
      'Dedicated strong-room with double-lock security protocols.',
      'Capacity to host over 600 candidates simultaneously with comfortable benching.',
      'Centrally located with easy highway access from Kanodar and neighboring towns.'
    ],
    image: IMAGES.building,
    icon: 'ShieldCheck',
    tag: 'Institutional Prestige'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Physics & Science Laboratory Practical Session',
    category: 'labs',
    image: IMAGES.physicsLab,
    caption: 'Students conducting electricity and mechanics practicals on calibrated physics benches in the Science complex.'
  },
  {
    id: 'g2',
    title: 'A.N. Musa Modern Computer Centre Workstations',
    category: 'labs',
    image: IMAGES.computerLab,
    caption: 'Interactive computer science lab equipped with networked PCs and modern programming suites.'
  },
  {
    id: 'g3',
    title: 'SKM High School Historic Main Building & Verandahs',
    category: 'campus',
    image: IMAGES.building,
    caption: 'Front facade of SKM High School established in 1956 by Sarvoday Kelavani Mandal, Kanodar.'
  },
  {
    id: 'g4',
    title: 'Adarsh Public & School Central Library Reading Hall',
    category: 'campus',
    image: IMAGES.library,
    caption: 'Spacious reading hall and cataloged book almirahs providing literature and competitive exam resources.'
  },
  {
    id: 'g5',
    title: 'School Sports Ground & Volleyball Arena',
    category: 'sports',
    image: IMAGES.playground,
    caption: 'Expansive open playground surrounded by lush green trees for daily physical training and sports matches.'
  },
  {
    id: 'g6',
    title: 'Merit Award Ceremony & Board Toppers Felicitation',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    caption: 'Sarvoday Kelavani Mandal trustees awarding gold medals and scholarships to HSC toppers.'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "What is the admission procedure for Secondary (Std 8-10) and Higher Secondary (Std 11-12)?",
    answer: "Admissions begin in May/June for the upcoming academic year. For Secondary classes (Std 8-10), admissions are granted based on previous grade marksheet and School Leaving Certificate (L.C.). For Higher Secondary Science and General streams, admissions are allotted based on GSEB Std 10th S.S.C. board marks and merit counseling. Online admission inquiry forms can also be submitted via this website.",
    category: "admissions"
  },
  {
    question: "What academic streams are available in the Higher Secondary Section?",
    answer: "SKM High School offers: 1) Higher Secondary Science Stream (Group A - Maths/Engineering & Group B - Biology/Medical) with advanced lab practicals and GUJCET guidance; 2) Higher Secondary General Stream (Commerce & Arts); and 3) Vocational Life-Skill programs including Home Science for girls and Electrical/Technical workshops for boys.",
    category: "academics"
  },
  {
    question: "What are the school timings and shifts?",
    answer: "The school operates two well-organized sessions: Morning Shift (7:30 AM to 1:15 PM) primarily for Higher Secondary and Science practical batches, and General Shift (11:30 AM to 5:30 PM) for Secondary classes. Administrative and office desks operate from 8:00 AM to 2:00 PM Monday through Saturday.",
    category: "general"
  },
  {
    question: "Are there scholarship programs available for deserving and underprivileged students?",
    answer: "Yes. Sarvoday Kelavani Mandal, along with the Dawoodi Bohra Welfare Trust and R.K. Palasara Pariwar, provides multiple merit-cum-means scholarships, fee waivers for meritorious students, and free textbooks/uniforms for underprivileged scholars to ensure no child is denied education.",
    category: "admissions"
  },
  {
    question: "What safety, laboratory, and campus amenities exist for girl students?",
    answer: "SKM High School is deeply committed to women's empowerment. We feature dedicated Home Science labs, separate clean sanitation facilities, full CCTV coverage, female faculty mentorship, and specialized self-defense and guidance counseling for female students.",
    category: "facilities"
  },
  {
    question: "How can parents track official school announcements, timetables, and teacher meetings?",
    answer: "Parents and students can access the live Announcements & Circulars section on this portal for official circulars, exam timetables, and board notices, or contact our faculty and administrative desk during office hours.",
    category: "general"
  }
];

export const TEACHERS_DATA: Teacher[] = [
  {
    id: 't1',
    name: 'Dr. Arvindkumar K. Patel',
    role: 'Principal & Head of Institution',
    designation: 'Principal',
    department: 'administration',
    qualifications: 'Ph.D. in Educational Leadership, M.Sc. (Physics), M.Ed.',
    experienceYears: '28+ Years',
    subjects: ['Institutional Administration', 'Higher Secondary Physics Guidance', 'Board Exam Co-ordination'],
    achievements: 'State Best Principal Award Nominee, GSEB District Center Superintendent (15+ Years)',
    email: 'principal@skmkanodar.org',
    isLead: true,
    avatarColor: 'from-amber-500 to-amber-700'
  },
  {
    id: 't2',
    name: 'Prof. Bharatbhai M. Solanki',
    role: 'Vice Principal & HOD - Science Stream',
    designation: 'Senior Lecturer in Physics',
    department: 'science',
    qualifications: 'M.Sc. (Physics with Gold Medal), B.Ed.',
    experienceYears: '24+ Years',
    subjects: ['HSC Physics (Group A & B)', 'GUJCET & JEE Foundations', 'Practical Lab Demonstrations'],
    achievements: 'Author of 3 State Board Practical Reference Guides, 100% HSC Board Distinction Record',
    email: 'physics.hod@skmkanodar.org',
    isLead: true,
    avatarColor: 'from-blue-600 to-indigo-800'
  },
  {
    id: 't3',
    name: 'Smt. Ramilaben S. Prajapati',
    role: 'Senior Lecturer & Lab In-charge',
    designation: 'Lecturer in Chemistry',
    department: 'science',
    qualifications: 'M.Sc. (Organic Chemistry), B.Ed.',
    experienceYears: '19+ Years',
    subjects: ['HSC Chemistry', 'Inorganic & Organic Practical Labs', 'NEET Chemistry Prep'],
    achievements: 'Guided 8 District Science Fair 1st Prize winning student models',
    email: 'chemistry@skmkanodar.org',
    avatarColor: 'from-teal-600 to-emerald-800'
  },
  {
    id: 't4',
    name: 'Shri Manojkumar D. Joshi',
    role: 'Senior Lecturer in Biology',
    designation: 'Lecturer in Life Sciences',
    department: 'science',
    qualifications: 'M.Sc. (Botany & Zoology), B.Ed., M.Phil.',
    experienceYears: '21+ Years',
    subjects: ['HSC Biology (Group B)', 'Human Physiology & Genetics', 'NEET Mentorship'],
    achievements: 'State Botanical Society Fellow, Mentored 40+ MBBS Selected Students',
    email: 'biology@skmkanodar.org',
    avatarColor: 'from-emerald-600 to-green-800'
  },
  {
    id: 't5',
    name: 'Shri Hareshbhai N. Chaudhary',
    role: 'Senior Lecturer in Mathematics',
    designation: 'Lecturer in Advanced Mathematics',
    department: 'science',
    qualifications: 'M.Sc. (Applied Mathematics), B.Ed.',
    experienceYears: '18+ Years',
    subjects: ['HSC Mathematics (Group A)', 'Calculus & Vectors', 'JEE Main Math Specialist'],
    achievements: 'Ranked Top Mathematics Faculty in North Gujarat GSEB District Zone',
    email: 'maths@skmkanodar.org',
    avatarColor: 'from-cyan-600 to-blue-800'
  },
  {
    id: 't6',
    name: 'Shri Dilipkumar R. Shah',
    role: 'HOD - Commerce & General Stream',
    designation: 'Senior Lecturer in Accountancy',
    department: 'commerce',
    qualifications: 'M.Com. (Advanced Accountancy), B.Ed., C.A. (Inter)',
    experienceYears: '22+ Years',
    subjects: ['Elements of Accounts', 'Business Administration (B.A.)', 'CA Foundation Orientation'],
    achievements: '15+ Students scored 100/100 in GSEB HSC Board Accountancy',
    email: 'commerce@skmkanodar.org',
    isLead: true,
    avatarColor: 'from-amber-600 to-orange-800'
  },
  {
    id: 't7',
    name: 'Smt. Farhanabanu I. Mansuri',
    role: 'Senior Lecturer in Economics & Statistics',
    designation: 'Lecturer in Economics',
    department: 'commerce',
    qualifications: 'M.A. (Economics), M.Ed.',
    experienceYears: '16+ Years',
    subjects: ['Indian Economics', 'Business Statistics', 'Commercial Communication'],
    achievements: 'Keynote Speaker at North Gujarat Commerce Teachers Forum',
    email: 'economics@skmkanodar.org',
    avatarColor: 'from-purple-600 to-pink-800'
  },
  {
    id: 't8',
    name: 'Shri Pravinbhai G. Parmar',
    role: 'HOD - Secondary School Section',
    designation: 'Senior Secondary Master',
    department: 'secondary',
    qualifications: 'M.A. (Gujarati Literature), B.Ed.',
    experienceYears: '25+ Years',
    subjects: ['Secondary Gujarati (First Language)', 'Sanskrit Grammar', 'Cultural Activities'],
    achievements: 'District Best Teacher Awardee, Chief Cultural Director for Sarvoday Mandal',
    email: 'secondary@skmkanodar.org',
    isLead: true,
    avatarColor: 'from-rose-600 to-red-800'
  },
  {
    id: 't9',
    name: 'Shri Altafhussain K. Qureshi',
    role: 'Director - A.N. Musa Computer Centre',
    designation: 'Head of IT & Digital Pedagogy',
    department: 'vocational',
    qualifications: 'M.C.A., B.Sc. (Computer Science), PGDCA',
    experienceYears: '15+ Years',
    subjects: ['Computer Science (Std 9–12)', 'Python & C Programming', 'LAN Networking & Digital Skills'],
    achievements: 'Established campus-wide optical fiber network & 80+ terminal lab setup',
    email: 'itlab@skmkanodar.org',
    avatarColor: 'from-violet-600 to-indigo-900'
  },
  {
    id: 't10',
    name: 'Smt. Jayshreeben K. Vaghela',
    role: 'In-charge - Home Science & Girls Vocational Wing',
    designation: 'Instructor in Vocational Arts',
    department: 'vocational',
    qualifications: 'M.Sc. (Home Science), B.Ed.',
    experienceYears: '17+ Years',
    subjects: ['Home Science', 'Nutritional Science & Dietetics', 'Textile Arts & Entrepreneurship'],
    achievements: 'Mentored 500+ female students in vocational self-reliance and entrepreneurship',
    email: 'homescience@skmkanodar.org',
    avatarColor: 'from-fuchsia-600 to-purple-800'
  },
  {
    id: 't11',
    name: 'Shri Jagdishbhai M. Desai',
    role: 'Physical Training Instructor & Scout Master',
    designation: 'Director of Physical Education',
    department: 'sports',
    qualifications: 'M.P.Ed. (Physical Education), Himalaya Wood Badge (Bharat Scouts)',
    experienceYears: '20+ Years',
    subjects: ['Physical Training & Yoga', 'Athletics & Volleyball Coaching', 'Bharat Scouts & Guides'],
    achievements: 'Coached Banaskantha District Champion Volleyball & Kho-Kho teams for 7 consecutive years',
    email: 'sports@skmkanodar.org',
    avatarColor: 'from-amber-600 to-yellow-800'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'a1',
    title: 'GSEB Std 12th HSC Science Stream State & District Top Rank',
    year: '2025–2026',
    category: 'board',
    awardee: 'Master Soham Patel & Kum. Aafreen Mansuri',
    rankOrPercentile: '99.85 Percentile (PR)',
    description: 'Secured District 1st Rank with 100/100 in Physics and Mathematics, qualifying directly for government medical and top engineering institutions.',
    badge: 'State Merit Rank',
    metric: '99.85 PR'
  },
  {
    id: 'a2',
    title: '100% Result in GSEB S.S.C. Class 10th Board Examination',
    year: '2025–2026',
    category: 'board',
    awardee: 'Secondary Section Batch of 2026',
    rankOrPercentile: '100% Pass Percentage',
    description: 'Out of 280 registered candidates, 100% passed with 62 students achieving A1 & A2 distinction grades.',
    badge: '100% Pass Rate',
    metric: '62 A1/A2 Grades'
  },
  {
    id: 'a3',
    title: 'State Science Fair 1st Prize: Smart Solar Irrigation & AI IoT Model',
    year: '2025',
    category: 'science',
    awardee: 'SKM Innovation & Robotics Club',
    rankOrPercentile: 'State 1st Prize Winner',
    description: 'Developed an automated solar-powered soil moisture and drip irrigation device displayed at the Gujarat State Council of Educational Research.',
    badge: 'State Innovation Award',
    metric: '1st in Gujarat'
  },
  {
    id: 'a4',
    title: 'Bharat Scouts & Guides: Rashtrapati & Rajya Puraskar Honors',
    year: '2024–2025',
    category: 'scouts',
    awardee: '14 SKM Scout & Guide Cadets',
    rankOrPercentile: 'Governor Award Felicitation',
    description: 'Honored by the Honorable Governor of Gujarat at Raj Bhavan for exemplary national discipline, disaster rescue drills, and community service.',
    badge: 'Rajya Puraskar',
    metric: '14 Cadets Honored'
  },
  {
    id: 'a5',
    title: 'Banaskantha District Inter-School Volleyball Championship Gold',
    year: '2025',
    category: 'sports',
    awardee: 'SKM High School Senior Volleyball Team',
    rankOrPercentile: 'District Champions (Gold)',
    description: 'Defeated 32 participating district teams in undefeated straight sets to lift the prestigious District Collector Rolling Trophy.',
    badge: 'District Champions',
    metric: 'Undefeated Gold'
  },
  {
    id: 'a6',
    title: 'Alumni Excellence: 150+ Doctors, 400+ Engineers & Civil Servants',
    year: '1956–2026',
    category: 'alumni',
    awardee: 'SKM Global Alumni Fraternity',
    rankOrPercentile: 'Global Impact Legacy',
    description: 'Proud alumni contributing globally across USA, UK, Gulf, and across India as renowned surgeons, AI researchers, administrators, and philanthropists.',
    badge: 'Alumni Distinction',
    metric: '25,000+ Worldwide'
  }
];

export const MANAGEMENT_LEADERSHIP = {
  presidentName: "Shri Haji Abdulrazak M. Mukhi",
  presidentRole: "President, Sarvoday Kelavani Mandal, Kanodar",
  principalName: "Dr. Arvindkumar K. Patel",
  principalRole: "Principal, SKM High School & Higher Secondary School",
  quote: "To provide better educational facilities, empower every child with modern skills, and nurture self-reliant leaders for tomorrow.",
  fullMessage: "Since our humble inception in 1956 in Late Shri Mamjibhai Alimad Mukhi's residence, Sarvoday Kelavani Mandal has been driven by one sacred conviction: that quality education is the birthright of every child in Kanodar and surrounding rural regions. Over seven decades, with the generous benevolence of our donors, Dawoodi Bohra Welfare Trust, and R.K. Palasara Pariwar, we have built a modern temple of learning with state-of-the-art science labs, high-tech computer centres, and dedicated vocational training. We invite every student and parent to join hands in this journey of knowledge, integrity, and self-reliance."
};
