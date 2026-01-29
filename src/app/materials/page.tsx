"use client";

import { useState } from "react";
import {
    FileText,
    Video,
    Link as LinkIcon,
    Search,
    Filter,
    Plus,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Eye,
    Download,
    Trash2,
    Upload
} from "lucide-react";
import { materials, courses } from "@/mock/db";
import Modal from "@/components/Modal";
import FileUpload from "@/components/FileUpload";
import { useToast } from "@/components/Toast";

export default function MaterialsPage() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<'library' | 'approvals'>('library');
    const [searchTerm, setSearchTerm] = useState("");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Upload Form State
    const [uploadData, setUploadData] = useState({
        title: "",
        courseId: "",
        type: "PDF"
    });

    const filteredMaterials = materials.filter(m => {
        const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.course.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'library') {
            return matchesSearch && m.status === 'Published';
        } else {
            return matchesSearch && m.status === 'Pending';
        }
    });

    const handleUpload = () => {
        toast("Material uploaded successfully!", "success");
        setIsUploadModalOpen(false);
    };

    const handleApprove = (id: string) => {
        toast("Material approved and moved to library.", "success");
    };

    const handleReject = (id: string) => {
        toast("Material rejected.", "error");
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Study Materials</h1>
                    <p className="text-muted-foreground mt-1">Manage course resources and approve instructor uploads.</p>
                </div>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md"
                >
                    <Plus size={18} />
                    Upload Material
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
                <button
                    onClick={() => setActiveTab('library')}
                    className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${activeTab === 'library'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Library (Active)
                </button>
                <button
                    onClick={() => setActiveTab('approvals')}
                    className={`px-6 py-3 font-bold text-sm transition-all border-b-2 flex items-center gap-2 ${activeTab === 'approvals'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Approvals
                    {materials.filter(m => m.status === 'Pending').length > 0 && (
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px]">
                            {materials.filter(m => m.status === 'Pending').length}
                        </span>
                    )}
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title or course..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-bold hover:bg-secondary transition-colors">
                    <Filter size={16} /> Filter
                </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Material</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Course</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Uploaded By</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredMaterials.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl ${item.type === 'PDF' ? 'bg-rose-50 text-rose-600' :
                                                    item.type === 'Video' ? 'bg-indigo-50 text-indigo-600' :
                                                        'bg-emerald-50 text-emerald-600'
                                                }`}>
                                                {item.type === 'PDF' ? <FileText size={20} /> :
                                                    item.type === 'Video' ? <Video size={20} /> : <LinkIcon size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-foreground">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">{item.type} • {item.size}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-foreground">{item.course}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold">{item.uploadedBy}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-md uppercase font-bold ${item.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                                                }`}>{item.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {item.date}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {activeTab === 'approvals' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(item.id)}
                                                        className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(item.id)}
                                                        className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                                                        title="Reject"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="p-2 hover:bg-secondary text-foreground rounded-lg transition-colors" title="Download">
                                                        <Download size={18} />
                                                    </button>
                                                    <button className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredMaterials.length === 0 && (
                        <div className="p-12 text-center text-muted-foreground">
                            <p>No materials found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            <Modal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                title="Upload Study Material"
                description="Add new resources to the library."
                footer={
                    <button onClick={handleUpload} className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-all">
                        Upload Now
                    </button>
                }
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Material Title</label>
                        <input
                            className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                            placeholder="e.g. Advanced Data Science Guide"
                            value={uploadData.title}
                            onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Course</label>
                        <select
                            className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white text-sm"
                            value={uploadData.courseId}
                            onChange={(e) => setUploadData({ ...uploadData, courseId: e.target.value })}
                        >
                            <option value="">Select Course...</option>
                            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    </div>

                    <FileUpload label="File Attachment" accept=".pdf,.doc,.docx,.mp4" />
                </div>
            </Modal>
        </div>
    );
}
