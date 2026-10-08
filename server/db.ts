import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { 
  SCHOOL_INFO, 
  ANNOUNCEMENTS, 
  NOTICES, 
  TIMELINE_MILESTONES, 
  ACADEMIC_STREAMS, 
  FACILITIES, 
  GALLERY_ITEMS, 
  FAQS, 
  TEACHERS_DATA, 
  ACHIEVEMENTS_DATA, 
  MANAGEMENT_LEADERSHIP 
} from '../src/data/schoolData';

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'super_admin' | 'content_admin' | 'viewer';
  is_active: boolean;
  created_at: string;
  last_login_at?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  full_content: string;
  category: string;
  ref_no: string;
  attachment_name?: string;
  attachment_url?: string;
  file_size?: string;
  is_urgent: boolean;
  is_pinned: boolean;
  status: 'published' | 'draft' | 'archived';
  published_at: string;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  category: string;
  cover_image: string;
  status: 'published' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface GalleryItemRecord {
  id: string;
  title: string;
  caption: string;
  category: string;
  image_url: string;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  file_url: string;
  file_name: string;
  file_size: string;
  download_count: number;
  status: 'published' | 'draft';
  created_at: string;
}

export interface StaffItem {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  qualifications: string;
  experience_years: string;
  subjects: string[];
  achievements: string;
  email: string;
  photo_url: string;
  is_lead: boolean;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  year: string;
  category: string;
  awardee: string;
  rank_or_percentile: string;
  description: string;
  badge: string;
  metric: string;
  image_url: string;
  status: 'published' | 'draft';
  created_at: string;
}

export interface AdmissionEnquiry {
  id: string;
  student_name: string;
  parent_name: string;
  applied_class: string;
  stream: string;
  mobile_number: string;
  email: string;
  previous_school: string;
  message: string;
  status: 'new' | 'under_review' | 'contacted' | 'admitted' | 'archived';
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_name: string;
  user_email: string;
  module: string;
  action: string;
  details: string;
  ip_address: string;
  created_at: string;
}

export interface SchoolSettings {
  school_name: string;
  short_name: string;
  trust_name: string;
  est_year: string;
  phone: string;
  alternate_phone: string;
  email: string;
  website?: string;
  address: string;
  plus_code?: string;
  office_hours: string;
  president_name: string;
  president_role: string;
  president_quote: string;
  president_message: string;
  academic_year: string;
  admission_open: boolean;
  hero_headline: string;
  hero_subheadline: string;
  hero_stat_1_val: string;
  hero_stat_1_label: string;
  hero_stat_1_sub: string;
  hero_stat_2_val: string;
  hero_stat_2_label: string;
  hero_stat_2_sub: string;
  hero_stat_3_val: string;
  hero_stat_3_label: string;
  hero_stat_3_sub: string;
  hero_stat_4_val: string;
  hero_stat_4_label: string;
  hero_stat_4_sub: string;
  gseb_center_code: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  grades: string;
  icon: string;
  description: string;
  subjects: string[];
  key_features: string[];
  career_paths: string[];
  syllabus_url?: string;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  stats: string;
  description: string;
  features: string[];
  icon: string;
  image_url: string;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface MilestoneItem {
  id: string;
  year: string;
  period: string;
  title: string;
  category: string;
  highlight: string;
  description: string;
  details: string[];
  icon_name: string;
  image_url: string;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface DatabaseState {
  users: User[];
  announcements: AnnouncementItem[];
  events: EventItem[];
  gallery: GalleryItemRecord[];
  documents: DocumentItem[];
  staff: StaffItem[];
  achievements: AchievementItem[];
  admissions: AdmissionEnquiry[];
  programs: ProgramItem[];
  facilities: FacilityItem[];
  milestones: MilestoneItem[];
  faqs: FaqItem[];
  settings: SchoolSettings;
  audit_logs: AuditLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'skm_database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getInitialData(): DatabaseState {
  // Pre-hashed password for initial super admin: admin@skm1956
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync('admin@skm1956', salt);

  const initialUsers: User[] = [
    {
      id: 'usr_super_admin',
      name: 'SKM Admin (Principal & Secretary)',
      email: 'admin@skmhighschool.in',
      password_hash,
      role: 'super_admin',
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'usr_content_admin',
      name: 'Academic Content Manager',
      email: 'staff@skmhighschool.in',
      password_hash,
      role: 'content_admin',
      is_active: true,
      created_at: new Date().toISOString(),
    }
  ];

  const initialAnnouncements: AnnouncementItem[] = [
    ...ANNOUNCEMENTS.map((a, idx) => ({
      id: a.id || `ann_${idx + 1}`,
      title: a.title,
      summary: a.summary,
      full_content: a.fullContent || a.summary,
      category: a.category,
      ref_no: a.refNo || `SKM/CIR/2026-27/${100 + idx}`,
      attachment_name: a.attachmentName,
      attachment_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      file_size: a.fileSize || '1.4 MB',
      is_urgent: a.isUrgent || false,
      is_pinned: idx === 0,
      status: 'published' as const,
      published_at: a.date,
      author_name: 'Principal Office',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
  ];

  const initialEvents: EventItem[] = [
    {
      id: 'evt_1',
      title: '70th Institutional Foundation Day & Sarvoday Sneh Milan',
      description: 'Annual gathering celebrating 70 glorious years since May 28, 1956 with patron families, alumni scholars, and student science exhibitions.',
      event_date: '2026-05-28',
      start_time: '09:00 AM',
      end_time: '01:30 PM',
      location: 'Late Mamjibhai Mukhi Memorial Auditorium',
      category: 'Institutional',
      cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80',
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'evt_2',
      title: 'North Gujarat Inter-School STEM & Robotics Fair',
      description: 'Hands-on project showcases from Class 9-12 Science students including smart agricultural sensors and physics models.',
      event_date: '2026-09-15',
      start_time: '10:00 AM',
      end_time: '04:00 PM',
      location: 'A.N. Musa Computer Centre & Physics Labs',
      category: 'Academic',
      cover_image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1000&auto=format&fit=crop&q=80',
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'evt_3',
      title: 'Khel Mahakumbh District Athletic Meet 2026',
      description: 'District level track and field, volleyball tournaments and kabaddi matches hosted on the SKM campus athletic grounds.',
      event_date: '2026-10-10',
      start_time: '08:00 AM',
      end_time: '05:00 PM',
      location: 'SKM Sports Complex & Pavilion',
      category: 'Sports',
      cover_image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&auto=format&fit=crop&q=80',
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  const initialGallery: GalleryItemRecord[] = GALLERY_ITEMS.map((g, idx) => ({
    id: g.id || `gal_${idx + 1}`,
    title: g.title,
    caption: g.caption,
    category: g.category,
    image_url: g.image,
    sort_order: idx + 1,
    status: 'published',
    created_at: new Date().toISOString(),
  }));

  const initialDocuments: DocumentItem[] = [
    {
      id: 'doc_1',
      title: 'Academic Prospectus & Admission Guidelines 2026–27',
      category: 'Prospectus',
      description: 'Complete institutional prospectus including stream subjects, eligibility rules, fee concessions, and scholarship criteria.',
      file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      file_name: 'SKM_Prospectus_2026-27.pdf',
      file_size: '2.4 MB',
      download_count: 142,
      status: 'published',
      created_at: new Date().toISOString(),
    },
    {
      id: 'doc_2',
      title: 'GSEB Secondary & Higher Secondary Annual Academic Calendar',
      category: 'Timetable',
      description: 'Official schedule of term dates, internal unit evaluations, semester preliminary exams, and vacation periods.',
      file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      file_name: 'GSEB_Academic_Calendar_2026.pdf',
      file_size: '1.1 MB',
      download_count: 320,
      status: 'published',
      created_at: new Date().toISOString(),
    },
    {
      id: 'doc_3',
      title: 'Higher Secondary Science Stream Syllabus & Lab Manual Guide',
      category: 'Syllabus',
      description: 'Physics, Chemistry, Biology & Mathematics curriculum breakdown with practical laboratory experiments list.',
      file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      file_name: 'Science_Stream_Lab_Manual_2026.pdf',
      file_size: '3.8 MB',
      download_count: 215,
      status: 'published',
      created_at: new Date().toISOString(),
    },
    {
      id: 'doc_4',
      title: 'Scholarship Application Form for Girl Scholars (DBWT & RKP)',
      category: 'Scholarship',
      description: 'Special merit and financial support grant form sponsored by Dawoodi Bohra Welfare Trust and R.K. Palasara Pariwar.',
      file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      file_name: 'Girls_Scholarship_Form_2026.pdf',
      file_size: '890 KB',
      download_count: 180,
      status: 'published',
      created_at: new Date().toISOString(),
    }
  ];

  const initialStaff: StaffItem[] = TEACHERS_DATA.map((t, idx) => ({
    id: t.id || `stf_${idx + 1}`,
    name: t.name,
    role: t.role,
    designation: t.designation,
    department: t.department,
    qualifications: t.qualifications,
    experience_years: t.experienceYears,
    subjects: t.subjects,
    achievements: t.achievements || '',
    email: t.email || '',
    photo_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80',
    is_lead: t.isLead || false,
    sort_order: idx + 1,
    status: 'published',
    created_at: new Date().toISOString(),
  }));

  const initialAchievements: AchievementItem[] = ACHIEVEMENTS_DATA.map((a, idx) => ({
    id: a.id || `ach_${idx + 1}`,
    title: a.title,
    year: a.year,
    category: a.category,
    awardee: a.awardee,
    rank_or_percentile: a.rankOrPercentile || '',
    description: a.description,
    badge: a.badge,
    metric: a.metric || '',
    image_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80',
    status: 'published',
    created_at: new Date().toISOString(),
  }));

  const initialAdmissions: AdmissionEnquiry[] = [
    {
      id: 'enq_1',
      student_name: 'Farhan A. Patel',
      parent_name: 'Anwarbhai Patel',
      applied_class: 'Class 11',
      stream: 'Science (Group A - Maths)',
      mobile_number: '+91 98251 44520',
      email: 'anwar.patel@gmail.com',
      previous_school: 'Kanodar Primary English Medium School',
      message: 'Student scored 92% in Class 10 Board exams and wants to prepare for JEE/GUJCET under SKM guidance.',
      status: 'under_review',
      admin_notes: 'Eligible for Dawoodi Bohra Welfare Trust Science Merit fee waiver.',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'enq_2',
      student_name: 'Ayesha M. Memon',
      parent_name: 'Mohammad Memon',
      applied_class: 'Class 11',
      stream: 'Commerce (General Stream)',
      mobile_number: '+91 94280 77310',
      email: 'm.memon@kanodar.in',
      previous_school: 'Palanpur High School',
      message: 'Inquiring about computer application subjects, English spoken batches, and library study facilities.',
      status: 'contacted',
      admin_notes: 'Spoke with parent on phone. Invited to campus on Saturday.',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  const initialPrograms: ProgramItem[] = ACADEMIC_STREAMS.map((s, idx) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    badge: s.badge,
    grades: s.grades,
    icon: s.icon,
    description: s.description,
    subjects: s.subjects,
    key_features: s.keyFeatures,
    career_paths: s.careerPaths,
    syllabus_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    sort_order: idx + 1,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const initialFacilities: FacilityItem[] = FACILITIES.map((f, idx) => ({
    id: f.id,
    title: f.title,
    subtitle: f.subtitle,
    tag: f.tag,
    stats: f.stats,
    description: f.description,
    features: f.features,
    icon: f.icon,
    image_url: f.image,
    sort_order: idx + 1,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const initialMilestones: MilestoneItem[] = TIMELINE_MILESTONES.map((m, idx) => ({
    id: m.id,
    year: m.year,
    period: m.period,
    title: m.title,
    category: m.category,
    highlight: m.highlight,
    description: m.description,
    details: m.details,
    icon_name: m.iconName,
    image_url: m.image,
    sort_order: idx + 1,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const initialFaqs: FaqItem[] = FAQS.map((faq, idx) => ({
    id: `faq_${idx + 1}`,
    question: faq.question,
    answer: faq.answer,
    category: faq.category,
    sort_order: idx + 1,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const initialSettings: SchoolSettings = {
    school_name: SCHOOL_INFO.name,
    short_name: SCHOOL_INFO.shortName,
    trust_name: SCHOOL_INFO.trustName,
    est_year: SCHOOL_INFO.establishedYear || '1956',
    phone: SCHOOL_INFO.phone,
    alternate_phone: SCHOOL_INFO.alternatePhone,
    email: SCHOOL_INFO.email,
    website: 'https://skmhighschool.in',
    address: SCHOOL_INFO.location,
    plus_code: '39VX+33X Kanodar, Gujarat',
    office_hours: SCHOOL_INFO.officeHours,
    president_name: MANAGEMENT_LEADERSHIP.presidentName,
    president_role: MANAGEMENT_LEADERSHIP.presidentRole,
    president_quote: MANAGEMENT_LEADERSHIP.quote,
    president_message: MANAGEMENT_LEADERSHIP.fullMessage,
    academic_year: '2026–2027',
    admission_open: true,
    hero_headline: 'Empowering Minds, Shaping Futures Since 1956',
    hero_subheadline: 'Providing quality, value-centric, and modern education in Kanodar across Secondary, Higher Secondary Science, and Technical & Vocational Streams.',
    hero_stat_1_val: '1956',
    hero_stat_1_label: 'Year Established',
    hero_stat_1_sub: 'Founded by Sarvoday Kelavani Mandal',
    hero_stat_2_val: '3 Streams',
    hero_stat_2_label: 'Secondary & Higher Secondary',
    hero_stat_2_sub: 'Science, General & Vocational',
    hero_stat_3_val: '80+ PCs',
    hero_stat_3_label: 'A.N. Musa Computer Lab',
    hero_stat_3_sub: 'High-Speed Gigabit LAN Connectivity',
    hero_stat_4_val: '25k+',
    hero_stat_4_label: 'Global Alumni Network',
    hero_stat_4_sub: 'Leaders in Medicine, Tech & Business',
    gseb_center_code: '02.045 / 52.012',
  };

  const initialLogs: AuditLog[] = [
    {
      id: 'log_1',
      user_name: 'System Initializer',
      user_email: 'system@skmhighschool.in',
      module: 'System',
      action: 'INITIALIZE',
      details: 'SKM High School database successfully initialized with historical records and faculty profiles.',
      ip_address: '127.0.0.1',
      created_at: new Date().toISOString(),
    }
  ];

  return {
    users: initialUsers,
    announcements: initialAnnouncements,
    events: initialEvents,
    gallery: initialGallery,
    documents: initialDocuments,
    staff: initialStaff,
    achievements: initialAchievements,
    admissions: initialAdmissions,
    programs: initialPrograms,
    facilities: initialFacilities,
    milestones: initialMilestones,
    faqs: initialFaqs,
    settings: initialSettings,
    audit_logs: initialLogs,
  };
}

class DatabaseManager {
  private data: DatabaseState;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseState {
    const initial = getInitialData();
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);

        // Auto-backfill new collections if they are missing or empty
        let needsSave = false;
        if (!parsed.programs || parsed.programs.length === 0) {
          parsed.programs = initial.programs;
          needsSave = true;
        }
        if (!parsed.facilities || parsed.facilities.length === 0) {
          parsed.facilities = initial.facilities;
          needsSave = true;
        }
        if (!parsed.milestones || parsed.milestones.length === 0) {
          parsed.milestones = initial.milestones;
          needsSave = true;
        }
        if (!parsed.faqs || parsed.faqs.length === 0) {
          parsed.faqs = initial.faqs;
          needsSave = true;
        }
        if (!parsed.settings || !parsed.settings.hero_headline) {
          parsed.settings = { ...initial.settings, ...(parsed.settings || {}) };
          needsSave = true;
        }
        if (!parsed.users || parsed.users.length === 0) {
          parsed.users = initial.users;
          needsSave = true;
        }

        if (needsSave) {
          this.saveDataDirect(parsed);
        }

        return parsed;
      }
    } catch (err) {
      console.error('[DB] Error loading existing database file, re-initializing:', err);
    }
    this.saveDataDirect(initial);
    return initial;
  }

  private saveDataDirect(data: DatabaseState) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[DB] Error persisting database file:', err);
    }
  }

  public save() {
    this.saveDataDirect(this.data);
  }

  public getState(): DatabaseState {
    return this.data;
  }

  public logActivity(userName: string, userEmail: string, module: string, action: string, details: string, ip: string = '127.0.0.1') {
    const newLog: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      user_name: userName,
      user_email: userEmail,
      module,
      action,
      details,
      ip_address: ip,
      created_at: new Date().toISOString()
    };
    this.data.audit_logs.unshift(newLog);
    // Keep max 500 audit logs
    if (this.data.audit_logs.length > 500) {
      this.data.audit_logs = this.data.audit_logs.slice(0, 500);
    }
    this.save();
  }
}

export const db = new DatabaseManager();
