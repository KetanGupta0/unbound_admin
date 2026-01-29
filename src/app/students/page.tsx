"use client";

import {
    Search,
    Filter,
    MoreVertical,
    UserPlus,
    Ban,
    CheckCircle2,
    XCircle,
    Mail,
    Calendar,
    Layers,
    Edit2,
    Trash2,
    ExternalLink,
    User
} from "lucide-react";
import { students as initialStudents } from "@/mock/db";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast";
import Link from "next/link";

export default function StudentManagement() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [students, setStudents] = useState(initialStudents);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleToggleAccountStatus = (id: string) => {
        setStudents(students.map(s => {
            if (s.id === id) {
                const newStatus = s.status === "Active" ? "Banned" : "Active";
                toast(`Student ${s.name} account ${newStatus === "Active" ? "unblocked" : "blocked"} successfully!`, "info");
                return { ...s, status: newStatus };
            }
            return s;
        }));
    };

    const handleToggleCourseStatus = (courseId: string) => {
        if (!selectedStudent) return;

        const updatedStudent = {
            ...selectedStudent,
            courses: selectedStudent.courses.map((c: any) => {
                if (c.id === courseId) {
                    const newStatus = c.status === "Active" ? "Banned" : "Active";
                    toast(`Student ${selectedStudent.name} ${newStatus === "Active" ? "unbanned" : "banned"} from ${c.title}`, "info");
                    return { ...c, status: newStatus };
                }
                return c;
            })
        };

        setStudents(students.map(s => s.id === selectedStudent.id ? updatedStudent : s));
        setSelectedStudent(updatedStudent);
    };

    const handleDeleteStudent = () => {
        if (selectedStudent) {
            setStudents(students.filter(s => s.id !== selectedStudent.id));
            setIsDeleteModalOpen(false);
            toast(`Student ${selectedStudent.name} deleted successfully!`, "error");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
                    <p className="text-muted-foreground mt-1">Manage enrollments, course-level bans, and account moderation.</p>
                </div>
                <Link
                    href="/students/new"
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md"
                >
                    <UserPlus size={18} />
                    Add Student
                </Link>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email or ID..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft shadow-sm text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft shadow-sm text-sm">
                    <Filter size={18} />
                    All Students
                </button>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-premium border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/50">
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Student</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Student ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Account Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Enrollments</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-secondary/30 transition-soft group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold text-sm shadow-sm ring-2 ring-white/50">
                                                {student.avatar}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-foreground">{student.name}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 font-medium">
                                                    <Mail size={12} className="opacity-70" /> {student.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-muted-foreground tracking-tight">{student.id}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                                            student.status === 'Banned' ? 'bg-rose-50 text-rose-700' :
                                                'bg-amber-50 text-amber-700'
                                            }`}>
                                            {student.status === 'Active' ? <CheckCircle2 size={12} /> :
                                                student.status === 'Banned' ? <XCircle size={12} /> :
                                                    <Ban size={12} />}
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => {
                                                setSelectedStudent(student);
                                                setIsEnrollmentModalOpen(true);
                                            }}
                                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-soft ${student.courses.length > 0
                                                ? 'bg-primary/5 text-primary hover:bg-primary/10'
                                                : 'bg-slate-50 text-slate-400'
                                                }`}
                                        >
                                            <Layers size={14} />
                                            {student.courses.length} {student.courses.length === 1 ? 'Course' : 'Courses'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                            <Calendar size={14} className="opacity-70" />
                                            {student.joinDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/students/${student.id}`}
                                                className="p-2 text-muted-foreground hover:text-primary hover:bg-white rounded-lg transition-soft shadow-sm border border-transparent hover:border-border"
                                                title="View Detailed Profile"
                                            >
                                                <User size={16} />
                                            </Link>
                                            <button
                                                className={`p-2 transition-soft rounded-lg ${student.status === 'Active' ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-600 hover:bg-emerald-50'} shadow-sm border border-transparent hover:border-border`}
                                                title={student.status === 'Active' ? 'Ban Account' : 'Unban Account'}
                                                onClick={() => handleToggleAccountStatus(student.id)}
                                            >
                                                <Ban size={16} />
                                            </button>
                                            <button
                                                className="p-2 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-soft shadow-sm border border-transparent hover:border-border"
                                                title="Delete Student"
                                                onClick={() => {
                                                    setSelectedStudent(student);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredStudents.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
                            <Search size={48} className="mb-4 opacity-20" />
                            <p className="font-semibold">No students found matching your search.</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-2 text-primary hover:underline font-bold text-sm"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 bg-secondary/30 border-t border-border flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-bold">Showing 1 to {filteredStudents.length} of {students.length} students</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-xl border border-border bg-white text-xs font-bold text-muted-foreground cursor-not-allowed uppercase tracking-wider">Previous</button>
                        <button className="px-4 py-2 rounded-xl border border-border bg-white text-xs font-bold text-foreground hover:bg-secondary transition-soft uppercase tracking-wider">Next</button>
                    </div>
                </div>
            </div>

            {/* Course Enrollment Modal */}
            <Modal
                isOpen={isEnrollmentModalOpen}
                onClose={() => setIsEnrollmentModalOpen(false)}
                title="Course Enrollments"
                description={`Manage individual course access for ${selectedStudent?.name}`}
                footer={
                    <button
                        onClick={() => setIsEnrollmentModalOpen(false)}
                        className="px-6 py-2 bg-secondary text-foreground rounded-xl text-sm font-bold hover:bg-slate-200 transition-soft"
                    >
                        Close Details
                    </button>
                }
            >
                {selectedStudent && (
                    <div className="space-y-4">
                        {selectedStudent.courses.length > 0 ? (
                            <div className="space-y-3">
                                {selectedStudent.courses.map((c: any) => (
                                    <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-soft">
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{c.title}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-0.5">{c.id}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase ${c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                                }`}>
                                                {c.status}
                                            </span>
                                            <button
                                                onClick={() => handleToggleCourseStatus(c.id)}
                                                className={`p-1.5 rounded-lg border border-transparent transition-soft ${c.status === 'Active'
                                                    ? 'text-rose-500 hover:bg-rose-100 hover:border-rose-200'
                                                    : 'text-emerald-500 hover:bg-emerald-100 hover:border-emerald-200'
                                                    }`}
                                                title={c.status === 'Active' ? 'Ban from Course' : 'Unban from Course'}
                                            >
                                                {c.status === 'Active' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-muted-foreground">
                                <Layers size={40} className="mb-3 opacity-20" />
                                <p className="text-sm font-bold">No active enrollments</p>
                                <p className="text-xs mt-1">This student has not joined any courses yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>


            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Student Account?"
                description="This will permanently remove the student and all their enrollment history."
                footer={
                    <>
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-soft"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteStudent}
                            className="px-6 py-2 bg-destructive text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-soft shadow-md"
                        >
                            Delete student
                        </button>
                    </>
                }
            >
                {selectedStudent && (
                    <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-800">
                        <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center font-bold text-sm">
                            {selectedStudent.avatar}
                        </div>
                        <div>
                            <p className="font-bold text-sm">{selectedStudent.name}</p>
                            <p className="text-xs opacity-80 font-medium">{selectedStudent.email}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
