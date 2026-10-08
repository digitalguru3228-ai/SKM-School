import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Building,
  Navigation
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface ContactAndMapProps {
  theme?: 'light' | 'dark';
}

export const ContactAndMap: React.FC<ContactAndMapProps> = ({ theme = 'dark' }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 700);
  };

  const isDark = theme === 'dark';

  return (
    <section 
      id="contact" 
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-100/80 text-slate-900'
      }`}
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Location & Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Connect With Our Administration
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Conveniently situated on the main education corridor of Kanodar, Banaskantha District, Gujarat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Office Timings */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Contact Details Grid */}
            <div className={`p-6 rounded-3xl border shadow-xl space-y-5 ${
              isDark 
                ? 'bg-slate-900/90 border-amber-500/30 text-white' 
                : 'bg-white border-slate-200 text-slate-900 shadow-slate-900/5'
            }`}>
              <h3 className={`text-lg font-bold border-b pb-3 flex items-center gap-2 ${
                isDark ? 'border-slate-800 text-white' : 'border-slate-100 text-slate-900'
              }`}>
                <Building className="w-4 h-4 text-amber-500" />
                <span>Official Contact Information</span>
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 border ${
                  isDark ? 'bg-slate-800 text-amber-400 border-slate-700' : 'bg-amber-50 text-amber-600 border-amber-200'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Campus Address
                  </p>
                  <p className={`text-sm font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {SCHOOL_INFO.shortName}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{SCHOOL_INFO.plusCode}</p>
                  <p className="text-[11px] text-amber-600 dark:text-amber-400/90 font-mono mt-0.5">Plus Code: 39VX+33X Kanodar</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 border ${
                  isDark ? 'bg-slate-800 text-amber-400 border-slate-700' : 'bg-amber-50 text-amber-600 border-amber-200'
                }`}>
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Telephone Office
                  </p>
                  <a href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`} className={`text-sm font-bold hover:text-amber-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {SCHOOL_INFO.phone}
                  </a>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Alt: {SCHOOL_INFO.alternatePhone}</p>
                </div>
              </div>

              {/* Email & Web */}
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 border ${
                  isDark ? 'bg-slate-800 text-amber-400 border-slate-700' : 'bg-amber-50 text-amber-600 border-amber-200'
                }`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Email & Web Portal
                  </p>
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">{SCHOOL_INFO.email}</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{SCHOOL_INFO.website}</p>
                </div>
              </div>

              {/* Timings */}
              <div className={`flex items-start gap-3.5 pt-2 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 border ${
                  isDark ? 'bg-slate-800 text-amber-400 border-slate-700' : 'bg-amber-50 text-amber-600 border-amber-200'
                }`}>
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    School & Office Timings
                  </p>
                  <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {SCHOOL_INFO.officeHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Action Card */}
            <div className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
              isDark 
                ? 'bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/15 border-amber-500/30' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Visiting Kanodar Campus?
                </p>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Easy accessibility from Ahmedabad-Palanpur Highway.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=39VX+33X+Kanodar+Gujarat+385520"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors shrink-0 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Map & Quick Message */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Google Map Frame */}
            <div className="rounded-3xl overflow-hidden border border-amber-500/30 bg-slate-900 shadow-2xl relative aspect-[16/9] sm:aspect-[21/9]">
              <iframe
                title="SKM High School Kanodar Map"
                src="https://maps.google.com/maps?q=39VX%2B33X,%20Kanodar,%20Gujarat%20385520,%20India&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-amber-400 flex items-center gap-1.5 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>S K M High School, Kanodar</span>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className={`border rounded-3xl p-6 sm:p-8 shadow-xl text-left ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 text-white' 
                : 'bg-white border-slate-200 text-slate-900 shadow-slate-900/5'
            }`}>
              <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Send an Administrative Inquiry
              </h3>
              <p className={`text-xs mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Our administrative staff responds to parent and alumni inquiries within 24 business hours.
              </p>

              {isSent ? (
                <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-2 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Message Dispatched Successfully
                  </h4>
                  <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Thank you, {formState.name}. The school office has received your note and will contact you at {formState.phone}.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setFormState({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="mt-2 text-xs font-bold text-amber-500 hover:underline cursor-pointer"
                  >
                    Send Another Inquiry &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Salim Vahora"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark 
                            ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark 
                            ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark 
                            ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Inquiry Topic
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark 
                            ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-400' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500 focus:bg-white'
                        }`}
                      >
                        <option value="General Inquiry">General School Inquiry</option>
                        <option value="Admission Question">Admission 2026–27 Inquiry</option>
                        <option value="Scholarship Query">Scholarship & Fee Concession</option>
                        <option value="Board Verification">Board Marksheet / LC Verification</option>
                        <option value="Alumni Connection">Alumni Association & Visits</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Your Message / Question *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Please write your inquiry here..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none resize-none ${
                        isDark 
                          ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-400' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSending ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to School Office</span>
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
