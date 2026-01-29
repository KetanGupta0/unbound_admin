"use client";

import { useParams, useRouter } from "next/navigation";
import {
    User,
    Mail,
    Calendar,
    ChevronLeft,
    Award,
    BookOpen,
    Shield,
    Ban,
    CheckCircle2,
    XCircle,
    Clock,
    Activity,
    ShieldAlert,
    Camera,
    Upload,
    Settings,
    Save,
    Trash2,
    Search
} from "lucide-react";
import { students as allStudents, courses as allCourses } from "@/mock/db";
import { useState, useEffect } from "react";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import Modal from "@/components/Modal";

export default function StudentProfile() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const studentId = params.id as string;

    const [student, setStudent] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<any>(null);
    const [isGlobalBanModalOpen, setIsGlobalBanModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
    const [assignCourseId, setAssignCourseId] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [courseSearchTerm, setCourseSearchTerm] = useState("");
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);

    useEffect(() => {
        const foundStudent = allStudents.find(s => s.id === studentId);
        if (foundStudent) {
            setStudent(foundStudent);
            setEditForm({ ...foundStudent });
        }
    }, [studentId]);

    if (!student) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground mb-4">
                    <User size={32} />
                </div>
                <h2 className="text-xl font-bold text-foreground">Student Not Found</h2>
                <p className="text-muted-foreground mt-1">The student you are looking for does not exist or has been removed.</p>
                <Link href="/students" className="mt-6 flex items-center gap-2 text-primary font-bold hover:underline">
                    <ChevronLeft size={18} />
                    Back to Students
                </Link>
            </div>
        );
    }

    const handleToggleGlobalStatus = () => {
        const newStatus = student.status === "Active" ? "Banned" : "Active";
        setStudent({ ...student, status: newStatus });
        toast(`Student account ${newStatus === "Active" ? "activated" : "banned globally"}`, newStatus === "Active" ? "success" : "error");
        setIsGlobalBanModalOpen(false);
    };

    const handleToggleCourseStatus = (courseId: string) => {
        const updatedCourses = student.courses.map((c: any) => {
            if (c.id === courseId) {
                const newStatus = c.status === "Active" ? "Banned" : "Active";
                toast(`Student ${newStatus === "Active" ? "unbanned from" : "banned from"} ${c.title}`, "info");
                return { ...c, status: newStatus };
            }
            return c;
        });
        setStudent({ ...student, courses: updatedCourses });
    };

    const handleSaveProfile = () => {
        setStudent(editForm);
        setIsEditing(false);
        toast("Profile details updated successfully!", "success");
    };

    const handleAssignCourse = () => {
        if (!assignCourseId) return;

        // Check if already enrolled
        if (student.courses.find((c: any) => c.id === assignCourseId)) {
            toast("Student is already enrolled in this course", "info");
            return;
        }

        const courseData = allCourses.find(c => c.id === assignCourseId);
        if (!courseData) {
            toast("Course not found in database", "error");
            return;
        }

        const newCourse = {
            id: assignCourseId,
            title: courseData.title,
            status: "Active",
            progress: 0
        };

        setStudent({
            ...student,
            courses: [...student.courses, newCourse]
        });
        setIsAssignModalOpen(false);
        setAssignCourseId("");
        toast(`Assigned to ${newCourse.title} successfully`, "success");
    };

    const handlePasswordUpdate = () => {
        if (newPassword.length < 6) {
            toast("Password must be at least 6 characters", "error");
            return;
        }
        setStudent({ ...student, password: newPassword });
        setIsSecurityModalOpen(false);
        setNewPassword("");
        toast("Student password updated successfully", "success");
    };

    const handleRemoveCourse = (courseId: string) => {
        setStudent({
            ...student,
            courses: student.courses.filter((c: any) => c.id !== courseId)
        });
        toast("Course enrollment removed", "info");
    };

    const handleProfileImageUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result as string;
                setStudent({ ...student, avatar: imageData });
                toast("Profile picture updated successfully!", "success");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-soft font-bold text-sm"
                >
                    <ChevronLeft size={18} />
                    Back to List
                </button>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsGlobalBanModalOpen(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-soft shadow-sm border ${student.status === 'Active'
                            ? 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                            }`}
                    >
                        <ShieldAlert size={16} />
                        {student.status === 'Active' ? 'Global Ban' : 'Revoke Global Ban'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card & Quick Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-premium">
                        <div className="h-24 bg-gradient-to-r from-indigo-600 to-primary"></div>
                        <div className="px-6 pb-6">
                            <div className="relative -mt-12 mb-4">
                                <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-lg relative group">
                                    <div className="w-full h-full rounded-[20px] bg-indigo-50 flex items-center justify-center text-primary text-3xl font-black overflow-hidden">
                                        {student.avatar && typeof student.avatar === 'string' && student.avatar.length > 10 ? (
                                            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                        ) : (
                                            student.avatar || student.name[0]
                                        )}
                                    </div>
                                    <label
                                        htmlFor="profile-pic-update"
                                        className="absolute inset-1 rounded-[20px] bg-slate-900/60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-soft cursor-pointer backdrop-blur-[2px]"
                                    >
                                        <Camera size={20} />
                                        <span className="text-[8px] font-bold uppercase tracking-tighter mt-1">Update</span>
                                        <input
                                            id="profile-pic-update"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleProfileImageUpdate}
                                        />
                                    </label>
                                </div>
                                <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white ${student.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                                    }`}></div>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-foreground">{student.name}</h2>
                                <p className="text-sm font-medium text-muted-foreground">{student.email}</p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground font-bold uppercase tracking-wider">Student ID</span>
                                    <span className="font-mono font-bold text-foreground">{student.id}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground font-bold uppercase tracking-wider">Status</span>
                                    <span className={`px-2 py-0.5 rounded-lg font-bold ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                        }`}>{student.status}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground font-bold uppercase tracking-wider">Join Date</span>
                                    <span className="font-bold text-foreground">{student.joinDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Tiles */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-lg">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                                <BookOpen size={20} />
                            </div>
                            <p className="text-2xl font-black">{student.courses.length}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Enrollments</p>
                        </div>
                        <div className="bg-white rounded-3xl p-5 border border-border shadow-sm">
                            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-3">
                                <Award size={20} />
                            </div>
                            <p className="text-2xl font-black text-foreground">{student.certificates.length}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Certificates</p>
                        </div>
                    </div>

                    {/* Security Quick Actions */}
                    <div className="bg-white rounded-3xl p-6 border border-border shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-rose-600">
                            <Shield size={20} />
                            <h4 className="font-bold text-sm">Security & Access</h4>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                            Administrative override: Reset student credentials or manage platform-wide access levels.
                        </p>
                        <button
                            onClick={() => setIsSecurityModalOpen(true)}
                            className="w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-soft"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>

                {/* Right Column: Detailed Management */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Tabs / Section: Profile Details */}
                    <div className="bg-white rounded-3xl border border-border shadow-premium overflow-hidden">
                        <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl shadow-sm text-primary">
                                    <Settings size={20} />
                                </div>
                                <h3 className="font-bold text-foreground text-lg">Profile Management</h3>
                            </div>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-sm font-bold text-primary hover:underline"
                                >
                                    Edit Details
                                </button>
                            ) : (
                                <button
                                    onClick={handleSaveProfile}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition-soft"
                                >
                                    <Save size={16} />
                                    Save Changes
                                </button>
                            )}
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={isEditing ? editForm.name : student.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        disabled={!isEditing}
                                        value={isEditing ? editForm.email : student.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Courses & Progress */}
                    <div className="bg-white rounded-3xl border border-border shadow-premium overflow-hidden">
                        <div className="px-8 py-6 border-b border-border bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl shadow-sm text-primary">
                                    <BookOpen size={20} />
                                </div>
                                <h3 className="font-bold text-foreground text-lg">Enrolled Courses & Progress</h3>
                            </div>
                            <button
                                onClick={() => setIsAssignModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-xs font-bold hover:bg-secondary transition-soft shadow-sm"
                            >
                                <Activity size={16} />
                                Assign Course
                            </button>
                        </div>
                        <div className="divide-y divide-border">
                            {student.courses.length > 0 ? (
                                student.courses.map((course: any) => (
                                    <div key={course.id} className="p-8 hover:bg-slate-50/50 transition-soft group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-bold text-foreground">{course.title}</h4>
                                                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${course.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                                        }`}>
                                                        {course.status}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">{course.id}</p>
                                            </div>

                                            <div className="w-full md:w-48 space-y-2">
                                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                                    <span>Progress</span>
                                                    <span className="text-primary">{course.progress}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${course.progress === 100 ? 'bg-emerald-500' : 'bg-primary'
                                                            }`}
                                                        style={{ width: `${course.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleCourseStatus(course.id)}
                                                    className={`p-2.5 rounded-xl border transition-soft ${course.status === 'Active'
                                                        ? 'text-rose-500 bg-white border-border hover:bg-rose-50 hover:border-rose-100'
                                                        : 'text-emerald-500 bg-white border-border hover:bg-emerald-50 hover:border-emerald-100'
                                                        }`}
                                                    title={course.status === 'Active' ? 'Ban from Course' : 'Unban from Course'}
                                                >
                                                    {course.status === 'Active' ? <Ban size={18} /> : <CheckCircle2 size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveCourse(course.id)}
                                                    className="p-2.5 text-muted-foreground bg-white border border-border rounded-xl hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-soft"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-muted-foreground">
                                    <BookOpen size={48} className="mx-auto mb-4 opacity-10" />
                                    <p className="font-bold">No active enrollments found.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section: Certificates */}
                    <div className="bg-white rounded-3xl border border-border shadow-premium overflow-hidden">
                        <div className="px-8 py-6 border-b border-border bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl shadow-sm text-amber-600">
                                    <Award size={20} />
                                </div>
                                <h3 className="font-bold text-foreground text-lg">Achieved Certificates</h3>
                            </div>
                        </div>
                        <div className="p-8">
                            {student.certificates.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {student.certificates.map((cert: any) => (
                                        <div key={cert.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-center gap-4 group cursor-pointer hover:bg-amber-100 transition-soft">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-amber-600">
                                                <Award size={24} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-amber-900">{cert.title}</p>
                                                <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">Issued: {cert.issuedDate}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-muted-foreground">
                                    <p className="text-sm italic">No certificates achieved yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Ban Confirmation Modal */}
            <Modal
                isOpen={isGlobalBanModalOpen}
                onClose={() => setIsGlobalBanModalOpen(false)}
                title={student.status === 'Active' ? "Confirm Global Ban" : "Revoke Global Ban"}
                description={student.status === 'Active'
                    ? "The student will immediately lose access to the ALL courses and the entire platform."
                    : "The student's account access will be restored across the platform."}
                footer={
                    <>
                        <button onClick={() => setIsGlobalBanModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button
                            onClick={handleToggleGlobalStatus}
                            className={`px-6 py-2 rounded-xl text-sm font-bold shadow-md text-white ${student.status === 'Active' ? 'bg-destructive' : 'bg-emerald-600'}`}
                        >
                            {student.status === 'Active' ? 'Confirm Total Ban' : 'Confirm Restoration'}
                        </button>
                    </>
                }
            >
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/30">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                        <ShieldAlert className={student.status === 'Active' ? "text-rose-500" : "text-emerald-500"} size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {student.id}</p>
                    </div>
                </div>
            </Modal>

            {/* Assign Course Modal */}
            <Modal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                title="Assign New Course"
                description={`Select a course to enroll ${student.name} in.`}
                footer={
                    <>
                        <button onClick={() => setIsAssignModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button
                            onClick={handleAssignCourse}
                            className="px-6 py-2 rounded-xl text-sm font-bold shadow-md text-white bg-primary hover:bg-indigo-700"
                        >
                            Assign Course
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Select Course</label>

                        {/* Custom Searchable Dropdown */}
                        <div className="relative">
                            <div
                                onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold cursor-pointer flex items-center justify-between hover:bg-slate-100"
                            >
                                <span className={assignCourseId ? "text-foreground" : "text-muted-foreground"}>
                                    {assignCourseId
                                        ? allCourses.find(c => c.id === assignCourseId)?.title || "Choose a course..."
                                        : "Choose a course..."
                                    }
                                </span>
                                <ChevronLeft className={`transition-transform ${isCourseDropdownOpen ? '-rotate-90' : 'rotate-180'}`} size={16} />
                            </div>

                            {isCourseDropdownOpen && (
                                <>
                                    {/* Backdrop to close dropdown */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => {
                                            setIsCourseDropdownOpen(false);
                                            setCourseSearchTerm("");
                                        }}
                                    />

                                    <div className="absolute z-50 w-full mt-2 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        {/* Search Input */}
                                        <div className="p-3 border-b border-border bg-slate-50">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                                <input
                                                    type="text"
                                                    value={courseSearchTerm}
                                                    onChange={(e) => setCourseSearchTerm(e.target.value)}
                                                    placeholder="Search courses..."
                                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-medium"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </div>
                                        </div>

                                        {/* Course List */}
                                        <div className="max-h-64 overflow-y-auto">
                                            {allCourses
                                                .filter(c => c.status === "Published" || c.status === "Internal")
                                                .filter(c =>
                                                    c.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                                                    c.id.toLowerCase().includes(courseSearchTerm.toLowerCase())
                                                )
                                                .map(course => (
                                                    <div
                                                        key={course.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setAssignCourseId(course.id);
                                                            setIsCourseDropdownOpen(false);
                                                            setCourseSearchTerm("");
                                                        }}
                                                        className={`px-4 py-3 hover:bg-primary/5 cursor-pointer transition-soft border-b border-slate-100 last:border-b-0 ${assignCourseId === course.id ? 'bg-primary/10' : ''
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-sm font-bold text-foreground">{course.title}</p>
                                                                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
                                                                    {course.id} • {course.status}
                                                                </p>
                                                            </div>
                                                            {assignCourseId === course.id && (
                                                                <CheckCircle2 size={18} className="text-primary" />
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            {allCourses
                                                .filter(c => c.status === "Published" || c.status === "Internal")
                                                .filter(c =>
                                                    c.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
                                                    c.id.toLowerCase().includes(courseSearchTerm.toLowerCase())
                                                ).length === 0 && (
                                                    <div className="px-4 py-8 text-center text-muted-foreground">
                                                        <p className="text-sm font-medium">No courses found</p>
                                                        <p className="text-xs mt-1">Try a different search term</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Security Modal */}
            <Modal
                isOpen={isSecurityModalOpen}
                onClose={() => setIsSecurityModalOpen(false)}
                title="Administrative Password Reset"
                description="Set a new password for the student. This will immediately override their existing password."
                footer={
                    <>
                        <button onClick={() => setIsSecurityModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button
                            onClick={handlePasswordUpdate}
                            className="px-6 py-2 rounded-xl text-sm font-bold shadow-md text-white bg-rose-600 hover:bg-rose-700"
                        >
                            Update Password
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">New Password</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter secure password"
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground italic">Note: As an administrator, you do not need to provide the current password.</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
