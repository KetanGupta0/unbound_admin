"use client";

import {
    Users,
    Search,
    Filter,
    Calendar,
    Clock,
    UserPlus,
    MoreVertical,
    MessageCircle,
    CheckCircle2,
    PlayCircle,
    Archive
} from "lucide-react";
import Link from "next/link";
import { batches } from "@/mock/db";
import { useState } from "react";

export default function BatchManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBatches = batches.filter(batch =>
        batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Batch Management</h1>
                    <p className="text-muted-foreground mt-1">Assign students and instructors to batches, manage schedules.</p>
                </div>
                <Link
                    href="/batches/new"
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md"
                >
                    <UserPlus size={18} />
                    Create New Batch
                </Link>
            </div>

            {/* Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search batches by name or course..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft text-sm">
                        <Filter size={18} />
                        Filter Status
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft text-sm">
                        <Calendar size={18} />
                        Calendar View
                    </button>
                </div>
            </div>

            {/* Batch Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBatches.map((batch) => (
                    <div key={batch.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-premium transition-soft hover:border-primary/30">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl ${batch.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                                        batch.status === 'Starting Soon' ? 'bg-amber-50 text-amber-600' :
                                            'bg-slate-50 text-slate-600'
                                        }`}>
                                        {batch.status === 'Active' ? <PlayCircle size={24} /> :
                                            batch.status === 'Starting Soon' ? <Clock size={24} /> :
                                                <CheckCircle2 size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{batch.name}</h3>
                                        <p className="text-xs text-primary font-bold uppercase tracking-wider">{batch.course}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-soft">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Instructor</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold">
                                            {batch.instructor.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-medium">{batch.instructor}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Students</p>
                                    <div className="flex items-center gap-1.5 font-bold text-sm">
                                        <Users size={14} className="text-muted-foreground" />
                                        {batch.students} <span className="text-muted-foreground font-normal">/ 50 Max</span>
                                    </div>
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Schedule</p>
                                    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                        <Calendar size={14} className="text-muted-foreground" />
                                        {batch.schedule}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-border">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-secondary text-foreground py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-soft">
                                    <Users size={16} />
                                    Manage Students
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary py-2 rounded-xl text-sm font-bold hover:bg-primary/20 transition-soft">
                                    <MessageCircle size={16} />
                                    View Chat
                                </button>
                            </div>
                        </div>
                        <div className={`h-1.5 w-full ${batch.status === 'Active' ? 'bg-emerald-500' :
                            batch.status === 'Starting Soon' ? 'bg-amber-500' :
                                'bg-slate-300'
                            }`}></div>
                    </div>
                ))}
            </div>

            {filteredBatches.length === 0 && (
                <div className="py-20 text-center bg-white rounded-2xl border border-border">
                    <p className="text-muted-foreground font-medium">No batches found matching your search.</p>
                </div>
            )}
        </div>
    );
}
