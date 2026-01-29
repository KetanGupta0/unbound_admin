"use client";

import {
    UserCircle,
    Shield,
    Key,
    History,
    Mail,
    Phone,
    Globe,
    Lock,
    ChevronRight,
    Monitor,
    Smartphone,
    CheckCircle2
} from "lucide-react";

import { adminProfile } from "@/mock/db";

import { useState } from "react";
import { useToast } from "@/components/Toast";

export default function AdminProfile() {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: adminProfile.name,
        email: adminProfile.email,
        location: adminProfile.location,
        phone: "+91 98765 43210",
        language: "English (US)"
    });

    const handleSave = () => {
        setIsEditing(false);
        toast("Profile updated successfully!", "success");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-primary/10">
                    {adminProfile.avatar}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-2">
                        <Shield size={16} className="text-primary" />
                        {adminProfile.role} • Primary Account
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Details */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <UserCircle size={20} className="text-primary" />
                                Personal Information
                            </h3>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-sm font-bold text-primary hover:underline"
                                >
                                    Edit Profile Details
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <UserCircle size={12} /> Full Name
                                </p>
                                {isEditing ? (
                                    <input
                                        className="w-full px-3 py-2 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-sm font-semibold">{profile.name}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <Mail size={12} /> Email Address
                                </p>
                                {isEditing ? (
                                    <input
                                        className="w-full px-3 py-2 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-sm font-semibold">{profile.email}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <Phone size={12} /> Contact Number
                                </p>
                                {isEditing ? (
                                    <input
                                        className="w-full px-3 py-2 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-sm font-semibold">{profile.phone}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                    <Globe size={12} /> Location
                                </p>
                                {isEditing ? (
                                    <input
                                        className="w-full px-3 py-2 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                                        value={profile.location}
                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-sm font-semibold">{profile.location}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex gap-3 pt-4 border-t border-border">
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 bg-secondary text-muted-foreground text-sm font-bold rounded-xl hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm space-y-6">
                        <h3 className="font-bold text-lg flex items-center gap-2 border-b border-border pb-4">
                            <Key size={20} className="text-primary" />
                            Security & Credentials
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 transition-soft group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 text-primary rounded-lg">
                                        <Lock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Two-Factor Authentication</p>
                                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-soft" />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/20 transition-soft group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 text-primary rounded-lg">
                                        <Key size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Update Password</p>
                                        <p className="text-xs text-muted-foreground">Last updated 3 months ago.</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-soft" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login History */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-6">
                        <h3 className="font-bold text-lg flex items-center gap-2 border-b border-slate-800 pb-4">
                            <History size={20} className="text-indigo-400" />
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mt-1">
                                    <Monitor size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold">New Login: Chrome on Windows</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Today, 10:45 AM • Mumbai, IN</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1">
                                    <CheckCircle2 size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold">Security Group Updated</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Yesterday • 18:22 PM</p>
                                </div>
                            </div>
                            <div className="flex gap-3 opacity-60">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mt-1">
                                    <Smartphone size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold">Login: Mobile App (Internal)</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">March 20, 2024 • 09:12 AM</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition-soft rounded-xl text-xs font-bold shadow-md">
                            Logout from All Devices
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
