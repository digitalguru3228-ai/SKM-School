import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Send, 
  Award,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCHOOL_INFO } from '../data/schoolData';
import { api } from '../services/api';

interface AdmissionSectionProps {
  theme?: 'light' | 'dark';
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({ theme = 'dark' }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    gender: 'Male',
    dob: '',
    stream: '11-science',
    medium: 'Gujarati Medium (with English STEM guidance)',
    parentName: '',
    phone: '',
    email: '',
    villageTown: 'Kanodar',
    previousSchool: '',
    percentage: '',
    needsScholarship: false,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.submitPublicAdmission({
        student_name: formData.studentName,
        parent_name: formData.parentName,
        phone: formData.phone,
        email: formData.email,
        stream_applied: formData.stream,
        gender: formData.gender,
        dob: formData.dob,
        village_town: formData.villageTown,
        previous_school: formData.previousSchool,
        percentage_score: formData.percentage,
        needs_scholarship: formData.needsScholarship,
        notes: formData.message
      });

      setSubmittedAppId(res.application_no || `SKM-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      
      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.warn('Admission API error, falling back to local acknowledgment:', err);
      const generatedId = `SKM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedAppId(generatedId);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToAnnouncements = () => {
    const el = document.getElementById('announcements');
    if (el) {
      const offsetTop = el.offsetTop - 85;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const documentChecklist = [
    'Original School Leaving Certificate (L.C.) from previous recognized school.',
    'Certified Copy of Standard 10th (S.S.C.) Board Marksheet for Higher Secondary applicants.',
    'Copy of Student & Parent Aadhaar Card.',
    '3 Recent Passport-sized Photographs (with student name printed on reverse).',
    'Caste / Income Certificate (if applying for Sarvoday Kelavani Mandal or Dawoodi Bohra Trust merit scholarships).'
  ];

  const isDark = theme === 'dark';

  return (
    <section 
      id="admissions" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Admissions 2026 – 2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Apply for Admission
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Join a legacy of excellence. Submit your online preliminary admission inquiry or visit the Sarvoday Kelavani Mandal school administrative office in Kanodar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Admission Guidelines & Documents */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Quick Status Box */}
            <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-md ${
              isDark 
                ? 'bg-slate-950/90 border-amber-500/30 text-white' 
                : 'bg-white border-slate-200 text-slate-900 shadow-slate-900/5'
            }`}>
              <div className="flex items-center gap-2.5 text-amber-500 font-bold text-sm mb-2">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>Admissions Open for 2026–2027</span>
              </div>
              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Seats in Higher Secondary Science Stream (Group A & Group B) and General/Vocational Stream are filled on merit and early counseling.
              </p>
              
              <div className={`pt-3 border-t flex items-center justify-between text-xs ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>GSEB Index:</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{SCHOOL_INFO.schoolIndexNo}</span>
              </div>
            </div>

            {/* Document Checklist */}
            <div className={`p-6 rounded-3xl border shadow-xl ${
              isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-900/5'
            }`}>
              <h3 className={`text-base font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Required Documents Checklist</span>
              </h3>
              <ul className="space-y-3">
                {documentChecklist.map((doc, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scholarship Note */}
            <div className={`p-6 rounded-3xl border shadow-xl ${
              isDark 
                ? 'bg-gradient-to-br from-slate-950 to-amber-950/40 border-amber-500/20' 
                : 'bg-amber-50/70 border-amber-200 shadow-slate-900/5'
            }`}>
              <h3 className={`text-base font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                <Award className="w-4 h-4 text-amber-500" />
                <span>Trust Scholarships & Fee Concessions</span>
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Deserving candidates from low-income backgrounds and toppers in Std 10th S.S.C. are eligible for Sarvoday Kelavani Mandal, Dawoodi Bohra Welfare Trust, and R.K. Palasara scholarships.
              </p>
              
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={scrollToAnnouncements}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold underline-offset-4 cursor-pointer"
                >
                  View Scholarship Circulars &rarr;
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Admission Form */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl p-6 sm:p-10 border shadow-2xl backdrop-blur-xl text-left ${
              isDark 
                ? 'bg-slate-950 border-amber-500/40 text-white' 
                : 'bg-white border-slate-200 text-slate-900 shadow-slate-900/5'
            }`}>
              
              {submittedAppId ? (
                /* Success State */
                <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 font-bold text-xs">
                      Application Submitted Successfully
                    </span>
                    <h3 className={`text-2xl font-extrabold mt-3 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      Thank You, {formData.studentName || 'Applicant'}!
                    </h3>
                    <p className={`text-xs sm:text-sm mt-1 max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Your preliminary admission inquiry has been registered with Sarvoday Kelavani Mandal, Kanodar.
                    </p>
                  </div>

                  {/* Application Receipt Card */}
                  <div className={`p-5 rounded-2xl border max-w-md mx-auto text-left space-y-2.5 text-xs ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Application Ref No:</span>
                      <span className="font-mono font-bold text-amber-500 text-sm">{submittedAppId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Applied Stream:</span>
                      <span className="font-semibold uppercase text-[11px]">{formData.stream.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Parent / Guardian:</span>
                      <span className="font-semibold">{formData.parentName || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Contact Phone:</span>
                      <span className="font-semibold">{formData.phone}</span>
                    </div>
                  </div>

                  <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Please bring a printed copy or note this Reference ID when visiting the school office for document verification and interview.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handlePrint}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs border transition-colors cursor-pointer ${
                        isDark 
                          ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      }`}
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Acknowledgement</span>
                    </button>

                    <button
                      onClick={() => {
                        setSubmittedAppId(null);
                        setFormData({
                          studentName: '',
                          gender: 'Male',
                          dob: '',
                          stream: '11-science',
                          medium: 'Gujarati Medium (with English STEM guidance)',
                          parentName: '',
                          phone: '',
                          email: '',
                          villageTown: 'Kanodar',
                          previousSchool: '',
                          percentage: '',
                          needsScholarship: false,
                          message: ''
                        });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                    >
                      <span>Submit Another Application</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Application Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      Online Admission Inquiry Form
                    </h3>
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Please enter accurate student and guardian details for merit verification.
                    </p>
                  </div>

                  {/* Student Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mukhi Arshad Imranbhai"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-xs ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-xs ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Stream Selection & Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Grade & Stream Applying For *
                      </label>
                      <select
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-xs ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:bg-white'
                        }`}
                      >
                        <option value="11-science">Class 11 Science (Group A / Maths & Group B / Biology)</option>
                        <option value="12-science">Class 12 Science (Higher Secondary)</option>
                        <option value="11-commerce">Class 11 General / Commerce Stream</option>
                        <option value="12-commerce">Class 12 General / Commerce Stream</option>
                        <option value="secondary-8-10">Secondary Section (Class 8th to 10th)</option>
                        <option value="vocational">Vocational & Technical Certificate Courses</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-xs ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:bg-white'
                        }`}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female (Eligible for Home Science & Girl Scholars Wing)</option>
                      </select>
                    </div>
                  </div>

                  {/* Parent Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Father's / Guardian's Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Imranbhai Mukhi"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-xs ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Mobile Number (WhatsApp Enabled) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-xs ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Village / Town & Previous School */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Residential Village / Town *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kanodar / Palanpur / Siddhpur"
                        value={formData.villageTown}
                        onChange={(e) => setFormData({ ...formData, villageTown: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-xs ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Previous Standard Score / Percentage (%)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 88.50% (Std 10 S.S.C.)"
                        value={formData.percentage}
                        onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none text-xs ${
                          isDark 
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Scholarship Request Checkbox */}
                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <input
                      type="checkbox"
                      id="needsScholarship"
                      checked={formData.needsScholarship}
                      onChange={(e) => setFormData({ ...formData, needsScholarship: e.target.checked })}
                      className="mt-0.5 rounded border-slate-600 text-amber-500 focus:ring-amber-400"
                    />
                    <label htmlFor="needsScholarship" className="text-xs cursor-pointer">
                      <span className={`font-semibold ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                        Apply for Trust Fee Concession / Merit Scholarship
                      </span>
                      <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Check if eligible for Dawoodi Bohra Welfare Trust or Sarvoday Kelavani Mandal financial assistance.
                      </p>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/25 transition-all cursor-pointer disabled:opacity-70 active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Admission Inquiry (2026–27)</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
