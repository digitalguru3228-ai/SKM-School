export interface Milestone {
  id: string;
  year: string;
  period: string;
  title: string;
  description: string;
  highlight: string;
  category: 'founding' | 'expansion' | 'stream' | 'modernization';
  details: string[];
  iconName: string;
  image?: string;
}

export interface AcademicStream {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  grades: string;
  description: string;
  subjects: string[];
  keyFeatures: string[];
  careerPaths: string[];
  icon: string;
}

export interface Facility {
  id: string;
  title: string;
  subtitle: string;
  stats: string;
  description: string;
  features: string[];
  image: string;
  icon: string;
  tag: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'campus' | 'labs' | 'sports' | 'cultural' | 'scouts';
  image: string;
  caption: string;
  date?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Exams' | 'Circular' | 'Events' | 'Scholarships' | 'Holidays';
  isUrgent?: boolean;
  fileSize?: string;
  refNo?: string;
  summary: string;
  fullContent?: string;
  attachmentName?: string;
}

export interface Notice extends Announcement {}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: 'administration' | 'science' | 'commerce' | 'secondary' | 'vocational' | 'sports';
  qualifications: string;
  experienceYears: string;
  subjects: string[];
  achievements?: string;
  email?: string;
  isLead?: boolean;
  avatarColor?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: string;
  category: 'board' | 'science' | 'sports' | 'scouts' | 'alumni';
  awardee: string;
  rankOrPercentile: string;
  description: string;
  badge: string;
  metric?: string;
}

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  category: 'admissions' | 'academics' | 'facilities' | 'general';
}
