import React, { useState, useEffect } from 'react';
import { 
  api, 
  AdminUser, 
  AdminStats, 
  ApiAnnouncement, 
  ApiEvent, 
  ApiGalleryItem, 
  ApiDocument, 
  ApiStaff, 
  ApiAchievement, 
  ApiAdmissionEnquiry, 
  ApiSettings,
  ApiAuditLog,
  ApiProgram,
  ApiFacility,
  ApiMilestone,
  ApiFaq
} from '../../services/api';
import { SchoolLogo } from '../SchoolLogo';
import { 
  LayoutDashboard, 
  Bell, 
  Calendar, 
  Image as ImageIcon, 
  FileText, 
  Users, 
  Award, 
  Inbox, 
  Building2, 
  Shield, 
  History, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Download, 
  Eye, 
  ChevronRight, 
  Sun, 
  Moon, 
  Loader2, 
  Pin, 
  Sparkles,
  Menu,
  X,
  RefreshCw,
  GraduationCap,
  HelpCircle
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onViewPublicSite: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

type TabType = 
  | 'dashboard'
  | 'announcements'
  | 'events'
  | 'programs'
  | 'facilities'
  | 'milestones'
  | 'gallery'
  | 'documents'
  | 'staff'
  | 'achievements'
  | 'admissions'
  | 'faqs'
  | 'settings'
  | 'users'
  | 'audit';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onViewPublicSite,
  isDark,
  toggleTheme
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Data states
  const [announcements, setAnnouncements] = useState<ApiAnnouncement[]>([]);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [gallery, setGallery] = useState<ApiGalleryItem[]>([]);
  const [documents, setDocuments] = useState<ApiDocument[]>([]);
  const [staff, setStaff] = useState<ApiStaff[]>([]);
  const [achievements, setAchievements] = useState<ApiAchievement[]>([]);
  const [admissions, setAdmissions] = useState<ApiAdmissionEnquiry[]>([]);
  const [programs, setPrograms] = useState<ApiProgram[]>([]);
  const [facilities, setFacilities] = useState<ApiFacility[]>([]);
  const [milestones, setMilestones] = useState<ApiMilestone[]>([]);
  const [faqs, setFaqs] = useState<ApiFaq[]>([]);
  const [settings, setSettings] = useState<ApiSettings | null>(null);
  const [auditLogs, setAuditLogs] = useState<ApiAuditLog[]>([]);
  const [userList, setUserList] = useState<any[]>([]);

  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal / Form state
  const [modalType, setModalType] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [previewItem, setPreviewItem] = useState<any | null>(null);

  // Delete Confirmation Dialog state (Safe for iframe and web sandboxes)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    title: string;
    itemName: string;
    itemType: string;
    onConfirm: () => Promise<void>;
    isDeleting?: boolean;
  } | null>(null);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        annData,
        evtData,
        galData,
        docData,
        stfData,
        achData,
        admData,
        progData,
        facData,
        mileData,
        faqData,
        setData,
        logData
      ] = await Promise.all([
        api.getAdminStats(),
        api.getAdminAnnouncements(),
        api.getAdminEvents(),
        api.getAdminGallery(),
        api.getAdminDocuments(),
        api.getAdminStaff(),
        api.getAdminAchievements(),
        api.getAdminAdmissions(),
        api.getAdminPrograms(),
        api.getAdminFacilities(),
        api.getAdminMilestones(),
        api.getAdminFaqs(),
        api.getAdminSettings(),
        api.getAuditLogs()
      ]);

      setStats(statsData);
      setAnnouncements(annData);
      setEvents(evtData);
      setGallery(galData);
      setDocuments(docData);
      setStaff(stfData);
      setAchievements(achData);
      setAdmissions(admData);
      setPrograms(progData);
      setFacilities(facData);
      setMilestones(mileData);
      setFaqs(faqData);
      setSettings(setData);
      setAuditLogs(logData);

      if (currentUser.role === 'super_admin') {
        const uList = await api.getAdminUsers();
        setUserList(uList);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showNotification('Failed to load some dashboard data. Retrying...', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 flex flex-col border-r transition-all duration-300 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <SchoolLogo size={34} />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight text-slate-900 dark:text-white">
                SKM High School
              </h2>
              <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                School CMS & Portal
              </span>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Pill */}
        <div className="px-4 py-3 mx-3 mt-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-bold text-xs flex items-center justify-center">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate text-slate-900 dark:text-white">
                {currentUser.name}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {currentUser.role.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'announcements', label: 'Announcements & Circulars', icon: Bell, count: announcements.length },
            { id: 'events', label: 'Events & Functions', icon: Calendar, count: events.length },
            { id: 'programs', label: 'Academic Streams', icon: GraduationCap, count: programs.length },
            { id: 'facilities', label: 'Campus Facilities', icon: Building2, count: facilities.length },
            { id: 'milestones', label: '70-Year Legacy Milestones', icon: History, count: milestones.length },
            { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon, count: gallery.length },
            { id: 'documents', label: 'Downloads & Circulars', icon: FileText, count: documents.length },
            { id: 'staff', label: 'Faculty & Staff', icon: Users, count: staff.length },
            { id: 'achievements', label: 'Institutional Honors', icon: Award, count: achievements.length },
            { id: 'admissions', label: 'Admission Enquiries', icon: Inbox, count: admissions.filter(a => a.status === 'new').length, highlight: true },
            { id: 'faqs', label: 'Parent Guidance FAQs', icon: HelpCircle, count: faqs.length },
            { id: 'settings', label: 'School Profile & Hero', icon: Building2 },
            ...(currentUser.role === 'super_admin' ? [
              { id: 'users', label: 'Admin Accounts', icon: Shield },
              { id: 'audit', label: 'Activity Audit Logs', icon: History }
            ] : [])
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as TabType);
                  setSidebarOpen(false);
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.highlight && item.count > 0
                      ? 'bg-rose-500 text-white'
                      : isDark
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <button
            onClick={onViewPublicSite}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ExternalLink className="w-4 h-4 text-amber-500" />
            <span>Open Public Website</span>
          </button>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className={`sticky top-0 z-30 px-6 py-3.5 border-b backdrop-blur-md flex items-center justify-between ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 lg:hidden text-slate-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-bold capitalize text-slate-900 dark:text-white">
                {activeTab.replace('_', ' ')}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                SKM High School & Higher Secondary School, Kanodar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAllData}
              disabled={loading}
              title="Refresh Data"
              className={`p-2 rounded-xl border text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={onViewPublicSite}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              View Site
            </button>
          </div>
        </header>

        {/* Global Toast Notification */}
        {notification && (
          <div className="px-6 pt-4">
            <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
              notification.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{notification.text}</span>
            </div>
          </div>
        )}

        {/* Workspace Body */}
        <main className="flex-1 p-6">
          {loading && !stats ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
              <p className="text-sm font-medium text-slate-500">Loading School Management Database...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && stats && (
                <div className="space-y-6">
                  {/* Quick Action Banner */}
                  <div className={`p-6 rounded-3xl border bg-gradient-to-r relative overflow-hidden ${
                    isDark 
                      ? 'from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/30' 
                      : 'from-amber-50 via-white to-amber-50/30 border-amber-200'
                  }`}>
                    <div className="relative z-10 max-w-2xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400 mb-3">
                        <Sparkles className="w-3.5 h-3.5" /> Institutional Administration
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Welcome to SKM High School Management System
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
                        Sarvoday Kelavani Mandal, Kanodar. Manage announcements, faculty directory, board achievements, downloadable circulars, and student admission inquiries in real-time.
                      </p>
                      
                      {/* Quick Action Shortcuts */}
                      <div className="flex flex-wrap items-center gap-3 mt-5">
                        <button
                          onClick={() => {
                            setActiveTab('announcements');
                            setEditingItem(null);
                            setModalType('announcement');
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-600/20"
                        >
                          <Plus className="w-4 h-4" /> New Announcement
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('events');
                            setEditingItem(null);
                            setModalType('event');
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" /> Add Event
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('admissions');
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Inbox className="w-4 h-4 text-rose-500" /> Review Enquiries ({stats.newAdmissions})
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Top Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Published Circulars', value: stats.publishedAnnouncements, icon: Bell, color: 'amber' },
                      { label: 'Upcoming Events', value: stats.upcomingEvents, icon: Calendar, color: 'blue' },
                      { label: 'Faculty Staff', value: stats.totalStaff, icon: Users, color: 'emerald' },
                      { label: 'New Admissions', value: stats.newAdmissions, icon: Inbox, color: 'rose' },
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={i}
                          className={`p-5 rounded-2xl border transition-all ${
                            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              {card.label}
                            </span>
                            <div className={`p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400`}>
                              <Icon className="w-4 h-4" />
                            </div>
                          </div>
                          <p className="text-2xl font-black mt-2 text-slate-900 dark:text-white">
                            {card.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Two Column Layout: Recent Admissions & Audit Logs */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Recent Admission Enquiries */}
                    <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                          <Inbox className="w-4 h-4 text-amber-500" />
                          Recent Admission Enquiries
                        </h3>
                        <button
                          onClick={() => setActiveTab('admissions')}
                          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          View All
                        </button>
                      </div>

                      {admissions.length === 0 ? (
                        <p className="text-xs text-slate-500 py-6 text-center">No enquiries received yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {admissions.slice(0, 4).map((adm) => (
                            <div
                              key={adm.id}
                              className={`p-3.5 rounded-xl border flex items-center justify-between ${
                                isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200/80'
                              }`}
                            >
                              <div>
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                                  {adm.student_name}
                                </h4>
                                <p className="text-[11px] text-slate-500">
                                  {adm.applied_class} • {adm.stream} • {adm.mobile_number}
                                </p>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                adm.status === 'new' 
                                  ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' 
                                  : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                              }`}>
                                {adm.status.replace('_', ' ')}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Recent Activity Audit Logs */}
                    <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                          <History className="w-4 h-4 text-amber-500" />
                          Recent System Activity Log
                        </h3>
                        {currentUser.role === 'super_admin' && (
                          <button
                            onClick={() => setActiveTab('audit')}
                            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                          >
                            Full Audit
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        {auditLogs.slice(0, 5).map((log) => (
                          <div
                            key={log.id}
                            className={`p-3 rounded-xl text-xs border ${
                              isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200/80'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                              <span>{log.user_name}</span>
                              <span className="text-[10px] text-slate-400 font-normal">
                                {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                              {log.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: ANNOUNCEMENTS MANAGEMENT */}
              {activeTab === 'announcements' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold">Official Bulletin & Circulars</h2>
                      <p className="text-xs text-slate-500">Publish, pin, edit, and categorize school circulars and exam schedules</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('announcement');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Create Announcement
                    </button>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[240px]">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search circulars by title, reference no, or text..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 ${
                          isDark ? 'bg-slate-900 border-slate-800 focus:border-amber-500' : 'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  {/* List View */}
                  <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className={`border-b font-bold text-slate-500 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <th className="p-3.5">Title & Reference</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {announcements
                          .filter(a => !searchTerm || a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.ref_no.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((a) => (
                            <tr key={a.id} className="hover:bg-slate-500/5 transition-all">
                              <td className="p-3.5">
                                <div className="flex items-center gap-2">
                                  {a.is_pinned && <Pin className="w-3.5 h-3.5 text-amber-500" />}
                                  <div>
                                    <span className="font-bold text-slate-900 dark:text-white block">{a.title}</span>
                                    <span className="text-[11px] text-slate-400 font-mono">{a.ref_no}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                                  {a.category}
                                </span>
                              </td>
                              <td className="p-3.5 text-slate-500">{a.published_at}</td>
                              <td className="p-3.5">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  a.status === 'published' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-slate-500/15 text-slate-400'
                                }`}>
                                  {a.status}
                                </span>
                              </td>
                              <td className="p-3.5 text-right space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingItem(a);
                                    setModalType('announcement');
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteModal({
                                      isOpen: true,
                                      title: 'Delete Announcement',
                                      itemName: a.title,
                                      itemType: 'Announcement',
                                      onConfirm: async () => {
                                        await api.deleteAnnouncement(a.id);
                                        setAnnouncements(prev => prev.filter(x => x.id !== a.id));
                                        showNotification('Announcement deleted successfully.');
                                        api.getAdminStats().then(setStats).catch(() => {});
                                      }
                                    });
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500"
                                  title="Delete announcement"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: EVENTS MANAGEMENT */}
              {activeTab === 'events' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">School Events & Functions</h2>
                      <p className="text-xs text-slate-500">Manage Foundation Day, STEM exhibitions, and sports meets</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('event');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add Event
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map((evt) => (
                      <div
                        key={evt.id}
                        className={`rounded-2xl border overflow-hidden flex flex-col ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                      >
                        <img src={evt.cover_image} alt={evt.title} className="h-36 w-full object-cover" />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-amber-600 dark:text-amber-400 font-bold mb-1">
                              <span>{evt.category}</span>
                              <span>{evt.event_date}</span>
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                              {evt.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                              {evt.description}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">{evt.location}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingItem(evt);
                                  setModalType('event');
                                }}
                                className="p-1 rounded text-slate-400 hover:text-amber-500"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteModal({
                                    isOpen: true,
                                    title: 'Delete Event',
                                    itemName: evt.title,
                                    itemType: 'Event',
                                    onConfirm: async () => {
                                      await api.deleteEvent(evt.id);
                                      setEvents(prev => prev.filter(e => e.id !== evt.id));
                                      showNotification('Event removed.');
                                      api.getAdminStats().then(setStats).catch(() => {});
                                    }
                                  });
                                }}
                                className="p-1 rounded text-slate-400 hover:text-rose-500"
                                title="Delete event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: ACADEMIC PROGRAMS & STREAMS MANAGEMENT */}
              {activeTab === 'programs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Academic Streams & Programs</h2>
                      <p className="text-xs text-slate-500">Manage curriculum, subject lists, grades, and career pathways</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('program');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Stream
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {programs.map((prog) => (
                      <div
                        key={prog.id}
                        className={`p-5 rounded-2xl border flex flex-col justify-between ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              {prog.grades}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase">
                              {prog.badge}
                            </span>
                          </div>
                          <h3 className="font-bold text-base text-slate-900 dark:text-white">
                            {prog.title}
                          </h3>
                          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                            {prog.subtitle}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
                            {prog.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {prog.subjects.slice(0, 3).map((sub, i) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {sub}
                              </span>
                            ))}
                            {prog.subjects.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-mono">
                                +{prog.subjects.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            prog.status === 'published' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/15 text-slate-400'
                          }`}>
                            {prog.status}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingItem(prog);
                                setModalType('program');
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-amber-500 cursor-pointer"
                              title="Edit stream"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  title: 'Delete Academic Stream',
                                  itemName: prog.title,
                                  itemType: 'Academic Stream',
                                  onConfirm: async () => {
                                    await api.deleteAdminProgram(prog.id);
                                    setPrograms(prev => prev.filter(x => x.id !== prog.id));
                                    showNotification('Academic stream deleted.');
                                    api.getAdminStats().then(setStats).catch(() => {});
                                  }
                                });
                              }}
                              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 cursor-pointer"
                              title="Delete stream"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CAMPUS FACILITIES MANAGEMENT */}
              {activeTab === 'facilities' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Campus Infrastructure & Facilities</h2>
                      <p className="text-xs text-slate-500">Manage laboratories, library, computer centers, and athletic amenities</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('facility');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Facility
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {facilities.map((fac) => (
                      <div
                        key={fac.id}
                        className={`rounded-2xl border overflow-hidden flex flex-col justify-between ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                        }`}
                      >
                        <div>
                          {fac.image_url ? (
                            <img src={fac.image_url} alt={fac.title} className="h-36 w-full object-cover" />
                          ) : (
                            <div className="h-28 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                              <Building2 className="w-8 h-8" />
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex items-center justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-1">
                              <span>{fac.tag || 'Campus Facility'}</span>
                              <span className="text-slate-400 font-normal">{fac.stats}</span>
                            </div>
                            <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                              {fac.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {fac.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 mt-2 pt-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            fac.status === 'published' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/15 text-slate-400'
                          }`}>
                            {fac.status}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingItem(fac);
                                setModalType('facility');
                              }}
                              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-amber-500 cursor-pointer"
                              title="Edit facility"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  title: 'Delete Facility',
                                  itemName: fac.title,
                                  itemType: 'Facility',
                                  onConfirm: async () => {
                                    await api.deleteAdminFacility(fac.id);
                                    setFacilities(prev => prev.filter(x => x.id !== fac.id));
                                    showNotification('Facility deleted.');
                                    api.getAdminStats().then(setStats).catch(() => {});
                                  }
                                });
                              }}
                              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 cursor-pointer"
                              title="Delete facility"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: 70-YEAR LEGACY MILESTONES MANAGEMENT */}
              {activeTab === 'milestones' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">70-Year Institutional Milestones</h2>
                      <p className="text-xs text-slate-500">Manage historical timeline, founding memories, and campus inaugurations</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('milestone');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Milestone
                    </button>
                  </div>

                  <div className="space-y-3">
                    {milestones.map((mile) => (
                      <div
                        key={mile.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 font-mono shrink-0">
                            {mile.period}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                                {mile.title}
                              </h3>
                              <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 capitalize">
                                • {mile.category}
                              </span>
                            </div>
                            <p className="text-xs text-amber-700 dark:text-amber-300 font-medium mt-0.5">
                              {mile.highlight}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                              {mile.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-4">
                          <button
                            onClick={() => {
                              setEditingItem(mile);
                              setModalType('milestone');
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-amber-500 cursor-pointer"
                            title="Edit milestone"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteModal({
                                isOpen: true,
                                title: 'Delete Milestone',
                                itemName: `${mile.period}: ${mile.title}`,
                                itemType: 'Historical Milestone',
                                onConfirm: async () => {
                                  await api.deleteAdminMilestone(mile.id);
                                  setMilestones(prev => prev.filter(x => x.id !== mile.id));
                                  showNotification('Milestone deleted.');
                                  api.getAdminStats().then(setStats).catch(() => {});
                                }
                              });
                            }}
                            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 cursor-pointer"
                            title="Delete milestone"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY MANAGEMENT */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Campus Photo Gallery</h2>
                      <p className="text-xs text-slate-500">Upload and organize campus life, laboratory, and sports photographs</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('gallery');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Upload Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((g) => (
                      <div
                        key={g.id}
                        className={`rounded-2xl border overflow-hidden group relative ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                      >
                        <img src={g.image_url} alt={g.title} className="h-40 w-full object-cover" />
                        <div className="p-3 flex items-center justify-between">
                          <div className="overflow-hidden pr-2">
                            <h4 className="text-xs font-bold truncate text-slate-900 dark:text-white">{g.title}</h4>
                            <p className="text-[10px] text-slate-500 capitalize">{g.category}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingItem(g);
                                setModalType('gallery');
                              }}
                              className="p-1 rounded text-slate-400 hover:text-amber-500"
                              title="Edit photo details"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  title: 'Delete Photo',
                                  itemName: g.title,
                                  itemType: 'Gallery Photo',
                                  onConfirm: async () => {
                                    await api.deleteGalleryItem(g.id);
                                    setGallery(prev => prev.filter(x => x.id !== g.id));
                                    showNotification('Photo removed.');
                                    api.getAdminStats().then(setStats).catch(() => {});
                                  }
                                });
                              }}
                              className="p-1 rounded text-slate-400 hover:text-rose-500"
                              title="Delete photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: DOCUMENTS MANAGEMENT */}
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Downloads & PDF Circulars</h2>
                      <p className="text-xs text-slate-500">Manage admission prospectus, board timetables, and scholarship forms</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('document');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add Document
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{doc.title}</h4>
                            <p className="text-[11px] text-slate-500">{doc.category} • {doc.file_size} • {doc.file_name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingItem(doc);
                              setModalType('document');
                            }}
                            className="p-2 rounded-lg text-slate-400 hover:text-amber-500"
                            title="Edit document"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteModal({
                                isOpen: true,
                                title: 'Delete Document',
                                itemName: doc.title,
                                itemType: 'Document',
                                onConfirm: async () => {
                                  await api.deleteDocument(doc.id);
                                  setDocuments(prev => prev.filter(x => x.id !== doc.id));
                                  showNotification('Document removed.');
                                  api.getAdminStats().then(setStats).catch(() => {});
                                }
                              });
                            }}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-500"
                            title="Delete document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: FACULTY & STAFF MANAGEMENT */}
              {activeTab === 'staff' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Faculty & Staff Directory</h2>
                      <p className="text-xs text-slate-500">Add, edit, or reorganize teacher and administration profiles</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('staff');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add Faculty Member
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {staff.map((st) => (
                      <div
                        key={st.id}
                        className={`p-4 rounded-2xl border flex flex-col justify-between ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={st.photo_url} alt={st.name} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{st.name}</h4>
                            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{st.designation}</p>
                            <p className="text-[10px] text-slate-500 capitalize">{st.department} • {st.qualifications}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                          <span>{st.experience_years} Exp</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingItem(st);
                                setModalType('staff');
                              }}
                              className="p-1 hover:text-amber-500"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  title: 'Remove Faculty Member',
                                  itemName: st.name,
                                  itemType: 'Faculty Member',
                                  onConfirm: async () => {
                                    await api.deleteStaff(st.id);
                                    setStaff(prev => prev.filter(x => x.id !== st.id));
                                    window.dispatchEvent(new CustomEvent('skm_staff_updated'));
                                    showNotification('Faculty member removed.');
                                    api.getAdminStats().then(setStats).catch(() => {});
                                  }
                                });
                              }}
                              className="p-1 hover:text-rose-500"
                              title="Remove faculty"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: ACHIEVEMENTS MANAGEMENT */}
              {activeTab === 'achievements' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Institutional Honors & Board Records</h2>
                      <p className="text-xs text-slate-500">Celebrate GSEB 100% results, Science Fair winners, and Scout medals</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('achievement');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add Achievement
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className={`p-4 rounded-2xl border flex items-start justify-between ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 mt-1">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{ach.category} • {ach.year}</span>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{ach.title}</h4>
                            <p className="text-[11px] text-slate-500 mt-1">{ach.awardee} {ach.rank_or_percentile ? `(${ach.rank_or_percentile})` : ''}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingItem(ach);
                              setModalType('achievement');
                            }}
                            className="p-1.5 text-slate-400 hover:text-amber-500"
                            title="Edit achievement"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteModal({
                                isOpen: true,
                                title: 'Remove Achievement',
                                itemName: ach.title,
                                itemType: 'Achievement',
                                onConfirm: async () => {
                                  await api.deleteAchievement(ach.id);
                                  setAchievements(prev => prev.filter(x => x.id !== ach.id));
                                  showNotification('Achievement removed.');
                                  api.getAdminStats().then(setStats).catch(() => {});
                                }
                              });
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-500"
                            title="Delete achievement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: ADMISSIONS INBOX */}
              {activeTab === 'admissions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Online Admission Enquiries Inbox</h2>
                      <p className="text-xs text-slate-500">Review, update status, and manage parent applications</p>
                    </div>
                  </div>

                  <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className={`border-b font-bold text-slate-500 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <th className="p-3.5">Student & Parent</th>
                          <th className="p-3.5">Class & Stream</th>
                          <th className="p-3.5">Contact Details</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {admissions.map((adm) => (
                          <tr key={adm.id} className="hover:bg-slate-500/5 transition-all">
                            <td className="p-3.5">
                              <span className="font-bold text-slate-900 dark:text-white block">{adm.student_name}</span>
                              <span className="text-[11px] text-slate-400">Parent: {adm.parent_name}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{adm.applied_class}</span>
                              <span className="text-[11px] text-slate-400 block">{adm.stream}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-mono text-slate-900 dark:text-white block">{adm.mobile_number}</span>
                              <span className="text-[11px] text-slate-400">{adm.email || 'No email provided'}</span>
                            </td>
                            <td className="p-3.5">
                              <select
                                value={adm.status}
                                onChange={async (e) => {
                                  const updated = await api.updateAdmissionStatus(adm.id, e.target.value);
                                  setAdmissions(admissions.map(x => x.id === adm.id ? updated : x));
                                  showNotification(`Status updated to ${e.target.value}`);
                                }}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                                  isDark ? 'bg-slate-950 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="under_review">Under Review</option>
                                <option value="contacted">Contacted</option>
                                <option value="admitted">Admitted</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => setPreviewItem(adm)}
                                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                                title="View Message"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              {currentUser.role === 'super_admin' && (
                                <button
                                  onClick={() => {
                                    setDeleteModal({
                                      isOpen: true,
                                      title: 'Delete Admission Enquiry',
                                      itemName: `Enquiry from ${adm.student_name} (Parent: ${adm.parent_name})`,
                                      itemType: 'Admission Enquiry',
                                      onConfirm: async () => {
                                        await api.deleteAdmission(adm.id);
                                        setAdmissions(prev => prev.filter(x => x.id !== adm.id));
                                        showNotification('Enquiry deleted.');
                                        api.getAdminStats().then(setStats).catch(() => {});
                                      }
                                    });
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500"
                                  title="Delete enquiry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: FREQUENTLY ASKED QUESTIONS (FAQS) */}
              {activeTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Frequently Asked Questions (FAQs)</h2>
                      <p className="text-xs text-slate-500">Provide verified answers for admissions, scholarships, laboratory facilities, and school timings</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setModalType('faq');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add FAQ
                    </button>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className={`p-4 rounded-2xl border flex items-start justify-between ${
                          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                        }`}
                      >
                        <div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 capitalize mb-1 inline-block">
                            {faq.category}
                          </span>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                            {faq.question}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-4">
                          <button
                            onClick={() => {
                              setEditingItem(faq);
                              setModalType('faq');
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-amber-500 cursor-pointer"
                            title="Edit FAQ"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteModal({
                                isOpen: true,
                                title: 'Delete FAQ',
                                itemName: faq.question,
                                itemType: 'FAQ Question',
                                onConfirm: async () => {
                                  await api.deleteAdminFaq(faq.id);
                                  setFaqs(prev => prev.filter(x => x.id !== faq.id));
                                  showNotification('FAQ removed.');
                                  api.getAdminStats().then(setStats).catch(() => {});
                                }
                              });
                            }}
                            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 cursor-pointer"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 9: SCHOOL PROFILE, HERO & SETTINGS */}
              {activeTab === 'settings' && settings && (
                <div className="max-w-4xl space-y-6">
                  <div>
                    <h2 className="text-lg font-bold">School Profile, Hero & Portal Settings</h2>
                    <p className="text-xs text-slate-500">All information on the website is configured here and directly controls the public website</p>
                  </div>

                  {/* Section 1: Hero Banner & Headline Configuration */}
                  <div className={`p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Hero Banner & Homepage Headline
                    </h3>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Main Headline</label>
                      <input
                        type="text"
                        value={settings.hero_headline || ''}
                        onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border text-xs font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Hero Subheadline / Mission Summary</label>
                      <textarea
                        rows={2}
                        value={settings.hero_subheadline || ''}
                        onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">4 Homepage Key Statistics Cards</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Stat 1 (e.g. Est. Year)</span>
                          <input
                            type="text"
                            placeholder="Value (1956)"
                            value={settings.hero_stat_1_val || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_1_val: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs mb-1.5 font-bold ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                          <input
                            type="text"
                            placeholder="Label (Year Established)"
                            value={settings.hero_stat_1_label || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_1_label: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs mb-1.5 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                          <input
                            type="text"
                            placeholder="Subtitle (Founded by Sarvoday...)"
                            value={settings.hero_stat_1_sub || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_1_sub: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                        </div>

                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Stat 2 (e.g. Streams)</span>
                          <input
                            type="text"
                            placeholder="Value (3 Streams)"
                            value={settings.hero_stat_2_val || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_2_val: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs mb-1.5 font-bold ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                          <input
                            type="text"
                            placeholder="Label (Secondary & Higher Sec.)"
                            value={settings.hero_stat_2_label || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_2_label: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs mb-1.5 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                          <input
                            type="text"
                            placeholder="Subtitle (Science, General & Vocational)"
                            value={settings.hero_stat_2_sub || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_2_sub: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                        </div>

                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Stat 3 (e.g. Lab/Computers)</span>
                          <input
                            type="text"
                            placeholder="Value (80+ PCs)"
                            value={settings.hero_stat_3_val || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_3_val: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs mb-1.5 font-bold ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                          <input
                            type="text"
                            placeholder="Label (A.N. Musa Computer Lab)"
                            value={settings.hero_stat_3_label || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_3_label: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs mb-1.5 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                          <input
                            type="text"
                            placeholder="Subtitle (High-Speed Gigabit LAN)"
                            value={settings.hero_stat_3_sub || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_3_sub: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                        </div>

                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Stat 4 (e.g. Alumni Network)</span>
                          <input
                            type="text"
                            placeholder="Value (25k+)"
                            value={settings.hero_stat_4_val || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_4_val: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs mb-1.5 font-bold ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                          <input
                            type="text"
                            placeholder="Label (Global Alumni Network)"
                            value={settings.hero_stat_4_label || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_4_label: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs mb-1.5 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                          <input
                            type="text"
                            placeholder="Subtitle (Leaders in Medicine, Tech...)"
                            value={settings.hero_stat_4_sub || ''}
                            onChange={(e) => setSettings({ ...settings, hero_stat_4_sub: e.target.value })}
                            className={`w-full p-1.5 rounded-lg border text-xs ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Institutional Identity & Legal Details */}
                  <div className={`p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Institutional Identification & Affiliation
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Official School Name</label>
                        <input
                          type="text"
                          value={settings.school_name}
                          onChange={(e) => setSettings({ ...settings, school_name: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Short Brand Name</label>
                        <input
                          type="text"
                          value={settings.short_name}
                          onChange={(e) => setSettings({ ...settings, short_name: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Governing Trust</label>
                        <input
                          type="text"
                          value={settings.trust_name}
                          onChange={(e) => setSettings({ ...settings, trust_name: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Established Year</label>
                        <input
                          type="text"
                          value={settings.est_year}
                          onChange={(e) => setSettings({ ...settings, est_year: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">GSEB Center Index</label>
                        <input
                          type="text"
                          value={settings.gseb_center_code || '02.045 / 52.012'}
                          onChange={(e) => setSettings({ ...settings, gseb_center_code: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Academic Year</label>
                        <input
                          type="text"
                          value={settings.academic_year}
                          onChange={(e) => setSettings({ ...settings, academic_year: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div className="flex items-center gap-3 pt-5">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                          <input
                            type="checkbox"
                            checked={settings.admission_open}
                            onChange={(e) => setSettings({ ...settings, admission_open: e.target.checked })}
                            className="rounded w-4 h-4 text-amber-500 focus:ring-amber-500"
                          />
                          <span className={settings.admission_open ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                            Admissions Open for {settings.academic_year}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Contact & Campus Administration */}
                  <div className={`p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Office Hours, Timings & Campus Location
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Primary Phone</label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Alternate / Helpdesk Phone</label>
                        <input
                          type="text"
                          value={settings.alternate_phone || ''}
                          onChange={(e) => setSettings({ ...settings, alternate_phone: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Official Email</label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Administrative Office Hours</label>
                        <input
                          type="text"
                          value={settings.office_hours}
                          onChange={(e) => setSettings({ ...settings, office_hours: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Campus Physical Address</label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>
                  </div>

                  {/* Section 4: Leadership & Management Messages */}
                  <div className={`p-6 rounded-3xl border space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h3 className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Sarvoday Kelavani Mandal Leadership Message
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">President / Leadership Name</label>
                        <input
                          type="text"
                          value={settings.president_name}
                          onChange={(e) => setSettings({ ...settings, president_name: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Designation & Role</label>
                        <input
                          type="text"
                          value={settings.president_role}
                          onChange={(e) => setSettings({ ...settings, president_role: e.target.value })}
                          className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">President's Vision Quote (Highlighted)</label>
                      <textarea
                        rows={2}
                        value={settings.president_quote}
                        onChange={(e) => setSettings({ ...settings, president_quote: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border text-xs ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Full Management Statement</label>
                      <textarea
                        rows={5}
                        value={settings.president_message}
                        onChange={(e) => setSettings({ ...settings, president_message: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                      />
                    </div>

                    <button
                      onClick={async () => {
                        await api.updateAdminSettings(settings);
                        showNotification('School settings, Hero configuration, and leadership message saved successfully!');
                      }}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-amber-600 hover:bg-amber-700 transition-all cursor-pointer shadow-md"
                    >
                      Save Changes to Live Website
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 10: ADMIN USER ACCOUNTS */}
              {activeTab === 'users' && currentUser.role === 'super_admin' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold">Authorized Staff Accounts</h2>
                      <p className="text-xs text-slate-500">Manage Super Admins and Content Editors</p>
                    </div>
                  </div>

                  <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className={`border-b font-bold text-slate-500 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <th className="p-3.5">Name & Email</th>
                          <th className="p-3.5">Role</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {userList.map((u) => (
                          <tr key={u.id}>
                            <td className="p-3.5">
                              <span className="font-bold text-slate-900 dark:text-white block">{u.name}</span>
                              <span className="text-[11px] text-slate-400">{u.email}</span>
                            </td>
                            <td className="p-3.5 font-semibold capitalize text-amber-600 dark:text-amber-400">
                              {u.role.replace('_', ' ')}
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
                                Active
                              </span>
                            </td>
                            <td className="p-3.5 text-right">
                              {u.id !== currentUser.id && (
                                <button
                                  onClick={() => {
                                    setDeleteModal({
                                      isOpen: true,
                                      title: 'Remove Admin Account',
                                      itemName: `${u.name} (${u.email})`,
                                      itemType: 'Staff Account',
                                      onConfirm: async () => {
                                        await api.deleteUser(u.id);
                                        setUserList(prev => prev.filter(x => x.id !== u.id));
                                        showNotification('User account removed.');
                                      }
                                    });
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-rose-500"
                                  title="Remove staff account"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 11: AUDIT LOGS */}
              {activeTab === 'audit' && currentUser.role === 'super_admin' && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-bold">Activity Audit & Accountability Logs</h2>
                    <p className="text-xs text-slate-500">Immutable chronological record of administrative actions</p>
                  </div>

                  <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className={`border-b font-bold text-slate-500 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <th className="p-3.5">Timestamp</th>
                          <th className="p-3.5">User</th>
                          <th className="p-3.5">Module</th>
                          <th className="p-3.5">Action</th>
                          <th className="p-3.5">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {auditLogs.map((log) => (
                          <tr key={log.id}>
                            <td className="p-3.5 text-[11px] text-slate-400 whitespace-nowrap">
                              {new Date(log.created_at).toLocaleString()}
                            </td>
                            <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                              {log.user_name}
                            </td>
                            <td className="p-3.5 font-semibold text-amber-600 dark:text-amber-400">
                              {log.module}
                            </td>
                            <td className="p-3.5 font-mono text-[11px] font-bold">
                              {log.action}
                            </td>
                            <td className="p-3.5 text-slate-600 dark:text-slate-300">
                              {log.details}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* MODAL FOR CREATING / EDITING ANNOUNCEMENTS */}
      {modalType === 'announcement' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit Circular' : 'Create Official Announcement'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const ref_no = (form.elements.namedItem('ref_no') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                const summary = (form.elements.namedItem('summary') as HTMLTextAreaElement).value;
                const is_urgent = (form.elements.namedItem('is_urgent') as HTMLInputElement).checked;
                const is_pinned = (form.elements.namedItem('is_pinned') as HTMLInputElement).checked;

                if (editingItem) {
                  const updated = await api.updateAnnouncement(editingItem.id, {
                    title,
                    ref_no,
                    category,
                    summary,
                    is_urgent,
                    is_pinned
                  });
                  setAnnouncements(announcements.map(a => a.id === editingItem.id ? updated : a));
                  showNotification('Announcement updated.');
                } else {
                  const created = await api.createAnnouncement({
                    title,
                    ref_no,
                    category,
                    summary,
                    full_content: summary,
                    is_urgent,
                    is_pinned,
                    status: 'published'
                  });
                  setAnnouncements([created, ...announcements]);
                  showNotification('Announcement published to live website!');
                }
                setModalType(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingItem?.title || ''}
                  placeholder="e.g. GSEB Board Examination Registration 2026–27"
                  className={`w-full p-2.5 rounded-xl border font-medium ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Reference No.</label>
                  <input
                    name="ref_no"
                    defaultValue={editingItem?.ref_no || `SKM/CIR/2026/${Math.floor(100 + Math.random() * 900)}`}
                    className={`w-full p-2.5 rounded-xl border font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingItem?.category || 'Admissions'}
                    className={`w-full p-2.5 rounded-xl border font-medium ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Exams">Exams</option>
                    <option value="Circular">Circular</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Events">Events</option>
                    <option value="Holidays">Holidays</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Summary / Full Notice Text *</label>
                <textarea
                  name="summary"
                  required
                  rows={4}
                  defaultValue={editingItem?.summary || ''}
                  placeholder="Provide comprehensive details for students and parents..."
                  className={`w-full p-2.5 rounded-xl border font-medium ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-600 dark:text-amber-400">
                  <input type="checkbox" name="is_pinned" defaultChecked={editingItem?.is_pinned || false} className="rounded" />
                  Pin to Top of Notices
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-rose-500">
                  <input type="checkbox" name="is_urgent" defaultChecked={editingItem?.is_urgent || false} className="rounded" />
                  Mark as Urgent Alert
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Publish Circular'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR PREVIEWING ADMISSION ENQUIRY MESSAGE */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">Admission Inquiry Details</h3>
              <button onClick={() => setPreviewItem(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-500 block">Student Name</span>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{previewItem.student_name}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="font-bold text-slate-500 block">Parent Name</span>
                  <p>{previewItem.parent_name}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block">Contact Phone</span>
                  <p className="font-mono font-bold text-amber-600 dark:text-amber-400">{previewItem.mobile_number}</p>
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Applied Grade & Stream</span>
                <p>{previewItem.applied_class} • {previewItem.stream}</p>
              </div>
              {previewItem.previous_school && (
                <div>
                  <span className="font-bold text-slate-500 block">Previous School</span>
                  <p>{previewItem.previous_school}</p>
                </div>
              )}
              <div>
                <span className="font-bold text-slate-500 block">Parent Message / Note</span>
                <p className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 italic">
                  "{previewItem.message || 'No additional note submitted.'}"
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG (Works reliably in iframe and all web views) */}
      {deleteModal && deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${
            isDark ? 'bg-slate-900 border-rose-500/30 text-white' : 'bg-white border-rose-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-500">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {deleteModal.title || 'Confirm Deletion'}
                </h3>
                <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  {deleteModal.itemType}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
              Are you sure you want to permanently delete:
            </p>
            <div className={`p-3 rounded-xl border text-xs font-semibold mb-4 font-mono break-all ${
              isDark ? 'bg-slate-950 border-slate-800 text-amber-300' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              {deleteModal.itemName}
            </div>
            <p className="text-[11px] text-slate-400 mb-6">
              This action immediately updates the live public website and records an audit log.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                disabled={deleteModal.isDeleting}
                className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteModal.isDeleting}
                onClick={async () => {
                  try {
                    setDeleteModal(prev => prev ? { ...prev, isDeleting: true } : null);
                    await deleteModal.onConfirm();
                  } catch (err: any) {
                    showNotification(err.message || 'Failed to delete item', 'error');
                  } finally {
                    setDeleteModal(null);
                  }
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                {deleteModal.isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FOR ACADEMIC PROGRAMS & STREAMS */}
      {modalType === 'program' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit Academic Stream' : 'Add Academic Stream'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const subtitle = (form.elements.namedItem('subtitle') as HTMLInputElement).value;
                const badge = (form.elements.namedItem('badge') as HTMLInputElement).value;
                const grades = (form.elements.namedItem('grades') as HTMLInputElement).value;
                const icon = (form.elements.namedItem('icon') as HTMLSelectElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                const subjectsRaw = (form.elements.namedItem('subjects') as HTMLInputElement).value;
                const featuresRaw = (form.elements.namedItem('key_features') as HTMLInputElement).value;
                const careerRaw = (form.elements.namedItem('career_paths') as HTMLInputElement).value;
                const status = (form.elements.namedItem('status') as HTMLSelectElement).value as 'published' | 'draft';

                const subjects = subjectsRaw.split(',').map(s => s.trim()).filter(Boolean);
                const key_features = featuresRaw.split(',').map(s => s.trim()).filter(Boolean);
                const career_paths = careerRaw.split(',').map(s => s.trim()).filter(Boolean);

                try {
                  if (editingItem) {
                    const updated = await api.updateAdminProgram(editingItem.id, {
                      title, subtitle, badge, grades, icon, description, subjects, key_features, career_paths, status
                    });
                    setPrograms(programs.map(p => p.id === editingItem.id ? updated : p));
                    showNotification('Academic stream updated.');
                  } else {
                    const created = await api.createAdminProgram({
                      title, subtitle, badge, grades, icon, description, subjects, key_features, career_paths, status
                    });
                    setPrograms([...programs, created]);
                    showNotification('Academic stream added to website!');
                  }
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Stream Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingItem?.title || ''}
                  placeholder="e.g. Higher Secondary Science Stream"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Subtitle</label>
                  <input
                    name="subtitle"
                    defaultValue={editingItem?.subtitle || ''}
                    placeholder="e.g. GSEB Board A & B Groups"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Grades / Classes</label>
                  <input
                    name="grades"
                    defaultValue={editingItem?.grades || 'Class 11 & 12'}
                    placeholder="e.g. Class 11th & 12th"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Badge Tag</label>
                  <input
                    name="badge"
                    defaultValue={editingItem?.badge || 'Flagship STEM'}
                    placeholder="e.g. Flagship STEM"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Display Icon</label>
                  <select
                    name="icon"
                    defaultValue={editingItem?.icon || 'Atom'}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="Atom">Atom (Science)</option>
                    <option value="BookOpen">BookOpen (Secondary)</option>
                    <option value="Briefcase">Briefcase (Commerce)</option>
                    <option value="Users">Users (Arts)</option>
                    <option value="GraduationCap">GraduationCap (General)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingItem?.status || 'published'}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={editingItem?.description || ''}
                  placeholder="Comprehensive description of curriculum and academic focus..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Key Subjects (Comma Separated)</label>
                <input
                  name="subjects"
                  defaultValue={editingItem?.subjects?.join(', ') || 'Physics, Chemistry, Mathematics, Biology, Computer Studies, English'}
                  placeholder="Physics, Chemistry, Mathematics, English..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Highlights (Comma Separated)</label>
                  <input
                    name="key_features"
                    defaultValue={editingItem?.key_features?.join(', ') || 'Modern Science Labs, NEET/JEE Foundation, Smart Classrooms'}
                    placeholder="Lab practicals, Board coaching..."
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Career Pathways (Comma Separated)</label>
                  <input
                    name="career_paths"
                    defaultValue={editingItem?.career_paths?.join(', ') || 'Engineering, Medicine, Pharmacy, Research, IT'}
                    placeholder="Engineering, Medicine, IT..."
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save Stream Changes' : 'Publish Stream'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR CAMPUS FACILITIES */}
      {modalType === 'facility' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit Campus Facility' : 'Add Campus Facility'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const tag = (form.elements.namedItem('tag') as HTMLInputElement).value;
                const stats = (form.elements.namedItem('stats') as HTMLInputElement).value;
                const image_url = (form.elements.namedItem('image_url') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                const featuresRaw = (form.elements.namedItem('key_features') as HTMLInputElement).value;
                const status = (form.elements.namedItem('status') as HTMLSelectElement).value as 'published' | 'draft';
                const features = featuresRaw.split(',').map(s => s.trim()).filter(Boolean);

                try {
                  if (editingItem) {
                    const updated = await api.updateAdminFacility(editingItem.id, {
                      title, tag, stats, image_url, description, features, status
                    });
                    setFacilities(facilities.map(f => f.id === editingItem.id ? updated : f));
                    showNotification('Facility updated.');
                  } else {
                    const created = await api.createAdminFacility({
                      title, tag, stats, image_url, description, features, status
                    });
                    setFacilities([...facilities, created]);
                    showNotification('Facility added to website!');
                  }
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Facility Name *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingItem?.title || ''}
                  placeholder="e.g. A.N. Musa Computer Centre"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category / Tag</label>
                  <input
                    name="tag"
                    defaultValue={editingItem?.tag || 'Digital Learning'}
                    placeholder="e.g. Laboratories, Sports, Library"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Key Metric / Stats</label>
                  <input
                    name="stats"
                    defaultValue={editingItem?.stats || '80+ Intel PCs, Gigabit LAN'}
                    placeholder="e.g. 80+ PCs, 15,000+ Books"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Facility Image URL</label>
                <input
                  name="image_url"
                  defaultValue={editingItem?.image_url || ''}
                  placeholder="https://... or image asset URL"
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={editingItem?.description || ''}
                  placeholder="Provide comprehensive details about equipment, capacity, and student usage..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Key Features (Comma Separated)</label>
                <input
                  name="key_features"
                  defaultValue={editingItem?.key_features?.join(', ') || 'High-speed internet, Air-conditioned lab, Experienced faculty'}
                  placeholder="Feature 1, Feature 2, Feature 3..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={editingItem?.status || 'published'}
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save Facility' : 'Add Facility'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR HISTORICAL MILESTONES */}
      {modalType === 'milestone' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit History Milestone' : 'Add History Milestone'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const period = (form.elements.namedItem('period') as HTMLInputElement).value;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                const highlight = (form.elements.namedItem('highlight') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
                const sort_order = parseInt((form.elements.namedItem('sort_order') as HTMLInputElement).value, 10) || 0;

                try {
                  if (editingItem) {
                    const updated = await api.updateAdminMilestone(editingItem.id, {
                      period, title, category, highlight, description, sort_order
                    });
                    setMilestones(milestones.map(m => m.id === editingItem.id ? updated : m));
                    showNotification('Milestone updated.');
                  } else {
                    const created = await api.createAdminMilestone({
                      period, title, category, highlight, description, sort_order
                    });
                    setMilestones([...milestones, created]);
                    showNotification('Milestone added to legacy timeline!');
                  }
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Year / Period *</label>
                  <input
                    name="period"
                    required
                    defaultValue={editingItem?.period || '1956'}
                    placeholder="e.g. 1956 or 1982–1985"
                    className={`w-full p-2.5 rounded-xl border font-bold font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingItem?.category || 'founding'}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="founding">1956 Founding</option>
                    <option value="expansion">Campus Expansion</option>
                    <option value="stream">Academics & Science</option>
                    <option value="modernization">Digital & Modern</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Milestone Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingItem?.title || ''}
                  placeholder="e.g. Foundation of SKM High School, Kanodar"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Key Highlight Banner</label>
                <input
                  name="highlight"
                  defaultValue={editingItem?.highlight || ''}
                  placeholder="e.g. Land Donated by Visionary Community Elders"
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={editingItem?.description || ''}
                  placeholder="Historical context, beneficiaries, and institutional milestone story..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Chronological Sort Order</label>
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={editingItem?.sort_order ?? milestones.length + 1}
                  className={`w-full p-2.5 rounded-xl border font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save Milestone' : 'Add Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR FREQUENTLY ASKED QUESTIONS (FAQS) */}
      {modalType === 'faq' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit FAQ Question' : 'Add FAQ Question'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const question = (form.elements.namedItem('question') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                const answer = (form.elements.namedItem('answer') as HTMLTextAreaElement).value;
                const sort_order = parseInt((form.elements.namedItem('sort_order') as HTMLInputElement).value, 10) || 0;
                const status = (form.elements.namedItem('status') as HTMLSelectElement).value as 'published' | 'draft';

                try {
                  if (editingItem) {
                    const updated = await api.updateAdminFaq(editingItem.id, {
                      question, category, answer, sort_order, status
                    });
                    setFaqs(faqs.map(f => f.id === editingItem.id ? updated : f));
                    showNotification('FAQ updated.');
                  } else {
                    const created = await api.createAdminFaq({
                      question, category, answer, sort_order, status
                    });
                    setFaqs([...faqs, created]);
                    showNotification('FAQ published to live website!');
                  }
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Question *</label>
                <input
                  name="question"
                  required
                  defaultValue={editingItem?.question || ''}
                  placeholder="e.g. What streams are offered for Class 11 & 12?"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingItem?.category || 'admissions'}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="admissions">Admissions & Scholarships</option>
                    <option value="academics">Streams & Curriculum</option>
                    <option value="facilities">Campus & Facilities</option>
                    <option value="general">Timings & Administration</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingItem?.status || 'published'}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Verified Answer *</label>
                <textarea
                  name="answer"
                  required
                  rows={4}
                  defaultValue={editingItem?.answer || ''}
                  placeholder="Provide complete and clear explanation for parents and applicants..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Sort Order</label>
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={editingItem?.sort_order ?? faqs.length + 1}
                  className={`w-full p-2.5 rounded-xl border font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save FAQ' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR SCHOOL EVENTS */}
      {modalType === 'event' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit Event' : 'Add School Event'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLInputElement).value;
                const event_date = (form.elements.namedItem('event_date') as HTMLInputElement).value;
                const location = (form.elements.namedItem('location') as HTMLInputElement).value;
                const cover_image = (form.elements.namedItem('cover_image') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

                try {
                  if (editingItem) {
                    const updated = await api.updateEvent(editingItem.id, {
                      title, category, event_date, location, cover_image, description
                    });
                    setEvents(events.map(ev => ev.id === editingItem.id ? updated : ev));
                    showNotification('Event updated.');
                  } else {
                    const created = await api.createEvent({
                      title, category, event_date, location, cover_image, description, status: 'published'
                    });
                    setEvents([created, ...events]);
                    showNotification('Event added to school calendar!');
                  }
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Event Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingItem?.title || ''}
                  placeholder="e.g. 70th Annual Foundation Day & Science Fair"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category</label>
                  <input
                    name="category"
                    defaultValue={editingItem?.category || 'Foundation Day'}
                    placeholder="e.g. Academics, Sports, Cultural"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Date</label>
                  <input
                    name="event_date"
                    defaultValue={editingItem?.event_date || 'November 28, 2026'}
                    placeholder="e.g. November 28, 2026"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Location / Venue</label>
                  <input
                    name="location"
                    defaultValue={editingItem?.location || 'School Main Auditorium & Campus'}
                    placeholder="Auditorium, Grounds..."
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Cover Image URL</label>
                  <input
                    name="cover_image"
                    defaultValue={editingItem?.cover_image || ''}
                    placeholder="https://... cover image"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  defaultValue={editingItem?.description || ''}
                  placeholder="Details about program schedule, chief guests, and participant instructions..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR GALLERY PHOTO */}
      {modalType === 'gallery' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit Photo Details' : 'Upload Gallery Photo'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
                const image_url = (form.elements.namedItem('image_url') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

                try {
                  if (editingItem) {
                    const updated = await api.updateGalleryItem(editingItem.id, {
                      title, category, image_url, caption: description
                    });
                    setGallery(gallery.map(g => g.id === editingItem.id ? updated : g));
                    showNotification('Photo updated.');
                  } else {
                    const created = await api.createGalleryItem({
                      title, category, image_url, caption: description, status: 'published', sort_order: gallery.length + 1
                    });
                    setGallery([created, ...gallery]);
                    showNotification('Photo added to campus gallery!');
                  }
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Photo Caption / Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingItem?.title || ''}
                  placeholder="e.g. Senior Secondary Physics Practical"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category</label>
                  <select
                    name="category"
                    defaultValue={editingItem?.category || 'labs'}
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="campus">Campus & Grounds</option>
                    <option value="labs">Laboratories & Tech</option>
                    <option value="sports">Athletics & Sports</option>
                    <option value="events">Cultural Functions</option>
                    <option value="scouts">Scouts & Guides</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Image URL *</label>
                  <input
                    name="image_url"
                    required
                    defaultValue={editingItem?.image_url || ''}
                    placeholder="https://... image link"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Description / Notes</label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={editingItem?.description || ''}
                  placeholder="Optional context about the photo..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save Photo' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR FACULTY & STAFF */}
      {modalType === 'staff' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit Faculty Member' : 'Add Faculty Member'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const designation = (form.elements.namedItem('designation') as HTMLInputElement).value;
                const department = (form.elements.namedItem('department') as HTMLInputElement).value;
                const qualifications = (form.elements.namedItem('qualifications') as HTMLInputElement).value;
                const experience_years = (form.elements.namedItem('experience_years') as HTMLInputElement).value;
                const photo_url = (form.elements.namedItem('photo_url') as HTMLInputElement).value;

                try {
                  if (editingItem) {
                    const updated = await api.updateStaff(editingItem.id, {
                      name, designation, department, qualifications, experience_years, photo_url
                    });
                    setStaff(staff.map(s => s.id === editingItem.id ? updated : s));
                    window.dispatchEvent(new CustomEvent('skm_staff_updated'));
                    showNotification('Faculty member updated.');
                  } else {
                    const created = await api.createStaff({
                      name, designation, department, qualifications, experience_years, photo_url, role: 'secondary'
                    });
                    setStaff([...staff, created]);
                    window.dispatchEvent(new CustomEvent('skm_staff_updated'));
                    showNotification('Faculty member added to directory!');
                  }
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Full Name with Honorific *</label>
                <input
                  name="name"
                  required
                  defaultValue={editingItem?.name || ''}
                  placeholder="e.g. Dr. Rajesh K. Patel"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Designation *</label>
                  <input
                    name="designation"
                    required
                    defaultValue={editingItem?.designation || ''}
                    placeholder="e.g. Principal / Senior Teacher"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Department</label>
                  <input
                    name="department"
                    defaultValue={editingItem?.department || 'Sciences'}
                    placeholder="Sciences, Mathematics, Commerce..."
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Qualifications</label>
                  <input
                    name="qualifications"
                    defaultValue={editingItem?.qualifications || 'M.Sc., B.Ed.'}
                    placeholder="e.g. M.Sc. Physics, B.Ed."
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Teaching Experience</label>
                  <input
                    name="experience_years"
                    defaultValue={editingItem?.experience_years || '15+ Years'}
                    placeholder="e.g. 15+ Years"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Photo URL</label>
                <input
                  name="photo_url"
                  defaultValue={editingItem?.photo_url || ''}
                  placeholder="https://... portrait photo"
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save Faculty' : 'Add to Directory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR DOWNLOADABLE DOCUMENTS */}
      {modalType === 'document' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                Add Document / Circular PDF
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLInputElement).value;
                const file_name = (form.elements.namedItem('file_name') as HTMLInputElement).value;
                const file_size = (form.elements.namedItem('file_size') as HTMLInputElement).value;
                const file_url = (form.elements.namedItem('file_url') as HTMLInputElement).value;

                try {
                  const created = await api.createDocument({
                    title, category, file_name, file_size, file_url, status: 'published'
                  });
                  setDocuments([created, ...documents]);
                  showNotification('Document published to downloads portal!');
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Document Title *</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. GSEB Board Timetable 2026–27"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category</label>
                  <input
                    name="category"
                    defaultValue="Examinations"
                    placeholder="Admissions, Exams, Circulars"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">File Name</label>
                  <input
                    name="file_name"
                    defaultValue="timetable_gseb_2026.pdf"
                    className={`w-full p-2.5 rounded-xl border font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">File Size</label>
                  <input
                    name="file_size"
                    defaultValue="1.4 MB"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Download / URL</label>
                  <input
                    name="file_url"
                    defaultValue="#"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  Publish Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FOR ACHIEVEMENTS & BOARD HONORS */}
      {modalType === 'achievement' && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl my-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">
                {editingItem ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button onClick={() => setModalType(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                const category = (form.elements.namedItem('category') as HTMLInputElement).value;
                const year = (form.elements.namedItem('year') as HTMLInputElement).value;
                const awardee = (form.elements.namedItem('awardee') as HTMLInputElement).value;
                const rank_or_percentile = (form.elements.namedItem('rank_or_percentile') as HTMLInputElement).value;
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

                try {
                  if (editingItem) {
                    const updated = await api.updateAchievement(editingItem.id, {
                      title, category, year, awardee, rank_or_percentile, description
                    });
                    setAchievements(achievements.map(a => a.id === editingItem.id ? updated : a));
                    showNotification('Achievement updated.');
                  } else {
                    const created = await api.createAchievement({
                      title, category, year, awardee, rank_or_percentile, description, badge: 'Honors', metric: rank_or_percentile, status: 'published'
                    });
                    setAchievements([created, ...achievements]);
                    showNotification('Achievement added to honors showcase!');
                  }
                  api.getAdminStats().then(setStats).catch(() => {});
                  setModalType(null);
                } catch (err: any) {
                  showNotification(err.message || 'Operation failed', 'error');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-500 mb-1">Achievement Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingItem?.title || ''}
                  placeholder="e.g. GSEB Board 100% Passing Result"
                  className={`w-full p-2.5 rounded-xl border font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category</label>
                  <input
                    name="category"
                    defaultValue={editingItem?.category || 'Board Examination'}
                    placeholder="Academic, Science Fair, Sports..."
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Academic Year</label>
                  <input
                    name="year"
                    defaultValue={editingItem?.year || '2025–26'}
                    placeholder="e.g. 2025–26"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Awardee / Recipient</label>
                  <input
                    name="awardee"
                    defaultValue={editingItem?.awardee || ''}
                    placeholder="Student Name or Class Cohort"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Rank or Percentile</label>
                  <input
                    name="rank_or_percentile"
                    defaultValue={editingItem?.rank_or_percentile || ''}
                    placeholder="e.g. 99.8th PR, 1st District Rank"
                    className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  defaultValue={editingItem?.description || ''}
                  placeholder="Details of recognition, state award or medal..."
                  className={`w-full p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-amber-600 hover:bg-amber-700 font-bold shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  {editingItem ? 'Save Achievement' : 'Add Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
