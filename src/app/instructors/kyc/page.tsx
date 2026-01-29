"use client";

import { useState } from "react";
import {
    ChevronLeft,
    Search,
    Filter,
    FileText,
    ShieldCheck,
    XCircle,
    CheckCircle2,
    Eye,
    Download,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { instructors as initialInstructors } from "@/mock/db";
import { useToast } from "@/components/Toast";
import Modal from "@/components/Modal";

export default function KYCManagementPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Flatten instructor docs into a reviewable list
    const [kycRequests, setKycRequests] = useState(
        initialInstructors.flatMap(ins =>
            (ins.kyc?.documents || []).map(doc => ({
                id: ins.id + '-' + doc.name,
                instructorId: ins.id,
                instructorName: ins.name,
                email: ins.email,
                docType: doc.type,
                fileName: doc.name,
                url: doc.url,
                status: doc.status || 'Pending', // Default to pending if not set
                submittedDate: ins.joinDate // Proxy for submission date
            }))
        )
    );

    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const filteredRequests = kycRequests.filter(req => {
        const matchesSearch =
            req.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || req.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleApprove = (docId: string) => {
        setKycRequests(prev => prev.map(req =>
            req.id === docId ? { ...req, status: 'Verified' } : req
        ));
        toast("Document verified successfully.", "success");
        setPreviewModalOpen(false);
    };

    const handleReject = () => {
        if (!selectedDoc) return;
        setKycRequests(prev => prev.map(req =>
            req.id === selectedDoc.id ? { ...req, status: 'Rejected', remarks: rejectReason } : req
        ));
        toast("Document rejected.", "error");
        setRejectModalOpen(false);
        setPreviewModalOpen(false);
        setRejectReason("");
    };

    const openPreview = (doc: any) => {
        setSelectedDoc(doc);
        setPreviewModalOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/instructors" className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-muted-foreground" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">KYC Document Verification</h1>
                    <p className="text-muted-foreground">Review and approve instructor identity and qualification documents.</p>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Pending Review</p>
                        <p className="text-2xl font-bold">{kycRequests.filter(r => r.status === 'Pending').length}</p>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Verified Today</p>
                        <p className="text-2xl font-bold">12</p>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                        <XCircle size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Rejected</p>
                        <p className="text-2xl font-bold">{kycRequests.filter(r => r.status === 'Rejected').length}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search by instructor or email..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Pending', 'Verified', 'Rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${filterStatus === status
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white border border-border text-muted-foreground hover:bg-secondary'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-secondary/50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Document</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Instructor</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">Submitted</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredRequests.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                    No documents found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-50 text-primary rounded-lg">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-foreground">{req.docType}</p>
                                                <p className="text-xs text-muted-foreground">{req.fileName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-sm">{req.instructorName}</p>
                                            <p className="text-xs text-muted-foreground">{req.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${req.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                                                req.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                                                    'bg-amber-100 text-amber-700'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        {req.submittedDate}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => openPreview(req)}
                                            className="px-3 py-1.5 text-xs font-bold bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
                                        >
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Document Preview Modal */}
            <Modal
                isOpen={previewModalOpen}
                onClose={() => setPreviewModalOpen(false)}
                title="Document Preview"
                description={`Reviewing ${selectedDoc?.docType} for ${selectedDoc?.instructorName}`}
                footer={
                    selectedDoc?.status === 'Pending' ? (
                        <div className="flex gap-3 w-full justify-end">
                            <button
                                onClick={() => setRejectModalOpen(true)}
                                className="px-4 py-2 text-rose-600 font-bold hover:bg-rose-50 rounded-xl text-sm transition-colors"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleApprove(selectedDoc.id)}
                                className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-emerald-700 transition-colors"
                            >
                                Approve Document
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3 w-full justify-end">
                            <button
                                onClick={() => setPreviewModalOpen(false)}
                                className="px-4 py-2 text-muted-foreground font-bold hover:bg-secondary rounded-xl text-sm transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )
                }
            >
                {selectedDoc && (
                    <div className="space-y-4">
                        <div className="aspect-video bg-gray-100 rounded-xl border border-border flex flex-col items-center justify-center gap-3">
                            <FileText size={48} className="text-muted-foreground opacity-30" />
                            <p className="text-sm font-bold text-muted-foreground">Preview not available for mock files</p>
                            <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                                <Download size={12} /> Download {selectedDoc.fileName}
                            </a>
                        </div>

                        <div className="p-4 bg-secondary/30 rounded-xl space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Document Type:</span>
                                <span className="font-bold">{selectedDoc.docType}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Submitted By:</span>
                                <span className="font-bold">{selectedDoc.instructorName} ({selectedDoc.email})</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Submission Date:</span>
                                <span className="font-bold">{selectedDoc.submittedDate}</span>
                            </div>
                        </div>

                        {selectedDoc.status === 'Rejected' && (
                            <div className="p-4 bg-rose-50 text-rose-800 rounded-xl text-sm border border-rose-100">
                                <strong>Rejection Reason:</strong> {selectedDoc.remarks || "No reason provided."}
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* Rejection Reason Modal */}
            <Modal
                isOpen={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                title="Reject Document"
                description="Please provide a reason for rejecting this document."
                footer={
                    <div className="flex gap-3 w-full justify-end">
                        <button
                            onClick={() => setRejectModalOpen(false)}
                            className="px-4 py-2 text-muted-foreground font-bold hover:bg-secondary rounded-xl text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleReject}
                            className="px-6 py-2 bg-rose-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-rose-700 transition-colors"
                        >
                            Confirm Rejection
                        </button>
                    </div>
                }
            >
                <div className="space-y-4">
                    <textarea
                        className="w-full p-3 border border-border rounded-xl focus:ring-2 focus:ring-rose-200 outline-none min-h-[100px]"
                        placeholder="e.g., Image is blurry, Document expired..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
}
