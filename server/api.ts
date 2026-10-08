import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { db, User, AnnouncementItem, EventItem, GalleryItemRecord, DocumentItem, StaffItem, AchievementItem, AdmissionEnquiry, ProgramItem, FacilityItem, MilestoneItem, FaqItem } from './db';
import { requireAuth, requireRoles, generateToken, AuthenticatedRequest } from './auth';

export const router = express.Router();

// Enable parsing
router.use(express.json({ limit: '10mb' }));
router.use(express.urlencoded({ extended: true, limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: true, credentials: true }));

/* ==========================================================================
   PUBLIC READ-ONLY ENDPOINTS (For Public Website)
   ========================================================================== */

// 1. Public Announcements
router.get('/public/announcements', (req, res) => {
  const category = req.query.category as string;
  const search = (req.query.search as string || '').toLowerCase();
  
  let items = db.getState().announcements.filter(a => a.status === 'published');
  
  if (category && category !== 'all') {
    items = items.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }
  
  if (search) {
    items = items.filter(a => 
      a.title.toLowerCase().includes(search) || 
      a.summary.toLowerCase().includes(search) ||
      a.ref_no.toLowerCase().includes(search)
    );
  }
  
  // Sort: pinned first, then newest published_at
  items.sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  res.json({ success: true, data: items });
});

// 2. Public Events
router.get('/public/events', (req, res) => {
  const items = db.getState().events.filter(e => e.status === 'published');
  items.sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());
  res.json({ success: true, data: items });
});

// 3. Public Gallery
router.get('/public/gallery', (req, res) => {
  const items = db.getState().gallery.filter(g => g.status === 'published');
  items.sort((a, b) => a.sort_order - b.sort_order);
  res.json({ success: true, data: items });
});

// 4. Public Documents
router.get('/public/documents', (req, res) => {
  const items = db.getState().documents.filter(d => d.status === 'published');
  res.json({ success: true, data: items });
});

// 5. Public Staff
router.get('/public/staff', (req, res) => {
  const items = db.getState().staff.filter(s => s.status === 'published');
  items.sort((a, b) => a.sort_order - b.sort_order);
  res.json({ success: true, data: items });
});

// 6. Public Achievements
router.get('/public/achievements', (req, res) => {
  const items = db.getState().achievements.filter(a => a.status === 'published');
  res.json({ success: true, data: items });
});

// 7. Public Settings (Contact info, leadership messages, hero)
router.get('/public/settings', (req, res) => {
  const settings = db.getState().settings;
  res.json({ success: true, data: settings });
});

// 8. Public Academic Programs & Streams
router.get('/public/programs', (req, res) => {
  const items = db.getState().programs.filter(p => p.status === 'published');
  items.sort((a, b) => a.sort_order - b.sort_order);
  res.json({ success: true, data: items });
});

// 9. Public Campus Facilities
router.get('/public/facilities', (req, res) => {
  const items = db.getState().facilities.filter(f => f.status === 'published');
  items.sort((a, b) => a.sort_order - b.sort_order);
  res.json({ success: true, data: items });
});

// 10. Public 70-Year Legacy Milestones
router.get('/public/milestones', (req, res) => {
  const items = db.getState().milestones.filter(m => m.status === 'published');
  items.sort((a, b) => a.sort_order - b.sort_order);
  res.json({ success: true, data: items });
});

// 11. Public FAQs
router.get('/public/faqs', (req, res) => {
  const items = db.getState().faqs.filter(f => f.status === 'published');
  items.sort((a, b) => a.sort_order - b.sort_order);
  res.json({ success: true, data: items });
});

// 8. Public Admission Enquiry Submission
router.post('/public/admissions', (req, res) => {
  const { student_name, parent_name, applied_class, stream, mobile_number, email, previous_school, message } = req.body;

  if (!student_name || !parent_name || !applied_class || !stream || !mobile_number) {
    return res.status(400).json({ 
      success: false, 
      error: 'Please fill in all mandatory fields (Student Name, Parent Name, Class, Stream, Mobile Number).' 
    });
  }

  const newEnquiry: AdmissionEnquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    student_name: student_name.trim(),
    parent_name: parent_name.trim(),
    applied_class: applied_class.trim(),
    stream: stream.trim(),
    mobile_number: mobile_number.trim(),
    email: (email || '').trim(),
    previous_school: (previous_school || '').trim(),
    message: (message || '').trim(),
    status: 'new',
    admin_notes: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.getState().admissions.unshift(newEnquiry);
  db.save();

  db.logActivity(
    'Website Visitor',
    'visitor@skmhighschool.in',
    'Admissions',
    'ENQUIRY_SUBMITTED',
    `New admission enquiry submitted for student ${newEnquiry.student_name} (${newEnquiry.applied_class} - ${newEnquiry.stream})`,
    req.ip || '127.0.0.1'
  );

  res.status(201).json({ 
    success: true, 
    message: 'Admission enquiry submitted successfully. The school administrative desk will review and contact you.',
    data: { id: newEnquiry.id } 
  });
});

/* ==========================================================================
   AUTHENTICATION ROUTES
   ========================================================================== */

// Admin Login
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  const user = db.getState().users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || !user.is_active) {
    return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password_hash);
  if (!passwordMatch) {
    return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  }

  // Update last login
  user.last_login_at = new Date().toISOString();
  db.save();

  const token = generateToken(user);

  // Set HTTP-only cookie
  res.cookie('skm_admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  db.logActivity(
    user.name,
    user.email,
    'Authentication',
    'LOGIN',
    `Admin user ${user.name} logged into CMS`,
    req.ip || '127.0.0.1'
  );

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Admin Logout
router.post('/auth/logout', requireAuth, (req: AuthenticatedRequest, res) => {
  res.clearCookie('skm_admin_token');
  if (req.user) {
    db.logActivity(
      req.user.name,
      req.user.email,
      'Authentication',
      'LOGOUT',
      `Admin user ${req.user.name} logged out`,
      req.ip || '127.0.0.1'
    );
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Admin Current Profile
router.get('/auth/me', requireAuth, (req: AuthenticatedRequest, res) => {
  res.json({ success: true, user: req.user });
});

/* ==========================================================================
   ADMIN CMS PROTECTED ENDPOINTS
   ========================================================================== */

// Dashboard Stats
router.get('/admin/stats', requireAuth, (req: AuthenticatedRequest, res) => {
  const state = db.getState();
  res.json({
    success: true,
    data: {
      totalAnnouncements: state.announcements.length,
      publishedAnnouncements: state.announcements.filter(a => a.status === 'published').length,
      draftAnnouncements: state.announcements.filter(a => a.status === 'draft').length,
      totalEvents: state.events.length,
      upcomingEvents: state.events.filter(e => new Date(e.event_date) >= new Date()).length,
      totalGallery: state.gallery.length,
      totalDocuments: state.documents.length,
      totalStaff: state.staff.length,
      totalAchievements: state.achievements.length,
      totalPrograms: state.programs ? state.programs.length : 0,
      totalFacilities: state.facilities ? state.facilities.length : 0,
      totalMilestones: state.milestones ? state.milestones.length : 0,
      totalFaqs: state.faqs ? state.faqs.length : 0,
      totalAdmissions: state.admissions.length,
      newAdmissions: state.admissions.filter(a => a.status === 'new').length,
      recentLogs: state.audit_logs.slice(0, 10),
      recentAdmissions: state.admissions.slice(0, 5)
    }
  });
});

/* --- ANNOUNCEMENTS MANAGEMENT --- */
router.get('/admin/announcements', requireAuth, (req: AuthenticatedRequest, res) => {
  res.json({ success: true, data: db.getState().announcements });
});

router.post('/admin/announcements', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { title, summary, full_content, category, ref_no, attachment_name, attachment_url, file_size, is_urgent, is_pinned, status, published_at } = req.body;

  if (!title || !summary) {
    return res.status(400).json({ success: false, error: 'Title and summary are required.' });
  }

  const newAnn: AnnouncementItem = {
    id: `ann_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim(),
    summary: summary.trim(),
    full_content: (full_content || summary).trim(),
    category: category || 'General',
    ref_no: ref_no || `SKM/CIR/2026/${Math.floor(100 + Math.random() * 900)}`,
    attachment_name: attachment_name || '',
    attachment_url: attachment_url || '',
    file_size: file_size || '1.2 MB',
    is_urgent: !!is_urgent,
    is_pinned: !!is_pinned,
    status: status || 'published',
    published_at: published_at || new Date().toISOString().split('T')[0],
    author_name: req.user!.name,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.getState().announcements.unshift(newAnn);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Announcements', 'CREATE', `Created announcement: ${newAnn.title}`, req.ip);
  res.status(201).json({ success: true, data: newAnn });
});

router.put('/admin/announcements/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().announcements;
  const idx = list.findIndex(a => a.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Announcement not found.' });
  }

  list[idx] = {
    ...list[idx],
    ...req.body,
    updated_at: new Date().toISOString()
  };

  db.save();
  db.logActivity(req.user!.name, req.user!.email, 'Announcements', 'UPDATE', `Updated announcement: ${list[idx].title}`, req.ip);
  res.json({ success: true, data: list[idx] });
});

router.delete('/admin/announcements/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().announcements;
  const item = list.find(a => a.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Announcement not found.' });
  }

  db.getState().announcements = list.filter(a => a.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Announcements', 'DELETE', `Deleted announcement: ${item.title}`, req.ip);
  res.json({ success: true, message: 'Announcement deleted.' });
});

/* --- EVENTS MANAGEMENT --- */
router.get('/admin/events', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().events });
});

router.post('/admin/events', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { title, description, event_date, start_time, end_time, location, category, cover_image, status } = req.body;

  if (!title || !event_date) {
    return res.status(400).json({ success: false, error: 'Title and event date are required.' });
  }

  const newEvent: EventItem = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim(),
    description: (description || '').trim(),
    event_date,
    start_time: start_time || '09:00 AM',
    end_time: end_time || '01:00 PM',
    location: location || 'School Campus',
    category: category || 'Institutional',
    cover_image: cover_image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80',
    status: status || 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.getState().events.unshift(newEvent);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Events', 'CREATE', `Created event: ${newEvent.title}`, req.ip);
  res.status(201).json({ success: true, data: newEvent });
});

router.put('/admin/events/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().events;
  const idx = list.findIndex(e => e.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Event not found.' });
  }

  list[idx] = {
    ...list[idx],
    ...req.body,
    updated_at: new Date().toISOString()
  };

  db.save();
  db.logActivity(req.user!.name, req.user!.email, 'Events', 'UPDATE', `Updated event: ${list[idx].title}`, req.ip);
  res.json({ success: true, data: list[idx] });
});

router.delete('/admin/events/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().events;
  const item = list.find(e => e.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Event not found.' });
  }

  db.getState().events = list.filter(e => e.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Events', 'DELETE', `Deleted event: ${item.title}`, req.ip);
  res.json({ success: true, message: 'Event deleted.' });
});

/* --- GALLERY MANAGEMENT --- */
router.get('/admin/gallery', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().gallery });
});

router.post('/admin/gallery', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { title, caption, category, image_url, status } = req.body;

  if (!title || !image_url) {
    return res.status(400).json({ success: false, error: 'Title and image URL are required.' });
  }

  const newItem: GalleryItemRecord = {
    id: `gal_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim(),
    caption: (caption || '').trim(),
    category: category || 'campus',
    image_url: image_url.trim(),
    sort_order: db.getState().gallery.length + 1,
    status: status || 'published',
    created_at: new Date().toISOString()
  };

  db.getState().gallery.unshift(newItem);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Gallery', 'CREATE', `Added gallery photo: ${newItem.title}`, req.ip);
  res.status(201).json({ success: true, data: newItem });
});

router.put('/admin/gallery/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().gallery;
  const idx = list.findIndex(g => g.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Gallery photo not found.' });
  }

  list[idx] = {
    ...list[idx],
    ...req.body
  };

  db.save();
  db.logActivity(req.user!.name, req.user!.email, 'Gallery', 'UPDATE', `Updated gallery photo: ${list[idx].title}`, req.ip);
  res.json({ success: true, data: list[idx] });
});

router.delete('/admin/gallery/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().gallery;
  const item = list.find(g => g.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Gallery photo not found.' });
  }

  db.getState().gallery = list.filter(g => g.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Gallery', 'DELETE', `Deleted gallery photo: ${item.title}`, req.ip);
  res.json({ success: true, message: 'Gallery photo deleted.' });
});

/* --- DOCUMENTS MANAGEMENT --- */
router.get('/admin/documents', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().documents });
});

router.post('/admin/documents', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { title, category, description, file_url, file_name, file_size, status } = req.body;

  if (!title || !file_url) {
    return res.status(400).json({ success: false, error: 'Title and file URL are required.' });
  }

  const newDoc: DocumentItem = {
    id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim(),
    category: category || 'Circular',
    description: (description || '').trim(),
    file_url: file_url.trim(),
    file_name: file_name || `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
    file_size: file_size || '1.5 MB',
    download_count: 0,
    status: status || 'published',
    created_at: new Date().toISOString()
  };

  db.getState().documents.unshift(newDoc);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Documents', 'CREATE', `Uploaded document: ${newDoc.title}`, req.ip);
  res.status(201).json({ success: true, data: newDoc });
});

router.put('/admin/documents/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().documents;
  const idx = list.findIndex(d => d.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Document not found.' });
  }

  list[idx] = {
    ...list[idx],
    ...req.body
  };

  db.save();
  db.logActivity(req.user!.name, req.user!.email, 'Documents', 'UPDATE', `Updated document: ${list[idx].title}`, req.ip);
  res.json({ success: true, data: list[idx] });
});

router.delete('/admin/documents/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().documents;
  const item = list.find(d => d.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Document not found.' });
  }

  db.getState().documents = list.filter(d => d.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Documents', 'DELETE', `Deleted document: ${item.title}`, req.ip);
  res.json({ success: true, message: 'Document deleted.' });
});

/* --- STAFF MANAGEMENT --- */
router.get('/admin/staff', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().staff });
});

router.post('/admin/staff', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { name, role, designation, department, qualifications, experience_years, subjects, achievements, email, photo_url, is_lead, status } = req.body;

  if (!name || !designation) {
    return res.status(400).json({ success: false, error: 'Name and designation are required.' });
  }

  const newStaff: StaffItem = {
    id: `stf_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    role: role || designation,
    designation: designation.trim(),
    department: department || 'secondary',
    qualifications: qualifications || 'B.Sc., B.Ed.',
    experience_years: experience_years || '5+ Years',
    subjects: Array.isArray(subjects) ? subjects : (subjects ? subjects.split(',').map((s: string) => s.trim()) : []),
    achievements: achievements || '',
    email: email || '',
    photo_url: photo_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    is_lead: !!is_lead,
    sort_order: db.getState().staff.length + 1,
    status: status || 'published',
    created_at: new Date().toISOString()
  };

  db.getState().staff.push(newStaff);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Staff', 'CREATE', `Added staff member: ${newStaff.name}`, req.ip);
  res.status(201).json({ success: true, data: newStaff });
});

router.put('/admin/staff/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().staff;
  const idx = list.findIndex(s => s.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Staff member not found.' });
  }

  list[idx] = {
    ...list[idx],
    ...req.body
  };

  db.save();
  db.logActivity(req.user!.name, req.user!.email, 'Staff', 'UPDATE', `Updated staff member: ${list[idx].name}`, req.ip);
  res.json({ success: true, data: list[idx] });
});

router.delete('/admin/staff/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().staff;
  const item = list.find(s => s.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Staff member not found.' });
  }

  db.getState().staff = list.filter(s => s.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Staff', 'DELETE', `Deleted staff member: ${item.name}`, req.ip);
  res.json({ success: true, message: 'Staff member deleted.' });
});

/* --- ACHIEVEMENTS MANAGEMENT --- */
router.get('/admin/achievements', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().achievements });
});

router.post('/admin/achievements', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { title, year, category, awardee, rank_or_percentile, description, badge, metric, image_url, status } = req.body;

  if (!title || !awardee) {
    return res.status(400).json({ success: false, error: 'Title and awardee name are required.' });
  }

  const newAch: AchievementItem = {
    id: `ach_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim(),
    year: year || '2026',
    category: category || 'board',
    awardee: awardee.trim(),
    rank_or_percentile: rank_or_percentile || '',
    description: (description || '').trim(),
    badge: badge || 'Merit Distinction',
    metric: metric || '',
    image_url: image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    status: status || 'published',
    created_at: new Date().toISOString()
  };

  db.getState().achievements.unshift(newAch);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Achievements', 'CREATE', `Added achievement: ${newAch.title}`, req.ip);
  res.status(201).json({ success: true, data: newAch });
});

router.put('/admin/achievements/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().achievements;
  const idx = list.findIndex(a => a.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Achievement not found.' });
  }

  list[idx] = {
    ...list[idx],
    ...req.body
  };

  db.save();
  db.logActivity(req.user!.name, req.user!.email, 'Achievements', 'UPDATE', `Updated achievement: ${list[idx].title}`, req.ip);
  res.json({ success: true, data: list[idx] });
});

router.delete('/admin/achievements/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().achievements;
  const item = list.find(a => a.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Achievement not found.' });
  }

  db.getState().achievements = list.filter(a => a.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Achievements', 'DELETE', `Deleted achievement: ${item.title}`, req.ip);
  res.json({ success: true, message: 'Achievement deleted.' });
});

/* --- ADMISSIONS ENQUIRIES INBOX --- */
router.get('/admin/admissions', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().admissions });
});

router.put('/admin/admissions/:id', requireAuth, (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const { status, admin_notes } = req.body;
  const list = db.getState().admissions;
  const item = list.find(a => a.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Enquiry not found.' });
  }

  if (status) item.status = status;
  if (admin_notes !== undefined) item.admin_notes = admin_notes;
  item.updated_at = new Date().toISOString();

  db.save();
  db.logActivity(req.user!.name, req.user!.email, 'Admissions', 'STATUS_CHANGE', `Updated status for ${item.student_name} to ${item.status}`, req.ip);
  res.json({ success: true, data: item });
});

router.delete('/admin/admissions/:id', requireAuth, requireRoles('super_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().admissions;
  const item = list.find(a => a.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'Enquiry not found.' });
  }

  db.getState().admissions = list.filter(a => a.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Admissions', 'DELETE', `Deleted enquiry for ${item.student_name}`, req.ip);
  res.json({ success: true, message: 'Enquiry deleted.' });
});

/* --- SCHOOL SETTINGS & LEADERSHIP MESSAGE --- */
router.get('/admin/settings', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().settings });
});

router.put('/admin/settings', requireAuth, requireRoles('super_admin'), (req: AuthenticatedRequest, res) => {
  db.getState().settings = {
    ...db.getState().settings,
    ...req.body
  };

  db.save();
  db.logActivity(req.user!.name, req.user!.email, 'Settings', 'UPDATE', 'Updated school information and leadership message', req.ip);
  res.json({ success: true, data: db.getState().settings });
});

/* --- ACADEMIC PROGRAMS & STREAMS MANAGEMENT --- */
router.get('/admin/programs', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().programs || [] });
});

router.post('/admin/programs', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { title, subtitle, badge, grades, icon, description, subjects, key_features, career_paths, syllabus_url, sort_order, status } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, error: 'Title and description are required.' });
  }

  const newProg: ProgramItem = {
    id: `prog_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim(),
    subtitle: (subtitle || '').trim(),
    badge: (badge || '').trim(),
    grades: (grades || '').trim(),
    icon: icon || 'BookOpen',
    description: description.trim(),
    subjects: Array.isArray(subjects) ? subjects : [],
    key_features: Array.isArray(key_features) ? key_features : [],
    career_paths: Array.isArray(career_paths) ? career_paths : [],
    syllabus_url: syllabus_url || '',
    sort_order: Number(sort_order) || ((db.getState().programs || []).length + 1),
    status: status || 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (!db.getState().programs) db.getState().programs = [];
  db.getState().programs.push(newProg);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Programs', 'CREATE', `Created academic stream: ${newProg.title}`, req.ip);
  res.status(201).json({ success: true, data: newProg });
});

router.put('/admin/programs/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().programs || [];
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Program not found.' });
  }

  const updated: ProgramItem = {
    ...list[idx],
    ...req.body,
    updated_at: new Date().toISOString()
  };

  list[idx] = updated;
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Programs', 'UPDATE', `Updated academic stream: ${updated.title}`, req.ip);
  res.json({ success: true, data: updated });
});

router.delete('/admin/programs/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().programs || [];
  const item = list.find(p => p.id === id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Program not found.' });
  }

  db.getState().programs = list.filter(p => p.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Programs', 'DELETE', `Deleted academic stream: ${item.title}`, req.ip);
  res.json({ success: true, message: 'Academic stream deleted.' });
});

/* --- CAMPUS FACILITIES MANAGEMENT --- */
router.get('/admin/facilities', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().facilities || [] });
});

router.post('/admin/facilities', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { title, subtitle, tag, stats, description, features, icon, image_url, sort_order, status } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, error: 'Title and description are required.' });
  }

  const newFac: FacilityItem = {
    id: `fac_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: title.trim(),
    subtitle: (subtitle || '').trim(),
    tag: (tag || 'Campus Amenity').trim(),
    stats: (stats || '').trim(),
    description: description.trim(),
    features: Array.isArray(features) ? features : [],
    icon: icon || 'Building2',
    image_url: image_url || '',
    sort_order: Number(sort_order) || ((db.getState().facilities || []).length + 1),
    status: status || 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (!db.getState().facilities) db.getState().facilities = [];
  db.getState().facilities.push(newFac);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Facilities', 'CREATE', `Created facility: ${newFac.title}`, req.ip);
  res.status(201).json({ success: true, data: newFac });
});

router.put('/admin/facilities/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().facilities || [];
  const idx = list.findIndex(f => f.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Facility not found.' });
  }

  const updated: FacilityItem = {
    ...list[idx],
    ...req.body,
    updated_at: new Date().toISOString()
  };

  list[idx] = updated;
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Facilities', 'UPDATE', `Updated facility: ${updated.title}`, req.ip);
  res.json({ success: true, data: updated });
});

router.delete('/admin/facilities/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().facilities || [];
  const item = list.find(f => f.id === id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Facility not found.' });
  }

  db.getState().facilities = list.filter(f => f.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Facilities', 'DELETE', `Deleted facility: ${item.title}`, req.ip);
  res.json({ success: true, message: 'Facility deleted.' });
});

/* --- 70-YEAR LEGACY MILESTONES MANAGEMENT --- */
router.get('/admin/milestones', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().milestones || [] });
});

router.post('/admin/milestones', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { year, period, title, category, highlight, description, details, icon_name, image_url, sort_order, status } = req.body;
  if (!title || !description || !period) {
    return res.status(400).json({ success: false, error: 'Period, title, and description are required.' });
  }

  const newMilestone: MilestoneItem = {
    id: `m_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    year: (year || period).trim(),
    period: period.trim(),
    title: title.trim(),
    category: category || 'founding',
    highlight: (highlight || '').trim(),
    description: description.trim(),
    details: Array.isArray(details) ? details : [],
    icon_name: icon_name || 'GraduationCap',
    image_url: image_url || '',
    sort_order: Number(sort_order) || ((db.getState().milestones || []).length + 1),
    status: status || 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (!db.getState().milestones) db.getState().milestones = [];
  db.getState().milestones.push(newMilestone);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Legacy', 'CREATE', `Created milestone: ${newMilestone.title} (${newMilestone.period})`, req.ip);
  res.status(201).json({ success: true, data: newMilestone });
});

router.put('/admin/milestones/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().milestones || [];
  const idx = list.findIndex(m => m.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Milestone not found.' });
  }

  const updated: MilestoneItem = {
    ...list[idx],
    ...req.body,
    updated_at: new Date().toISOString()
  };

  list[idx] = updated;
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Legacy', 'UPDATE', `Updated milestone: ${updated.title}`, req.ip);
  res.json({ success: true, data: updated });
});

router.delete('/admin/milestones/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().milestones || [];
  const item = list.find(m => m.id === id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Milestone not found.' });
  }

  db.getState().milestones = list.filter(m => m.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Legacy', 'DELETE', `Deleted milestone: ${item.title}`, req.ip);
  res.json({ success: true, message: 'Milestone deleted.' });
});

/* --- FREQUENTLY ASKED QUESTIONS (FAQS) MANAGEMENT --- */
router.get('/admin/faqs', requireAuth, (req, res) => {
  res.json({ success: true, data: db.getState().faqs || [] });
});

router.post('/admin/faqs', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { question, answer, category, sort_order, status } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ success: false, error: 'Question and answer are required.' });
  }

  const newFaq: FaqItem = {
    id: `faq_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    question: question.trim(),
    answer: answer.trim(),
    category: category || 'general',
    sort_order: Number(sort_order) || ((db.getState().faqs || []).length + 1),
    status: status || 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (!db.getState().faqs) db.getState().faqs = [];
  db.getState().faqs.push(newFaq);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'FAQs', 'CREATE', `Created FAQ: ${newFaq.question.substring(0, 40)}...`, req.ip);
  res.status(201).json({ success: true, data: newFaq });
});

router.put('/admin/faqs/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().faqs || [];
  const idx = list.findIndex(f => f.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'FAQ not found.' });
  }

  const updated: FaqItem = {
    ...list[idx],
    ...req.body,
    updated_at: new Date().toISOString()
  };

  list[idx] = updated;
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'FAQs', 'UPDATE', `Updated FAQ: ${updated.question.substring(0, 40)}...`, req.ip);
  res.json({ success: true, data: updated });
});

router.delete('/admin/faqs/:id', requireAuth, requireRoles('super_admin', 'content_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  const list = db.getState().faqs || [];
  const item = list.find(f => f.id === id);
  if (!item) {
    return res.status(404).json({ success: false, error: 'FAQ not found.' });
  }

  db.getState().faqs = list.filter(f => f.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'FAQs', 'DELETE', `Deleted FAQ: ${item.question.substring(0, 40)}...`, req.ip);
  res.json({ success: true, message: 'FAQ deleted.' });
});

/* --- USER MANAGEMENT --- */
router.get('/admin/users', requireAuth, requireRoles('super_admin'), (req, res) => {
  // Never send password hashes
  const safeUsers = db.getState().users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    is_active: u.is_active,
    created_at: u.created_at,
    last_login_at: u.last_login_at
  }));
  res.json({ success: true, data: safeUsers });
});

router.post('/admin/users', requireAuth, requireRoles('super_admin'), (req: AuthenticatedRequest, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
  }

  const existing = db.getState().users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, error: 'User with this email already exists.' });
  }

  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(password, salt);

  const newUser: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password_hash,
    role: role || 'content_admin',
    is_active: true,
    created_at: new Date().toISOString()
  };

  db.getState().users.push(newUser);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Users', 'CREATE', `Created staff admin account for: ${newUser.name} (${newUser.email})`, req.ip);

  res.status(201).json({
    success: true,
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      is_active: newUser.is_active,
      created_at: newUser.created_at
    }
  });
});

router.delete('/admin/users/:id', requireAuth, requireRoles('super_admin'), (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  
  if (id === req.user!.id) {
    return res.status(400).json({ success: false, error: 'You cannot delete your own admin account.' });
  }

  const list = db.getState().users;
  const item = list.find(u => u.id === id);

  if (!item) {
    return res.status(404).json({ success: false, error: 'User not found.' });
  }

  db.getState().users = list.filter(u => u.id !== id);
  db.save();

  db.logActivity(req.user!.name, req.user!.email, 'Users', 'DELETE', `Deleted user account: ${item.name}`, req.ip);
  res.json({ success: true, message: 'User account removed.' });
});

/* --- AUDIT LOGS --- */
router.get('/admin/audit-logs', requireAuth, requireRoles('super_admin'), (req, res) => {
  res.json({ success: true, data: db.getState().audit_logs });
});
