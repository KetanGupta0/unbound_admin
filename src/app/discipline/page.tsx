"use client";

import {
    ShieldAlert,
    Search,
    Filter,
    FileText,
    CheckCircle2,
    XCircle,
    Clock,
    AlertTriangle,
    UserX,
    History,
    Info,
    Gavel
} from "lucide-react";
import { disciplineRequests as initialRequests } from "@/mock/db";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast";

export default function DisciplineSystem() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [requests, setRequests] = useState(initialRequests);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [selectedReq, setSelectedReq] = useState<any>(null);
    const [actionType, setActionType] = useState<'Approve' | 'Reject' | null>(null);

    const filteredRequests = requests.filter(req =>
        req.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProcessRequest = () => {
        if (selectedReq && actionType) {
            setRequests(requests.map(r =>
                r.id === selectedReq.id ? { ...r, status: actionType === 'Approve' ? 'Approved' : 'Rejected' } : r
            ));
            setIsActionModalOpen(false);
            toast(
                actionType === 'Approve'
                    ? `Student ${selectedReq.student} has been banned from ${selectedReq.course}`
                    : `Disciplinary request for ${selectedReq.student} rejected`,
                actionType === 'Approve' ? "error" : "success"
            );
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <ShieldAlert className="text-rose-500" />
                        Course Discipline System
                    </h1>
                    <p className="text-muted-foreground mt-1">Review instructor requests to ban students from specific courses for misconduct.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-secondary text-foreground border border-border px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-slate-200">
                    <History size={18} />
                    View History
                </button>
            </div>

            {/* Info Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-700 h-fit">
                    <Info size={20} />
                </div>
                <div className="space-y-1">
                    <h4 className="font-bold text-sm text-amber-900">Important Policy</h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                        Course bans are <span className="font-bold underline">not account deletions</span>. The student will lose access to the specific course, materials, and certificates, but their account remains active for other enrollments.
                    </p>
                </div>
            </div>

            {/* Control Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search by student name or course..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft text-sm shadow-sm">
                    <Filter size={18} />
                    All Requests
                </button>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-2xl shadow-premium border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/50">
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Student / Course</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Reason & Evidence</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Instructor</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-secondary/30 transition-soft">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-sm text-foreground">{req.student}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">ID: {req.studentId}</p>
                                        <div className="mt-1.5 px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600 inline-block">
                                            {req.course}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-sm">
                                        <p className="text-xs text-foreground font-medium line-clamp-2">{req.reason}</p>
                                        <button
                                            onClick={() => toast("Opening evidence documents...", "info")}
                                            className="mt-2 flex items-center gap-1.5 text-primary text-[10px] font-bold uppercase cursor-pointer hover:underline"
                                        >
                                            <FileText size={12} /> View Evidence
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold">{req.instructor}</p>
                                        <p className="text-[10px] text-muted-foreground">{req.submittedDate}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${req.status === 'Approved' ? 'bg-rose-100 text-rose-700' :
                                            req.status === 'Rejected' ? 'bg-emerald-100 text-emerald-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                            {req.status === 'Approved' ? <XCircle size={12} /> :
                                                req.status === 'Rejected' ? <CheckCircle2 size={12} /> :
                                                    <Clock size={12} />}
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {req.status === 'Pending' ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedReq(req);
                                                        setActionType('Reject');
                                                        setIsActionModalOpen(true);
                                                    }}
                                                    className="p-2 border border-border rounded-lg text-emerald-600 hover:bg-emerald-50 transition-soft"
                                                    title="Reject Request"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedReq(req);
                                                        setActionType('Approve');
                                                        setIsActionModalOpen(true);
                                                    }}
                                                    className="px-4 py-2 bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600 transition-soft flex items-center gap-2 shadow-sm"
                                                >
                                                    <UserX size={14} />
                                                    Approve Ban
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="text-muted-foreground hover:text-foreground transition-soft">
                                                <AlertTriangle size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Discipline Action Modal */}
            <Modal
                isOpen={isActionModalOpen}
                onClose={() => setIsActionModalOpen(false)}
                title={actionType === 'Approve' ? "Confirm Course Ban" : "Confirm Rejection"}
                description={actionType === 'Approve'
                    ? "The student will be immediately removed from the course and notified."
                    : "The disciplinary request will be dismissed and the student will not be affected."}
                footer={
                    <>
                        <button onClick={() => setIsActionModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button
                            onClick={handleProcessRequest}
                            className={`px-6 py-2 rounded-xl text-sm font-bold shadow-md text-white ${actionType === 'Approve' ? 'bg-destructive' : 'bg-emerald-600'}`}
                        >
                            {actionType === 'Approve' ? 'Confirm Ban' : 'Confirm Rejection'}
                        </button>
                    </>
                }
            >
                {selectedReq && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                                <Gavel className={actionType === 'Approve' ? "text-rose-500" : "text-emerald-500"} size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-foreground">{selectedReq.student}</p>
                                <p className="text-xs text-muted-foreground">Course: {selectedReq.course}</p>
                            </div>
                        </div>
                        <div className="p-4 border border-border rounded-xl bg-gray-50">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Reason for Action</p>
                            <p className="text-xs text-foreground italic">"{selectedReq.reason}"</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
