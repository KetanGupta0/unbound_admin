"use client";

import { useState } from "react";
import {
    Briefcase,
    Users,
    Plus,
    Search,
    Filter,
    MoreVertical,
    MapPin,
    Clock,
    CheckCircle2,
    XCircle,
    FileText,
    Linkedin,
    Trash2,
    Edit3,
    Eye
} from "lucide-react";
import { jobs, applications } from "@/mock/careers";
import Modal from "@/components/Modal";
import RichTextEditor from "@/components/RichTextEditor";
import { useToast } from "@/components/Toast";

export default function CareersPage() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
    const [searchTerm, setSearchTerm] = useState("");
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);

    // New Job Form
    const [jobForm, setJobForm] = useState({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        tags: "",
        description: "" // HTML content
    });

    const handleSaveJob = () => {
        setIsJobModalOpen(false);
        toast("Job posted successfully!", "success");
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const colors: Record<string, string> = {
            'Active': 'bg-emerald-50 text-emerald-600',
            'Closed': 'bg-slate-50 text-slate-600',
            'Draft': 'bg-amber-50 text-amber-600',
            'New': 'bg-blue-50 text-blue-600',
            'Screening': 'bg-purple-50 text-purple-600',
            'Interview': 'bg-amber-50 text-amber-600',
            'Offer': 'bg-emerald-50 text-emerald-600',
            'Rejected': 'bg-rose-50 text-rose-600',
            'Hired': 'bg-indigo-50 text-indigo-600'
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${colors[status] || 'bg-slate-100'}`}>
                {status}
            </span>
        );
    };

    // Filter logic
    const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Group applications by status for Kanban-lite view or just list
    const filteredApps = applications.filter(a =>
        a.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Career Management</h1>
                    <p className="text-muted-foreground mt-1">Manage job openings and track applicant progress.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsJobModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md"
                    >
                        <Plus size={18} />
                        Post New Job
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
                <button
                    onClick={() => setActiveTab('jobs')}
                    className={`px-6 py-3 font-bold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'jobs'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Briefcase size={16} />
                    Job Postings
                </button>
                <button
                    onClick={() => setActiveTab('applications')}
                    className={`px-6 py-3 font-bold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'applications'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Users size={16} />
                    Applications
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px]">
                        {applications.length}
                    </span>
                </button>
            </div>

            {/* Content Area */}
            <div className="space-y-4">
                {/* Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder={activeTab === 'jobs' ? "Search jobs..." : "Search candidates..."}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* JOBS TAB */}
                {activeTab === 'jobs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredJobs.map(job => (
                            <div key={job.id} className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-all p-6 space-y-4 group">
                                <div className="flex justify-between items-start">
                                    <StatusBadge status={job.status} />
                                    <button className="text-muted-foreground hover:text-primary transition-colors">
                                        <OneClickActions />
                                    </button>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-foreground line-clamp-1">{job.title}</h3>
                                    <p className="text-sm text-muted-foreground">{job.department} • {job.type}</p>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        Posted {job.postedDate}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {job.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-secondary rounded-md text-[10px] font-bold text-muted-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-border flex justify-between items-center">
                                    <span className="text-xs font-bold text-primary cursor-pointer hover:underline">
                                        {applications.filter(a => a.jobId === job.id).length} applicants
                                    </span>
                                    <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                        <Edit3 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* APPLICATIONS TAB */}
                {activeTab === 'applications' && (
                    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Candidate</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Applied For</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-right">Resume</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredApps.map(app => (
                                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                                                        {app.candidateName.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-foreground">{app.candidateName}</p>
                                                        <p className="text-xs text-muted-foreground">{app.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium">{app.jobTitle}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={app.status} />
                                            </td>
                                            <td className="px-6 py-4 text-xs text-muted-foreground">{app.appliedDate}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-primary hover:underline text-sm font-bold flex items-center justify-end gap-1">
                                                    <FileText size={14} /> View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Job Modal */}
            <Modal
                isOpen={isJobModalOpen}
                onClose={() => setIsJobModalOpen(false)}
                title="Post New Job Opening"
                description="Create a new career opportunity."
                footer={
                    <button onClick={handleSaveJob} className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-all">
                        Publish Job
                    </button>
                }
            >
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Job Title</label>
                        <input
                            className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                            placeholder="e.g. Senior Product Manager"
                            value={jobForm.title}
                            onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Department</label>
                            <select
                                className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white text-sm"
                                value={jobForm.department}
                                onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                            >
                                <option value="">Select...</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Type</label>
                            <select
                                className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white text-sm"
                                value={jobForm.type}
                                onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Location</label>
                        <input
                            className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                            placeholder="e.g. Remote, San Francisco"
                            value={jobForm.location}
                            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                        />
                    </div>

                    <RichTextEditor
                        label="Job Description"
                        value={jobForm.description}
                        onChange={(val) => setJobForm({ ...jobForm, description: val })}
                        placeholder="Describe the role, responsibilities, and requirements..."
                    />
                </div>
            </Modal>
        </div>
    );
}

function OneClickActions() {
    return <MoreVertical size={20} />;
}
