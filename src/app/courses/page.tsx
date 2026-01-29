"use client";

import {
    Plus,
    Search,
    Filter,
    Edit3,
    Eye,
    Archive,
    Globe,
    Lock,
    Tag,
    Users,
    X,
    Trash2,
    Settings,
    PlusCircle
} from "lucide-react";
import Link from "next/link";
import { courses as initialCourses, categories as initialCategories } from "@/mock/db";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast";

export default function CourseManagement() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [courses, setCourses] = useState(initialCourses);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [categories, setCategories] = useState(initialCategories);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCourse, setNewCourse] = useState({ title: "", instructor: "", category: "", price: "" });

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateCourse = (e: React.FormEvent) => {
        e.preventDefault();
        const course = {
            id: `C${Math.floor(Math.random() * 1000)}`,
            title: newCourse.title,
            instructor: newCourse.instructor,
            category: newCourse.category,
            status: "Draft",
            visibility: "Private",
            price: parseInt(newCourse.price) || 0,
            enrollments: 0,
            lastUpdated: new Date().toISOString().split('T')[0],
            level: "Beginner",
            language: "English",
            rating: 0,
            description: "",
            shortDescription: "",
            thumbnail: "",
            gallery: [],
            syllabus: "",
            curriculum: []
        };
        setCourses([course, ...courses]);
        setIsAddModalOpen(false);
        setNewCourse({ title: "", instructor: "", category: "", price: "" });
        toast(`Course "${course.title}" created as draft!`, "success");
    };

    const handleToggleVisibility = (id: string) => {
        setCourses(courses.map(c => {
            if (c.id === id) {
                const newVis = c.visibility === "Public" ? "Private" : "Public";
                toast(`Visibility for "${c.title}" set to ${newVis}`, "info");
                return { ...c, visibility: newVis };
            }
            return c;
        }));
    };

    const handleDeleteCourse = () => {
        if (selectedCourse) {
            setCourses(courses.filter(c => c.id !== selectedCourse.id));
            setIsDeleteModalOpen(false);
            toast(`Course "${selectedCourse.title}" deleted`, "error");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
                    <p className="text-muted-foreground mt-1">Create, edit, and control visibility of academic courses.</p>
                </div>
                <Link
                    href="/courses/new"
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md"
                >
                    <Plus size={18} />
                    Create New Course
                </Link>
            </div>

            {/* Stats Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Published</p>
                        <p className="text-xl font-bold">{courses.filter(c => c.status === 'Published').length}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <Globe size={20} />
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Drafts</p>
                        <p className="text-xl font-bold">{courses.filter(c => c.status === 'Draft').length}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                        <Edit3 size={20} />
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Archived</p>
                        <p className="text-xl font-bold">{courses.filter(c => c.status === 'Archived').length}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
                        <Archive size={20} />
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Enrollment</p>
                        <p className="text-xl font-bold">{courses.reduce((acc, c) => acc + (c.enrollments || 0), 0).toLocaleString()}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-indigo-50 text-primary">
                        <Users size={20} />
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search by course title or category..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft shadow-sm text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft shadow-sm"
                >
                    <Settings size={18} />
                    Manage Categories
                </button>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course: any) => (
                    <div key={course.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-premium hover:translate-y-[-4px] transition-soft group">
                        <div className="relative h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-slate-300 group-hover:scale-110 transition-soft">
                                    <Tag size={64} strokeWidth={1} />
                                </div>
                            )}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${course.status === 'Published' ? 'bg-emerald-500 text-white' :
                                    course.status === 'Draft' ? 'bg-amber-500 text-white' :
                                        'bg-slate-500 text-white'
                                    }`}>
                                    {course.status}
                                </span>
                                <button
                                    onClick={() => handleToggleVisibility(course.id)}
                                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 transition-soft hover:scale-105 ${course.visibility === 'Public' ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-white'
                                        }`}
                                >
                                    {course.visibility === 'Public' ? <Globe size={10} /> : <Lock size={10} />}
                                    {course.visibility}
                                </button>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{course.category}</span>
                                <div className="flex items-center gap-2">
                                    {course.level && (
                                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">{course.level}</span>
                                    )}
                                    {course.rating > 0 && (
                                        <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                                            ★ {course.rating}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <h3 className="font-bold text-foreground leading-snug h-12 overflow-hidden mb-4 group-hover:text-primary transition-soft">
                                {course.title}
                            </h3>

                            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Instructor</p>
                                    <p className="text-sm font-semibold truncate max-w-[120px]" title={course.instructor}>{course.instructor}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Price</p>
                                    <p className="text-sm font-bold text-foreground">${course.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users size={14} />
                                    <span className="text-xs font-bold">{course.enrollments?.toLocaleString() || 0}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toast(`Editing ${course.title}`, "info")}
                                        className="p-2 bg-secondary rounded-lg text-foreground hover:bg-slate-200 transition-soft"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedCourse(course);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        className="p-2 bg-rose-50 rounded-lg text-rose-600 hover:bg-rose-100 transition-soft"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create New Course Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Create New Course"
                description="Add a new academic course to the platform."
                footer={
                    <>
                        <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button onClick={handleCreateCourse} className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-md">Create Course</button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Course Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-border rounded-xl"
                            placeholder="e.g. Advanced Machine Learning"
                            value={newCourse.title}
                            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Category</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-border rounded-xl"
                                placeholder="Development"
                                value={newCourse.category}
                                onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Price ($)</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-border rounded-xl"
                                placeholder="99"
                                value={newCourse.price}
                                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Assign Instructor</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-border rounded-xl"
                            placeholder="Search instructor..."
                            value={newCourse.instructor}
                            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                        />
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Course?"
                description="Are you sure you want to remove this course and all its data? This cannot be undone."
                footer={
                    <>
                        <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button onClick={handleDeleteCourse} className="px-6 py-2 bg-destructive text-white rounded-xl text-sm font-bold shadow-md">Delete permanently</button>
                    </>
                }
            >
                {selectedCourse && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                        <p className="font-bold text-rose-900">{selectedCourse.title}</p>
                        <p className="text-xs text-rose-700 mt-1">Status: {selectedCourse.status} • Category: {selectedCourse.category}</p>
                    </div>
                )}
            </Modal>

            {/* Category Management Modal */}
            <Modal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                title="Manage Categories"
                description="Add or remove course categories."
                footer={
                    <button onClick={() => setIsCategoryModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Close</button>
                }
            >
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="New Category Name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                if (newCategoryName) {
                                    setCategories([...categories, newCategoryName]);
                                    setNewCategoryName("");
                                    toast("Category added", "success");
                                }
                            }}
                            className="p-2 bg-primary text-white rounded-xl"
                        >
                            <PlusCircle size={20} />
                        </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                        {categories.map((cat) => (
                            <div key={cat} className="flex justify-between items-center p-3 bg-secondary/30 rounded-xl">
                                <span className="font-bold text-sm">{cat}</span>
                                <button
                                    onClick={() => {
                                        setCategories(categories.filter(c => c !== cat));
                                        toast(`Category "${cat}" removed`, "error");
                                    }}
                                    className="text-muted-foreground hover:text-rose-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
