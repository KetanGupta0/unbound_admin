"use client";

import { useParams, useRouter } from "next/navigation";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    BookOpen,
    Shield,
    ShieldCheck,
    AlertCircle,
    Ban,
    CheckCircle2,
    Clock,
    FileText,
    ChevronLeft,
    Briefcase,
    GraduationCap,
    LayoutGrid,
    Users,
    Edit2
} from "lucide-react";
import {
    instructors as allInstructors,
    courses as allCourses,
    batches as allBatches
} from "@/mock/db";
import { useState, useEffect } from "react";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import Modal from "@/components/Modal";

export default function InstructorProfilePage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const instructorId = params.id as string;

    const [instructor, setInstructor] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    useEffect(() => {
        const found = allInstructors.find(i => i.id === instructorId);
        if (found) {
            setInstructor(found);
        }
    }, [instructorId]);

    if (!instructor) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground mb-4">
                    <User size={32} />
                </div>
                <h2 className="text-xl font-bold text-foreground">Instructor Not Found</h2>
                <Link href="/instructors" className="mt-6 flex items-center gap-2 text-primary font-bold hover:underline">
                    <ChevronLeft size={18} /> Back to Instructors
                </Link>
            </div>
        );
    }

    // Derived Data
    const instructorCourses = allCourses.filter(c => c.instructor === instructor.name);
    const instructorBatches = allBatches.filter(b => b.instructor === instructor.name);

    // Handlers
    const toggleBlockStatus = () => {
        const newStatus = instructor.status === "Blocked" ? "Active" : "Blocked";
        setInstructor({ ...instructor, status: newStatus });
        toast(`Instructor ${newStatus === "Active" ? "unblocked" : "blocked"} successfully.`, newStatus === "Active" ? "success" : "error");
        setIsBlockModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header / Banner */}
            <div className="relative bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="px-8 pb-8 flex flex-col md:flex-row items-start md:items-end -mt-12 gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                        <div className="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl overflow-hidden">
                            {instructor.avatar && instructor.avatar.length > 2 ? (
                                <img src={instructor.avatar} alt={instructor.name} className="w-full h-full object-cover" />
                            ) : (
                                instructor.avatar
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-foreground">{instructor.name}</h1>
                            {instructor.kycStatus === 'Verified' && (
                                <div title="KYC Verified">
                                    <ShieldCheck size={20} className="text-emerald-500" />
                                </div>
                            )}
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2 mt-1">
                            <Mail size={14} /> {instructor.email}
                            <span className="text-border">|</span>
                            <Phone size={14} /> {instructor.mobile || "N/A"}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => toast("Edit functionality coming soon", "info")}
                            className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground font-bold rounded-xl text-sm transition-colors flex items-center gap-2"
                        >
                            <Edit2 size={16} /> Edit Profile
                        </button>
                        {instructor.status === 'Blocked' ? (
                            <button
                                onClick={() => setIsBlockModalOpen(true)}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-2 shadow-md"
                            >
                                <CheckCircle2 size={16} /> Unblock
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsBlockModalOpen(true)}
                                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-2 shadow-md"
                            >
                                <Ban size={16} /> Block
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-border overflow-x-auto">
                {['overview', 'classes', 'kyc'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">

                    {activeTab === 'overview' && (
                        <>
                            {/* Bio */}
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <User size={18} className="text-primary" /> About
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {instructor.bio || "No bio provided."}
                                </p>
                            </div>

                            {/* Qualifications */}
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <GraduationCap size={18} className="text-primary" /> Qualifications
                                </h3>
                                {instructor.qualifications && instructor.qualifications.length > 0 ? (
                                    <div className="space-y-4">
                                        {instructor.qualifications.map((q: any, i: number) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-secondary/30">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-border">
                                                    <span className="font-bold text-xs">{q.year}</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">{q.degree}</p>
                                                    <p className="text-sm text-muted-foreground">{q.university} • {q.status}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic">No qualifications listed.</p>
                                )}
                            </div>

                            {/* Experience */}
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Briefcase size={18} className="text-primary" /> Experience
                                </h3>
                                {instructor.experience && instructor.experience.length > 0 ? (
                                    <div className="space-y-4">
                                        {instructor.experience.map((e: any, i: number) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-secondary/30">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-border">
                                                    <Briefcase size={16} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">{e.role}</p>
                                                    <p className="text-sm text-muted-foreground">{e.company} • {e.duration}</p>
                                                    {e.description && (
                                                        <p className="text-xs text-muted-foreground mt-1">{e.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic">No experience listed.</p>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'classes' && (
                        <>
                            {/* Courses */}
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <BookOpen size={18} className="text-primary" /> Assigned Courses
                                </h3>
                                <div className="space-y-3">
                                    {instructorCourses.length > 0 ? instructorCourses.map(course => (
                                        <div key={course.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/20 transition-colors">
                                            <div>
                                                <p className="font-bold text-foreground">{course.title}</p>
                                                <p className="text-xs text-muted-foreground">{course.category} • {course.enrollments} Students</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-lg text-xs font-bold ${course.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {course.status}
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-muted-foreground italic">No courses assigned.</p>
                                    )}
                                </div>
                            </div>

                            {/* Batches */}
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-primary" /> Active Batches
                                </h3>
                                <div className="space-y-3">
                                    {instructorBatches.length > 0 ? instructorBatches.map(batch => (
                                        <div key={batch.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-secondary/20 transition-colors">
                                            <div>
                                                <p className="font-bold text-foreground">{batch.name}</p>
                                                <p className="text-xs text-muted-foreground">{batch.schedule} • {batch.students} Students</p>
                                            </div>
                                            <div className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700">
                                                {batch.status}
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-muted-foreground italic">No active batches.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'kyc' && (
                        <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Shield size={18} className="text-primary" /> Verification Status
                                </h3>
                                <div className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${instructor.kycStatus === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                                    instructor.kycStatus === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                                        'bg-amber-100 text-amber-700'
                                    }`}>
                                    {instructor.kycStatus === 'Verified' ? <ShieldCheck size={18} /> :
                                        instructor.kycStatus === 'Rejected' ? <AlertCircle size={18} /> :
                                            <Clock size={18} />}
                                    {instructor.kycStatus}
                                </div>
                            </div>

                            <div className="border-t border-border pt-6">
                                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Submitted Documents</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {instructor.kyc?.documents?.map((doc: any, i: number) => (
                                        <div key={i} className="p-4 border border-border rounded-xl flex items-center gap-3">
                                            <div className="p-2 bg-secondary rounded-lg text-muted-foreground">
                                                <FileText size={20} />
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-bold text-sm truncate">{doc.type}</p>
                                                <p className="text-xs text-muted-foreground truncate">{doc.name}</p>
                                            </div>
                                            <div className="text-xs font-bold text-emerald-600">
                                                {doc.status}
                                            </div>
                                        </div>
                                    ))}
                                    {(!instructor.kyc?.documents || instructor.kyc.documents.length === 0) && (
                                        <p className="text-muted-foreground col-span-2 text-center py-4">No documents uploaded.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Address Card */}
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Contact & Location</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <MapPin size={18} className="text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-sm">Address</p>
                                    {instructor.address ? (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {instructor.address.line1}<br />
                                            {instructor.address.city}, {instructor.address.state}<br />
                                            {instructor.address.country} - {instructor.address.pincode}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic">No address provided</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Calendar size={18} className="text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-sm">Date of Birth</p>
                                    <p className="text-sm text-muted-foreground mt-1">{instructor.dob || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Clock size={18} className="text-primary shrink-0" />
                                <div>
                                    <p className="font-bold text-sm">Joined Platform</p>
                                    <p className="text-sm text-muted-foreground mt-1">{instructor.joinDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Performance</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-secondary/30 rounded-xl text-center">
                                <p className="text-2xl font-bold text-primary">{instructorCourses.length}</p>
                                <p className="text-xs text-muted-foreground font-bold">Courses</p>
                            </div>
                            <div className="p-4 bg-secondary/30 rounded-xl text-center">
                                <p className="text-2xl font-bold text-primary">{instructorBatches.length}</p>
                                <p className="text-xs text-muted-foreground font-bold">Batches</p>
                            </div>
                            <div className="col-span-2 p-4 bg-secondary/30 rounded-xl text-center">
                                <p className="text-2xl font-bold text-emerald-600">4.8/5.0</p>
                                <p className="text-xs text-muted-foreground font-bold">Average Student Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Block Modal */}
            <Modal
                isOpen={isBlockModalOpen}
                onClose={() => setIsBlockModalOpen(false)}
                title={instructor.status === 'Blocked' ? "Unblock Instructor" : "Block Instructor"}
                description={instructor.status === 'Blocked'
                    ? "Restore access for this instructor? They will be able to log in and manage courses again."
                    : "Are you sure you want to block this instructor? They will immediately lose access to the platform."}
                footer={
                    <>
                        <button onClick={() => setIsBlockModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button
                            onClick={toggleBlockStatus}
                            className={`px-6 py-2 text-white rounded-xl text-sm font-bold shadow-md ${instructor.status === 'Blocked' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                                }`}
                        >
                            {instructor.status === 'Blocked' ? "Confirm Unblock" : "Confirm Block"}
                        </button>
                    </>
                }
            >
                <div className="p-4 bg-secondary/50 rounded-xl text-sm text-foreground">
                    <p><strong>Instructor:</strong> {instructor.name}</p>
                    <p><strong>Current Status:</strong> {instructor.status}</p>
                </div>
            </Modal>
        </div>
    );
}
