import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  Building
} from 'lucide-react';

export const ApplyJobModal: React.FC = () => {
  const {
    isApplyModalOpen,
    setIsApplyModalOpen,
    jobToApply,
    currentUser,
    submitApplication,
    showToast
  } = useApp();

  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+977 98');
  const [coverNote, setCoverNote] = useState('');
  const [resumeName, setResumeName] = useState(currentUser?.resumeName || 'My_Verified_Resume_2026.pdf');
  const [resumeSize, setResumeSize] = useState('1.4 MB');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isApplyModalOpen || !jobToApply) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      setResumeSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      showToast(`Resume "${file.name}" uploaded and parsed!`, 'success');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResumeName(file.name);
      setResumeSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      showToast(`Resume "${file.name}" uploaded successfully!`, 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    if (!resumeName) {
      showToast('Please attach or upload your resume (PDF/DOCX).', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      submitApplication({
        jobId: jobToApply.id,
        jobTitle: jobToApply.title,
        company: jobToApply.company,
        companyLogo: jobToApply.companyLogo,
        applicantName: fullName,
        applicantEmail: email,
        applicantPhone: phone,
        resumeFileName: resumeName,
        resumeFileSize: resumeSize,
        coverNote
      });

      setIsSubmitting(false);
      setIsApplyModalOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={jobToApply.companyLogo}
              alt={jobToApply.company}
              className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
            />
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                Direct Application
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {jobToApply.title}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {jobToApply.company} • {jobToApply.location}
              </span>
            </div>
          </div>

          <button
            id="close-apply-modal-btn"
            onClick={() => setIsApplyModalOpen(false)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1">
          
          {/* Candidate Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              id="apply-fullname-input"
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. Aayush Maharjan"
              className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="apply-email-input"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="apply-phone-input"
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+977 98XXXXXXXX"
                className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Resume Upload Dropzone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Resume / CV (PDF or DOCX) <span className="text-red-500">*</span>
            </label>
            
            <div
              onDragOver={e => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`p-4 border-2 border-dashed rounded-2xl text-center transition cursor-pointer ${
                isDragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 hover:border-blue-400'
              }`}
            >
              <input
                type="file"
                id="apply-resume-file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="apply-resume-file" className="cursor-pointer block">
                <UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-800 dark:text-white block">
                  Click to choose file or drag & drop here
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  PDF, DOCX up to 10MB
                </span>
              </label>
            </div>

            {/* Attached file status banner */}
            {resumeName && (
              <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 truncate max-w-[240px]">
                    {resumeName}
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                    ({resumeSize})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="w-3 h-3" />
                  <span>ATS Ready (92%)</span>
                </div>
              </div>
            )}
          </div>

          {/* Cover Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Short Note to Hiring Manager (Optional)
            </label>
            <textarea
              id="apply-cover-note-input"
              rows={3}
              value={coverNote}
              onChange={e => setCoverNote(e.target.value)}
              placeholder="Highlight relevant past projects, availability date, or key strengths..."
              className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Profile will only be shared with verified recruiters at {jobToApply.company}.</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="submit-application-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Application...' : `Submit Application to ${jobToApply.company}`}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
