"use client";

import {
    Users,
    UserPlus,
    Search,
    Filter,
    BadgeCheck,
    Clock,
    XOctagon,
    ShieldCheck,
    Mail,
    Calendar,
    BookMarked,
    Edit2,
    ShieldAlert,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { instructors as initialInstructors } from "@/mock/db";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast";
import Link from "next/link";

export default function InstructorManagement() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [instructors, setInstructors] = useState(initialInstructors);
    const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState<any>(null);

    const filteredInstructors = instructors.filter(ins =>
        ins.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ins.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleKYCAction = (status: 'Verified' | 'Rejected') => {
        if (selectedInstructor) {
            setInstructors(instructors.map(i =>
                i.id === selectedInstructor.id ? { ...i, kycStatus: status, status: status === 'Verified' ? 'Active' : 'Blocked' } : i
            ));
            setIsKYCModalOpen(false);
            toast(`KYC for ${selectedInstructor.name} ${status.toLowerCase()} successfully!`, status === 'Verified' ? "success" : "error");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Instructor Management</h1>
                    <p className="text-muted-foreground mt-1">Onboard instructors, verify KYC status, and manage performance.</p>
                </div>
                <Link
                    href="/instructors/new"
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md"
                >
                    <UserPlus size={18} />
                    Create Instructor
                </Link>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded-2xl border border-border flex items-center gap-4 shadow-sm">
                    <div className="p-3 rounded-xl bg-indigo-50 text-primary">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Instructors</p>
                        <p className="text-xl font-bold">{instructors.length}</p>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border flex items-center gap-4 shadow-sm">
                    <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Pending KYC</p>
                        <p className="text-xl font-bold">{instructors.filter(i => i.kycStatus === 'Pending').length}</p>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border flex items-center gap-4 shadow-sm">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                        <BadgeCheck size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Verified Experts</p>
                        <p className="text-xl font-bold">{instructors.filter(i => i.kycStatus === 'Verified').length}</p>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search instructors by name or email..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft shadow-sm">
                    <Filter size={18} />
                    Filter KYC Status
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-premium border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/50">
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Instructor</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Account</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">KYC Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Courses</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredInstructors.map((ins) => (
                                <tr key={ins.id} className="hover:bg-secondary/30 transition-soft group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm overflow-hidden">
                                                {ins.avatar && ins.avatar.length > 2 ? (
                                                    <img src={ins.avatar} alt={ins.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    ins.avatar
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-foreground">{ins.name}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                    <Mail size={12} /> {ins.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${ins.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            ins.status === 'Blocked' ? 'bg-rose-100 text-rose-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                            {ins.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-sm font-medium">
                                            {ins.kycStatus === 'Verified' ? (
                                                <ShieldCheck size={16} className="text-emerald-500" />
                                            ) : ins.kycStatus === 'Rejected' ? (
                                                <XOctagon size={16} className="text-rose-500" />
                                            ) : (
                                                <Clock size={16} className="text-amber-500" />
                                            )}
                                            <span className={
                                                ins.kycStatus === 'Verified' ? 'text-emerald-700' :
                                                    ins.kycStatus === 'Rejected' ? 'text-rose-700' :
                                                        'text-amber-700'
                                            }>
                                                {ins.kycStatus}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                            <BookMarked size={14} className="text-muted-foreground" />
                                            {ins.courses} Courses
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Calendar size={14} />
                                            {ins.joinDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-soft">
                                            <button
                                                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-soft"
                                                onClick={() => {
                                                    setSelectedInstructor(ins);
                                                    setIsKYCModalOpen(true);
                                                }}
                                            >
                                                <ShieldAlert size={18} />
                                            </button>
                                            <Link
                                                href={`/instructors/${ins.id}`}
                                                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-soft"
                                                title="View/Edit Profile"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* KYC Review Modal */}
            <Modal
                isOpen={isKYCModalOpen}
                onClose={() => setIsKYCModalOpen(false)}
                title="Review KYC Documents"
                description="Verify identity documents and professional certifications."
                footer={
                    <>
                        <button
                            onClick={() => handleKYCAction('Rejected')}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-soft"
                        >
                            <XCircle size={18} /> Reject
                        </button>
                        <button
                            onClick={() => handleKYCAction('Verified')}
                            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md"
                        >
                            <CheckCircle2 size={18} /> Approve KYC
                        </button>
                    </>
                }
            >
                {selectedInstructor && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-2xl">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                                {selectedInstructor.avatar && selectedInstructor.avatar.length > 2 ? (
                                    <img src={selectedInstructor.avatar} alt={selectedInstructor.name} className="w-full h-full object-cover" />
                                ) : (
                                    selectedInstructor.avatar
                                )}
                            </div>
                            <div>
                                <p className="font-bold">{selectedInstructor.name}</p>
                                <p className="text-xs text-muted-foreground">{selectedInstructor.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Updated to check for dynamically added kyc docs if any, falling back to mock UI */}
                            {selectedInstructor.kyc && selectedInstructor.kyc.documents && selectedInstructor.kyc.documents.length > 0 ? (
                                selectedInstructor.kyc.documents.map((doc: any, index: number) => (
                                    <div key={index} className="p-3 border border-border rounded-xl bg-gray-50 aspect-video flex flex-col items-center justify-center gap-2">
                                        <ShieldCheck size={24} className="text-muted-foreground opacity-20" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center truncate w-full px-2">{doc.name || doc.type}</p>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="p-3 border border-border rounded-xl bg-gray-50 aspect-video flex flex-col items-center justify-center gap-2">
                                        <ShieldCheck size={24} className="text-muted-foreground opacity-20" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">Identity Proof.pdf</p>
                                    </div>
                                    <div className="p-3 border border-border rounded-xl bg-gray-50 aspect-video flex flex-col items-center justify-center gap-2">
                                        <BookMarked size={24} className="text-muted-foreground opacity-20" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-center">Certifications.zip</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
