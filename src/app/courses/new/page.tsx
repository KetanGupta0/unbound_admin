"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft,
    Save,
    Layout,
    Image as ImageIcon,
    FileText,
    List,
    Settings,
    Plus,
    Trash2,
    GripVertical,
    Video,
    Clock,
    DollarSign
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { categories, instructors as allInstructors } from "@/mock/db";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUpload from "@/components/ImageUpload";

export default function CreateCoursePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [activeSection, setActiveSection] = useState("basic");
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        level: "Beginner",
        language: "English",
        price: "",
        instructor: "",
        shortDescription: "",
        description: "",
        thumbnail: "",
        gallery: [] as string[],
        visibility: "Draft",
        curriculum: [
            { title: "Section 1: Introduction", lessons: [{ title: "Welcome to the Course", duration: "05:00", type: "Video" }] }
        ]
    });

    const handleSave = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        toast("Course created successfully!", "success");
        router.push("/courses");
    };

    const addSection = () => {
        setFormData({
            ...formData,
            curriculum: [...formData.curriculum, { title: `Section ${formData.curriculum.length + 1}: New Section`, lessons: [] }]
        });
    };

    const addLesson = (sectionIndex: number) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[sectionIndex].lessons.push({ title: "New Lesson", duration: "00:00", type: "Video" });
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const updateSectionTitle = (index: number, title: string) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[index].title = title;
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const updateLesson = (sectionIndex: number, lessonIndex: number, field: string, value: string) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[sectionIndex].lessons[lessonIndex] = {
            ...newCurriculum[sectionIndex].lessons[lessonIndex],
            [field]: value
        };
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const removeLesson = (sectionIndex: number, lessonIndex: number) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[sectionIndex].lessons.splice(lessonIndex, 1);
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const removeSection = (index: number) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum.splice(index, 1);
        setFormData({ ...formData, curriculum: newCurriculum });
    };

    const sections = [
        { id: "basic", label: "Basic Details", icon: Layout },
        { id: "media", label: "Media & Preview", icon: ImageIcon },
        { id: "content", label: "Course Content", icon: FileText },
        { id: "curriculum", label: "Curriculum", icon: List },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="flex h-[calc(100vh-2rem)] overflow-hidden space-x-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Sidebar Navigation */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-2">
                <Link href="/courses" className="flex items-center gap-2 text-muted-foreground hover:text-primary font-bold mb-4 transition-colors">
                    <ChevronLeft size={20} /> Back to Courses
                </Link>

                <div className="space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeSection === section.id
                                ? 'bg-white text-primary shadow-premium border border-primary/10'
                                : 'text-muted-foreground hover:bg-white/50 hover:text-foreground'
                                }`}
                        >
                            <section.icon size={18} />
                            {section.label}
                        </button>
                    ))}
                </div>

                <div className="mt-auto p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                    <p className="text-xs font-bold text-indigo-900 mb-1">Course Completion</p>
                    <div className="w-full bg-indigo-200 rounded-full h-2 mb-2">
                        <div className="bg-indigo-600 h-2 rounded-full w-[40%] transition-all duration-500"></div>
                    </div>
                    <p className="text-[10px] text-indigo-700">Almost there! Complete the curriculum section.</p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-3xl border border-border shadow-sm flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-8 py-5 border-b border-border flex justify-between items-center bg-white/50 backdrop-blur-xl z-10">
                    <div>
                        <h1 className="text-xl font-bold text-foreground">Create New Course</h1>
                        <p className="text-xs text-muted-foreground">Draft mode • Last saved 2 mins ago</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary rounded-xl transition-colors">
                            Save Draft
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all disabled:opacity-70"
                        >
                            {isLoading ? <span className="animate-spin text-xl">•</span> : <Save size={18} />}
                            Publish Course
                        </button>
                    </div>
                </div>

                {/* Scrollable Form */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">

                    {/* Basic Details */}
                    {activeSection === "basic" && (
                        <div className="max-w-3xl space-y-6 animate-in fade-in duration-300">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Course Title</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                    placeholder="e.g., The Complete 2024 Web Development Bootcamp"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Category</label>
                                    <select
                                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Level</label>
                                    <select
                                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Language</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                        placeholder="e.g. English"
                                        value={formData.language}
                                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Instructor</label>
                                    <select
                                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                        value={formData.instructor}
                                        onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                    >
                                        <option value="">Select Instructor</option>
                                        {allInstructors.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Media */}
                    {activeSection === "media" && (
                        <div className="max-w-3xl space-y-8 animate-in fade-in duration-300">
                            <ImageUpload
                                label="Course Thumbnail"
                                description="Upload a high-quality image (1280x720 recommended)."
                                maxFiles={1}
                            />
                            <div className="border-t border-border"></div>
                            <ImageUpload
                                label="Promotional Gallery"
                                description="Add up to 4 images to showcase ur course."
                                multiple
                                maxFiles={4}
                            />
                        </div>
                    )}

                    {/* Content */}
                    {activeSection === "content" && (
                        <div className="max-w-4xl space-y-6 animate-in fade-in duration-300">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Short Description</label>
                                <textarea
                                    className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none"
                                    placeholder="Brief summary of what students will learn..."
                                    value={formData.shortDescription}
                                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                />
                                <p className="text-xs text-muted-foreground text-right">{formData.shortDescription.length}/150 characters</p>
                            </div>

                            <RichTextEditor
                                label="Detailed Description"
                                placeholder="Explain the course content, requirements, and outcomes in detail..."
                                value={formData.description}
                                onChange={(val) => setFormData({ ...formData, description: val })}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Course Syllabus (PDF)</label>
                                <div className="border border-border border-dashed rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                                        <FileText size={24} className="text-primary" />
                                    </div>
                                    <p className="text-sm font-bold text-foreground">Click to upload syllabus</p>
                                    <p className="text-xs text-muted-foreground">PDF, DOCX up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Curriculum */}
                    {activeSection === "curriculum" && (
                        <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground">Structure your course into sections and lessons.</p>
                                <button
                                    onClick={addSection}
                                    className="px-4 py-2 bg-secondary text-foreground font-bold rounded-xl text-sm hover:bg-secondary/80 flex items-center gap-2"
                                >
                                    <Plus size={16} /> Add Section
                                </button>
                            </div>

                            <div className="space-y-6">
                                {formData.curriculum.map((section, sIdx) => (
                                    <div key={sIdx} className="border border-border rounded-2xl bg-slate-50 overflow-hidden">
                                        <div className="flex items-center gap-4 p-4 bg-slate-100 border-b border-border">
                                            <GripVertical size={20} className="text-muted-foreground cursor-move" />
                                            <input
                                                type="text"
                                                className="flex-1 bg-transparent font-bold text-foreground outline-none placeholder:text-muted-foreground"
                                                value={section.title}
                                                onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
                                                placeholder="Section Title"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => addLesson(sIdx)}
                                                    className="p-2 hover:bg-white rounded-lg text-primary transition-colors text-xs font-bold flex items-center gap-1"
                                                >
                                                    <Plus size={14} /> Lesson
                                                </button>
                                                <button
                                                    onClick={() => removeSection(sIdx)}
                                                    className="p-2 hover:bg-rose-100 rounded-lg text-rose-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 space-y-3">
                                            {section.lessons.map((lesson, lIdx) => (
                                                <div key={lIdx} className="flex items-center gap-4 p-3 bg-white border border-border rounded-xl shadow-sm">
                                                    <GripVertical size={16} className="text-muted-foreground/50" />
                                                    <div className="p-2 bg-indigo-50 text-primary rounded-lg">
                                                        <Video size={16} />
                                                    </div>
                                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                                        <input
                                                            type="text"
                                                            className="w-full text-sm font-medium outline-none"
                                                            placeholder="Lesson Title"
                                                            value={lesson.title}
                                                            onChange={(e) => updateLesson(sIdx, lIdx, 'title', e.target.value)}
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={14} className="text-muted-foreground" />
                                                            <input
                                                                type="text"
                                                                className="w-20 text-xs outline-none"
                                                                placeholder="00:00"
                                                                value={lesson.duration}
                                                                onChange={(e) => updateLesson(sIdx, lIdx, 'duration', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeLesson(sIdx, lIdx)}
                                                        className="text-muted-foreground hover:text-rose-500 transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {section.lessons.length === 0 && (
                                                <div className="text-center py-4 text-xs text-muted-foreground italic border-2 border-dashed border-border rounded-xl">
                                                    No lessons in this section yet.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Settings */}
                    {activeSection === "settings" && (
                        <div className="max-w-3xl space-y-6 animate-in fade-in duration-300">
                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <DollarSign size={20} className="text-primary" /> Pricing
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground">Regular Price ($)</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                            placeholder="99.99"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
                                <h3 className="text-lg font-bold">Visibility</h3>
                                <div className="flex gap-4">
                                    {['Draft', 'Private', 'Public'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => setFormData({ ...formData, visibility: status })}
                                            className={`flex-1 py-3 px-4 rounded-xl border font-bold text-sm transition-all ${formData.visibility === status
                                                ? 'bg-primary text-white border-primary shadow-md'
                                                : 'bg-white border-border text-muted-foreground hover:bg-secondary'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
