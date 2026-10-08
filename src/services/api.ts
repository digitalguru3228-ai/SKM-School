// API Client for SKM School Website and CMS

const API_BASE = '/api';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'content_admin' | 'viewer';
}

export interface ApiAnnouncement {
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

export interface ApiEvent {
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

export interface ApiGalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image_url: string;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
}

export type ApiGallery = ApiGalleryItem;

export interface ApiDocument {
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

export interface ApiStaff {
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

export interface ApiAchievement {
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

export interface ApiAdmissionEnquiry {
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

export interface ApiSettings {
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
  hero_headline?: string;
  hero_subheadline?: string;
  hero_stat_1_val?: string;
  hero_stat_1_label?: string;
  hero_stat_1_sub?: string;
  hero_stat_2_val?: string;
  hero_stat_2_label?: string;
  hero_stat_2_sub?: string;
  hero_stat_3_val?: string;
  hero_stat_3_label?: string;
  hero_stat_3_sub?: string;
  hero_stat_4_val?: string;
  hero_stat_4_label?: string;
  hero_stat_4_sub?: string;
  gseb_center_code?: string;
}

export interface ApiProgram {
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

export interface ApiFacility {
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

export interface ApiMilestone {
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

export interface ApiFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export type FaqItem = ApiFaq;

export interface ApiAuditLog {
  id: string;
  user_name: string;
  user_email: string;
  module: string;
  action: string;
  details: string;
  ip_address: string;
  created_at: string;
}

export interface AdminStats {
  totalAnnouncements: number;
  publishedAnnouncements: number;
  draftAnnouncements: number;
  totalEvents: number;
  upcomingEvents: number;
  totalGallery: number;
  totalDocuments: number;
  totalStaff: number;
  totalAchievements: number;
  totalPrograms?: number;
  totalFacilities?: number;
  totalMilestones?: number;
  totalFaqs?: number;
  totalAdmissions: number;
  newAdmissions: number;
  recentLogs: ApiAuditLog[];
  recentAdmissions: ApiAdmissionEnquiry[];
}

export const api = {
  // Public
  async getPublicAnnouncements(category?: string, search?: string): Promise<ApiAnnouncement[]> {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    const res = await fetch(`${API_BASE}/public/announcements?${params.toString()}`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicEvents(): Promise<ApiEvent[]> {
    const res = await fetch(`${API_BASE}/public/events`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicGallery(): Promise<ApiGalleryItem[]> {
    const res = await fetch(`${API_BASE}/public/gallery`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicDocuments(): Promise<ApiDocument[]> {
    const res = await fetch(`${API_BASE}/public/documents`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicStaff(): Promise<ApiStaff[]> {
    const res = await fetch(`${API_BASE}/public/staff`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicAchievements(): Promise<ApiAchievement[]> {
    const res = await fetch(`${API_BASE}/public/achievements`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicSettings(): Promise<ApiSettings | null> {
    const res = await fetch(`${API_BASE}/public/settings`);
    const json = await res.json();
    return json.data || null;
  },

  async getPublicPrograms(): Promise<ApiProgram[]> {
    const res = await fetch(`${API_BASE}/public/programs`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicFacilities(): Promise<ApiFacility[]> {
    const res = await fetch(`${API_BASE}/public/facilities`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicMilestones(): Promise<ApiMilestone[]> {
    const res = await fetch(`${API_BASE}/public/milestones`);
    const json = await res.json();
    return json.data || [];
  },

  async getPublicFaqs(): Promise<ApiFaq[]> {
    const res = await fetch(`${API_BASE}/public/faqs`);
    const json = await res.json();
    return json.data || [];
  },

  async submitAdmissionEnquiry(payload: {
    student_name: string;
    parent_name: string;
    applied_class: string;
    stream: string;
    mobile_number: string;
    email?: string;
    previous_school?: string;
    message?: string;
  }): Promise<{ success: boolean; message: string; error?: string }> {
    const res = await fetch(`${API_BASE}/public/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  async submitPublicAdmission(payload: {
    student_name: string;
    parent_name: string;
    phone: string;
    email?: string;
    stream_applied?: string;
    gender?: string;
    dob?: string;
    village_town?: string;
    previous_school?: string;
    percentage_score?: string;
    needs_scholarship?: boolean;
    notes?: string;
  }): Promise<{ success: boolean; message: string; application_no?: string; error?: string }> {
    const res = await fetch(`${API_BASE}/public/admissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_name: payload.student_name,
        parent_name: payload.parent_name,
        applied_class: payload.stream_applied || 'Secondary / Higher Secondary',
        stream: payload.stream_applied || 'General',
        mobile_number: payload.phone,
        email: payload.email,
        previous_school: payload.previous_school,
        message: `Percentage: ${payload.percentage_score || 'N/A'}, Village: ${payload.village_town || 'N/A'}, Gender: ${payload.gender || 'N/A'}, Needs Scholarship: ${payload.needs_scholarship ? 'Yes' : 'No'}. Notes: ${payload.notes || ''}`
      })
    });
    const data = await res.json();
    return {
      success: data.success,
      message: data.message,
      application_no: data.data?.id ? `SKM-2026-${data.data.id.replace('enq_', '')}` : undefined,
      error: data.error
    };
  },

  // Auth
  async login(email: string, password: string): Promise<{ success: boolean; token?: string; user?: AdminUser; error?: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('skm_admin_jwt', data.token);
    }
    return data;
  },

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('skm_admin_jwt');
  },

  async getCurrentUser(): Promise<AdminUser | null> {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: this.getAuthHeaders()
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json.user || null;
    } catch {
      return null;
    }
  },

  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('skm_admin_jwt');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  // Admin Dashboard
  async getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data;
  },

  // Announcements CRUD
  async getAdminAnnouncements(): Promise<ApiAnnouncement[]> {
    const res = await fetch(`${API_BASE}/admin/announcements`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  },

  async createAnnouncement(data: Partial<ApiAnnouncement>): Promise<ApiAnnouncement> {
    const res = await fetch(`${API_BASE}/admin/announcements`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to create announcement');
    return json.data;
  },

  async updateAnnouncement(id: string, data: Partial<ApiAnnouncement>): Promise<ApiAnnouncement> {
    const res = await fetch(`${API_BASE}/admin/announcements/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update announcement');
    return json.data;
  },

  async deleteAnnouncement(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/announcements/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete announcement');
  },

  // Events CRUD
  async getAdminEvents(): Promise<ApiEvent[]> {
    const res = await fetch(`${API_BASE}/admin/events`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  },

  async createEvent(data: Partial<ApiEvent>): Promise<ApiEvent> {
    const res = await fetch(`${API_BASE}/admin/events`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to create event');
    return json.data;
  },

  async updateEvent(id: string, data: Partial<ApiEvent>): Promise<ApiEvent> {
    const res = await fetch(`${API_BASE}/admin/events/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update event');
    return json.data;
  },

  async deleteEvent(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/events/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete event');
  },

  // Gallery CRUD
  async getAdminGallery(): Promise<ApiGalleryItem[]> {
    const res = await fetch(`${API_BASE}/admin/gallery`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  },

  async createGalleryItem(data: Partial<ApiGalleryItem>): Promise<ApiGalleryItem> {
    const res = await fetch(`${API_BASE}/admin/gallery`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to add gallery item');
    return json.data;
  },

  async updateGalleryItem(id: string, data: Partial<ApiGalleryItem>): Promise<ApiGalleryItem> {
    const res = await fetch(`${API_BASE}/admin/gallery/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update gallery item');
    return json.data;
  },

  async deleteGalleryItem(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/gallery/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete gallery item');
  },

  // Documents CRUD
  async getAdminDocuments(): Promise<ApiDocument[]> {
    const res = await fetch(`${API_BASE}/admin/documents`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  },

  async createDocument(data: Partial<ApiDocument>): Promise<ApiDocument> {
    const res = await fetch(`${API_BASE}/admin/documents`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to upload document');
    return json.data;
  },

  async updateDocument(id: string, data: Partial<ApiDocument>): Promise<ApiDocument> {
    const res = await fetch(`${API_BASE}/admin/documents/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update document');
    return json.data;
  },

  async deleteDocument(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/documents/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete document');
  },

  // Staff CRUD
  async getAdminStaff(): Promise<ApiStaff[]> {
    const res = await fetch(`${API_BASE}/admin/staff`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  },

  async createStaff(data: Partial<ApiStaff>): Promise<ApiStaff> {
    const res = await fetch(`${API_BASE}/admin/staff`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to add staff');
    return json.data;
  },

  async updateStaff(id: string, data: Partial<ApiStaff>): Promise<ApiStaff> {
    const res = await fetch(`${API_BASE}/admin/staff/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update staff');
    return json.data;
  },

  async deleteStaff(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/staff/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete staff');
  },

  // Achievements CRUD
  async getAdminAchievements(): Promise<ApiAchievement[]> {
    const res = await fetch(`${API_BASE}/admin/achievements`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  },

  async createAchievement(data: Partial<ApiAchievement>): Promise<ApiAchievement> {
    const res = await fetch(`${API_BASE}/admin/achievements`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to add achievement');
    return json.data;
  },

  async updateAchievement(id: string, data: Partial<ApiAchievement>): Promise<ApiAchievement> {
    const res = await fetch(`${API_BASE}/admin/achievements/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update achievement');
    return json.data;
  },

  async deleteAchievement(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/achievements/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete achievement');
  },

  // Admissions Inbox
  async getAdminAdmissions(): Promise<ApiAdmissionEnquiry[]> {
    const res = await fetch(`${API_BASE}/admin/admissions`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  },

  async updateAdmissionStatus(id: string, status: string, admin_notes?: string): Promise<ApiAdmissionEnquiry> {
    const res = await fetch(`${API_BASE}/admin/admissions/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status, admin_notes })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update admission');
    return json.data;
  },

  async deleteAdmission(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/admissions/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete admission enquiry');
  },

  // Settings
  async getAdminSettings(): Promise<ApiSettings> {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data;
  },

  async updateAdminSettings(data: Partial<ApiSettings>): Promise<ApiSettings> {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update settings');
    return json.data;
  },

  // Programs / Academic Streams
  async getAdminPrograms(): Promise<ApiProgram[]> {
    const res = await fetch(`${API_BASE}/admin/programs`, { headers: this.getAuthHeaders() });
    const json = await res.json();
    return json.data || [];
  },
  async createAdminProgram(data: Partial<ApiProgram>): Promise<ApiProgram> {
    const res = await fetch(`${API_BASE}/admin/programs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to create program');
    return json.data;
  },
  async updateAdminProgram(id: string, data: Partial<ApiProgram>): Promise<ApiProgram> {
    const res = await fetch(`${API_BASE}/admin/programs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update program');
    return json.data;
  },
  async deleteAdminProgram(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/programs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete program');
  },

  // Facilities
  async getAdminFacilities(): Promise<ApiFacility[]> {
    const res = await fetch(`${API_BASE}/admin/facilities`, { headers: this.getAuthHeaders() });
    const json = await res.json();
    return json.data || [];
  },
  async createAdminFacility(data: Partial<ApiFacility>): Promise<ApiFacility> {
    const res = await fetch(`${API_BASE}/admin/facilities`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to create facility');
    return json.data;
  },
  async updateAdminFacility(id: string, data: Partial<ApiFacility>): Promise<ApiFacility> {
    const res = await fetch(`${API_BASE}/admin/facilities/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update facility');
    return json.data;
  },
  async deleteAdminFacility(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/facilities/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete facility');
  },

  // Milestones / 70-Year Legacy
  async getAdminMilestones(): Promise<ApiMilestone[]> {
    const res = await fetch(`${API_BASE}/admin/milestones`, { headers: this.getAuthHeaders() });
    const json = await res.json();
    return json.data || [];
  },
  async createAdminMilestone(data: Partial<ApiMilestone>): Promise<ApiMilestone> {
    const res = await fetch(`${API_BASE}/admin/milestones`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to create milestone');
    return json.data;
  },
  async updateAdminMilestone(id: string, data: Partial<ApiMilestone>): Promise<ApiMilestone> {
    const res = await fetch(`${API_BASE}/admin/milestones/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update milestone');
    return json.data;
  },
  async deleteAdminMilestone(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/milestones/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete milestone');
  },

  // FAQs
  async getAdminFaqs(): Promise<ApiFaq[]> {
    const res = await fetch(`${API_BASE}/admin/faqs`, { headers: this.getAuthHeaders() });
    const json = await res.json();
    return json.data || [];
  },
  async createAdminFaq(data: Partial<ApiFaq>): Promise<ApiFaq> {
    const res = await fetch(`${API_BASE}/admin/faqs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to create FAQ');
    return json.data;
  },
  async updateAdminFaq(id: string, data: Partial<ApiFaq>): Promise<ApiFaq> {
    const res = await fetch(`${API_BASE}/admin/faqs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to update FAQ');
    return json.data;
  },
  async deleteAdminFaq(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/faqs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete FAQ');
  },

  // Users
  async getAdminUsers(): Promise<Array<{ id: string; name: string; email: string; role: string; is_active: boolean; created_at: string; last_login_at?: string }>> {
    const res = await fetch(`${API_BASE}/admin/users`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  },

  async createUser(data: { name: string; email: string; password: string; role: string }): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/users`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to create user');
  },

  async deleteUser(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/admin/users/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Failed to delete user');
  },

  // Audit Logs
  async getAuditLogs(): Promise<ApiAuditLog[]> {
    const res = await fetch(`${API_BASE}/admin/audit-logs`, {
      headers: this.getAuthHeaders()
    });
    const json = await res.json();
    return json.data || [];
  }
};
