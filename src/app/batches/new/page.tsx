"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft,
    Save,
    Users,
    Calendar,
    Clock,
    CheckCircle2,
    BookOpen,
    UserSquare2,
    Search,
    Wand2
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { courses as allCourses, instructors as allInstructors, availableStudents } from "@/mock/db";

export default function CreateBatchPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [autoName, setAutoName] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        courseId: "",
        instructorId: "",
        startDate: "",
        days: [] as string[],
        time: "",
        selectedStudents: [] as string[]
    });

    const selectedCourse = allCourses.find(c => c.id === formData.courseId);

    // Auto-generate name logic
    useEffect(() => {
        if (autoName && selectedCourse && formData.startDate) {
            const date = new Date(formData.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            const timeStr = formData.time ? ` - ${formData.time}` : "";
            setFormData(prev => ({ ...prev, name: `${selectedCourse.title} - ${date}${timeStr}` }));
        }
    }, [autoName, formData.courseId, formData.startDate, formData.time, selectedCourse]);

    const handleDayToggle = (day: string) => {
        setFormData(prev => {
            const newDays = prev.days.includes(day)
                ? prev.days.filter(d => d !== day)
                : [...prev.days, day];
            return { ...prev, days: newDays };
        });
    };

    const handleStudentToggle = (studentId: string) => {
        setFormData(prev => {
            const isSelected = prev.selectedStudents.includes(studentId);
            return {
                ...prev,
                selectedStudents: isSelected
                    ? prev.selectedStudents.filter(id => id !== studentId)
                    : [...prev.selectedStudents, studentId]
            };
        });
    };

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toast("Batch created successfully!", "success");
        router.push("/batches");
    };

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const filteredStudents = availableStudents.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-2rem)] overflow-hidden space-x-6 animate-in fade-in duration-500">
            {/* Sidebar / Progress */}
            <div className="w-72 bg-white rounded-3xl border border-border shadow-sm flex flex-col p-6">
                <Link href="/batches" className="flex items-center gap-2 text-muted-foreground hover:text-primary font-bold mb-8 transition-colors">
                    <ChevronLeft size={20} /> Back to Batches
                </Link>

                <div className="space-y-8 relative">
                    {/* Connecting Line */}
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-secondary -z-10"></div>

                    <div className={`flex gap-4 relative ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 1 ? 'bg-primary text-white shadow-md' : 'bg-secondary text-muted-foreground'
                            }`}>1</div>
                        <div>
                            <p className="font-bold text-foreground">Batch Details</p>
                            <p className="text-xs text-muted-foreground mt-1">Course, Instructor & Schedule settings.</p>
                        </div>
                    </div>

                    <div className={`flex gap-4 relative ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 2 ? 'bg-primary text-white shadow-md' : 'bg-secondary text-muted-foreground'
                            }`}>2</div>
                        <div>
                            <p className="font-bold text-foreground">Student Selection</p>
                            <p className="text-xs text-muted-foreground mt-1">Add students from waiting list.</p>
                        </div>
                    </div>

                    <div className={`flex gap-4 relative ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= 3 ? 'bg-primary text-white shadow-md' : 'bg-secondary text-muted-foreground'
                            }`}>3</div>
                        <div>
                            <p className="font-bold text-foreground">Review & Launch</p>
                            <p className="text-xs text-muted-foreground mt-1">Final confirmation.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center gap-2 text-primary font-bold mb-2">
                        <Users size={18} />
                        <span className="text-sm">Summary</span>
                    </div>
                    <div className="space-y-2 text-xs text-indigo-900/80">
                        <div className="flex justific-between">
                            <span>Course:</span>
                            <span className="font-bold ml-auto truncate max-w-[120px]">{selectedCourse?.title || "-"}</span>
                        </div>
                        <div className="flex justific-between">
                            <span>Students:</span>
                            <span className="font-bold ml-auto">{formData.selectedStudents.length} selected</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-3xl border border-border shadow-sm flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">

                        {/* Step 1: Details */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-foreground">Configure Batch Details</h1>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground">Course</label>
                                        <div className="relative">
                                            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <select
                                                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white appearance-none"
                                                value={formData.courseId}
                                                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                            >
                                                <option value="">Select a Course...</option>
                                                {allCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground">Instructor</label>
                                        <div className="relative">
                                            <UserSquare2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <select
                                                className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white appearance-none"
                                                value={formData.instructorId}
                                                onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
                                            >
                                                <option value="">Assign Instructor...</option>
                                                {allInstructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-foreground">Batch Name</label>
                                        <button
                                            onClick={() => setAutoName(!autoName)}
                                            className={`text-xs flex items-center gap-1 font-bold transition-colors ${autoName ? 'text-primary' : 'text-muted-foreground'}`}
                                        >
                                            <Wand2 size={14} /> Auto-generate
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium ${autoName ? 'bg-secondary/50 text-muted-foreground border-transparent' : 'border-border'}`}
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({ ...formData, name: e.target.value });
                                            if (autoName) setAutoName(false);
                                        }}
                                        disabled={autoName}
                                        placeholder="e.g. Python Batch A - March 2024"
                                    />
                                </div>

                                <div className="p-6 bg-slate-50 rounded-2xl border border-border space-y-4">
                                    <h3 className="font-bold flex items-center gap-2"><Clock size={18} /> Schedule & Timing</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-muted-foreground uppercase">Start Date</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-muted-foreground uppercase">Time</label>
                                            <input
                                                type="time"
                                                className="w-full px-4 py-2 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                value={formData.time}
                                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-muted-foreground uppercase">Recurring Days</label>
                                        <div className="flex gap-2">
                                            {weekDays.map(day => (
                                                <button
                                                    key={day}
                                                    onClick={() => handleDayToggle(day)}
                                                    className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${formData.days.includes(day)
                                                            ? 'bg-primary text-white border-primary shadow-sm'
                                                            : 'bg-white text-muted-foreground border-border hover:bg-white hover:border-primary/50'
                                                        }`}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Students */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-foreground">Select Students</h1>
                                    <p className="text-muted-foreground mt-1">Choose students from the waiting list to enroll in this batch.</p>
                                </div>

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by name or email..."
                                        className="w-full pl-10 pr-4 py-3 bg-secondary/30 border border-transparent focus:bg-white focus:border-primary/20 rounded-xl focus:outline-none transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="border border-border rounded-2xl overflow-hidden bg-white">
                                    <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
                                        {filteredStudents.map(student => {
                                            const isSelected = formData.selectedStudents.includes(student.id);
                                            return (
                                                <div
                                                    key={student.id}
                                                    onClick={() => handleStudentToggle(student.id)}
                                                    className={`p-4 flex items-center gap-4 cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
                                                >
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'
                                                        }`}>
                                                        {isSelected && <CheckCircle2 size={12} />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-sm text-foreground">{student.name}</p>
                                                        <p className="text-xs text-muted-foreground">{student.email}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-[10px] font-bold uppercase text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                                                            {student.preferredCourse}
                                                        </span>
                                                        <p className="text-[10px] text-muted-foreground mt-1">Registered: {student.dateRegistered}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {filteredStudents.length === 0 && (
                                            <div className="p-8 text-center text-muted-foreground text-sm">
                                                No students found matching your search.
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-slate-50 border-t border-border flex justify-between items-center text-sm font-bold text-muted-foreground">
                                        <span>{formData.selectedStudents.length} selected</span>
                                        {formData.selectedStudents.length > 0 && <span className="text-primary hover:underline cursor-pointer" onClick={() => setFormData({ ...formData, selectedStudents: [] })}>Clear All</span>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-bold text-foreground">Review & Create</h1>

                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-white rounded-xl shadow-sm text-primary">
                                            <BookOpen size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground font-bold uppercase">Batch Name</p>
                                            <p className="text-xl font-bold text-foreground">{formData.name || "Untitled Batch"}</p>
                                            <p className="text-sm font-medium text-slate-600 mt-1">{selectedCourse?.title}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground font-bold uppercase">Instructor</p>
                                            <p className="font-bold text-foreground">
                                                {allInstructors.find(i => i.id === formData.instructorId)?.name || "Not Assigned"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-bold uppercase">Schedule</p>
                                            <p className="font-bold text-foreground">
                                                {formData.days.join(", ")} {formData.time && `@ ${formData.time}`}
                                            </p>
                                            <p className="text-xs text-slate-500">Starts {formData.startDate}</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-200 pt-4">
                                        <p className="text-xs text-muted-foreground font-bold uppercase mb-2">Enrolled Students ({formData.selectedStudents.length})</p>
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {formData.selectedStudents.slice(0, 5).map(id => (
                                                <div key={id} className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-700">
                                                    ST
                                                </div>
                                            ))}
                                            {formData.selectedStudents.length > 5 && (
                                                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                    +{formData.selectedStudents.length - 5}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-border bg-white flex justify-between items-center">
                    {step > 1 ? (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="px-6 py-3 font-bold text-muted-foreground hover:bg-secondary rounded-xl transition-colors"
                        >
                            Back
                        </button>
                    ) : <div></div>}

                    {step < 3 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
                        >
                            Next Step <ChevronLeft size={16} className="rotate-180" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <span className="animate-spin text-xl">•</span> : <CheckCircle2 size={18} />}
                            Create Batch
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
