"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit3,
    Trash2,
    Eye,
    Copy,
    FileText,
    Calendar,
    BarChart3
} from "lucide-react";
import { forms as initialForms } from "@/mock/forms";

export default function FormsPage() {
    const [forms, setForms] = useState(initialForms);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredForms = forms.filter(form =>
        form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Form Management</h1>
                    <p className="text-muted-foreground mt-1">Create and manage dynamic forms for registration, surveys, and more.</p>
                </div>
                <Link
                    href="/forms/builder"
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md"
                >
                    <Plus size={18} />
                    Create New Form
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Active Forms</p>
                        <p className="text-xl font-bold">{forms.filter(f => f.status === 'Active').length}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <FileText size={20} />
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Responses</p>
                        <p className="text-xl font-bold">{forms.reduce((acc, f) => acc + f.responses, 0)}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-indigo-50 text-primary">
                        <BarChart3 size={20} />
                    </div>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Drafts</p>
                        <p className="text-xl font-bold">{forms.filter(f => f.status === 'Draft').length}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                        <Edit3 size={20} />
                    </div>
                </div>
            </div>

            {/* Search and List */}
            <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search forms..."
                            className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-transparent focus:bg-white focus:border-primary/20 rounded-xl focus:outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-bold hover:bg-secondary transition-colors">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Form Title</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Responses</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Updated</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredForms.map((form) => (
                                <tr key={form.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-foreground text-sm">{form.title}</p>
                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{form.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-md bg-secondary text-foreground text-xs font-bold">
                                            {form.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${form.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                form.status === 'Draft' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    'bg-slate-50 text-slate-600 border-slate-100'
                                            }`}>
                                            {form.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: `${Math.min(form.responses, 100)}%` }} // Mock progress
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-foreground">{form.responses}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {form.updatedAt}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-indigo-50 text-primary rounded-lg transition-colors" title="View Responses">
                                                <BarChart3 size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors" title="Edit Form">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors" title="Preview">
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
