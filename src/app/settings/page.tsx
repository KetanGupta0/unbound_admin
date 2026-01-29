"use client";

import {
    Globe,
    Search,
    Save,
    Image as ImageIcon,
    Type,
    Layout,
    Megaphone,
    Share2,
    Settings as SettingsIcon,
    CheckCircle2
} from "lucide-react";
import { useState } from "react";

export default function WebsiteSettings() {
    const [activeTab, setActiveTab] = useState("branding");

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Website & SEO Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage public-facing content, branding, and search engine optimization.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md">
                    <Save size={18} />
                    Save All Changes
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Navigation Tabs */}
                <div className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
                    {[
                        { id: "branding", label: "General Branding", icon: Layout },
                        { id: "seo", label: "SEO Metadata", icon: Search },
                        { id: "announcements", label: "Announcements", icon: Megaphone },
                        { id: "social", label: "Social Links", icon: Share2 },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-soft whitespace-nowrap min-w-fit lg:w-full ${activeTab === tab.id
                                    ? "bg-primary text-white shadow-md active:scale-95"
                                    : "bg-white text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white rounded-2xl border border-border p-6 shadow-premium space-y-8">
                        {activeTab === 'branding' && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-foreground flex items-center gap-2">
                                            <ImageIcon size={16} className="text-primary" />
                                            Platform Logo
                                        </label>
                                        <div className="flex flex-col items-center gap-4 p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 transition-soft hover:border-primary/50">
                                            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-white text-2xl font-bold">UB</div>
                                            <div className="text-center">
                                                <button className="text-sm font-bold text-primary hover:underline">Click to upload</button>
                                                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">SVG, PNG or JPG (max. 800x400px)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-foreground flex items-center gap-2">
                                            <Type size={16} className="text-primary" />
                                            Platform Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="UnboundByte"
                                            className="w-full px-4 py-3 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                                        />
                                        <label className="text-sm font-bold text-foreground flex items-center gap-2 mt-4">
                                            <Layout size={16} className="text-primary" />
                                            Primary Brand Color
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                defaultValue="#6366f1"
                                                className="w-10 h-10 rounded-lg overflow-hidden cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                defaultValue="#6366f1"
                                                className="flex-1 px-4 py-2 bg-slate-50 border border-border rounded-xl focus:outline-none text-sm font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'seo' && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-foreground flex items-center gap-2">
                                        <Globe size={18} className="text-emerald-500" />
                                        Global Meta Settings
                                    </h3>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Default Page Title</label>
                                            <input
                                                type="text"
                                                defaultValue="UnboundByte | Premium Online Learning Platform"
                                                className="w-full px-4 py-3 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Default Meta Description</label>
                                            <textarea
                                                rows={3}
                                                defaultValue="Learn the most in-demand technical skills from industry experts. Full-featured courses in Web Dev, Data Science, and more."
                                                className="w-full px-4 py-3 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'announcements' && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Megaphone size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">Banner Visibility</h4>
                                            <p className="text-xs text-muted-foreground">Show a persistent alert bar at the top of the website.</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Announcement Content (supports HTML)</label>
                                    <input
                                        type="text"
                                        defaultValue="🎉 50% Off Launch Celebration! Use code UNBOUND50"
                                        className="w-full px-4 py-3 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-2xl animate-in slide-in-from-bottom-2 duration-500 delay-150">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={20} className="text-emerald-500" />
                            <p className="text-sm font-semibold text-emerald-800">Changes will be reflected on the public website immediately.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
