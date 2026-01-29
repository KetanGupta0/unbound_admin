"use client";

import {
    History,
    Search,
    Filter,
    Clock,
    Smartphone,
    Monitor,
    ShieldCheck,
    Download,
    Calendar,
    User
} from "lucide-react";
import { auditLogs } from "@/mock/db";
import { useState } from "react";

export default function AuditLogs() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLogs = auditLogs.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.target.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <History className="text-primary" />
                        Audit Logs & Monitoring
                    </h1>
                    <p className="text-muted-foreground mt-1">Full immutable history of all administrative actions for transparency and security.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-secondary shadow-sm text-sm">
                    <Download size={18} />
                    Export Audit Trail
                </button>
            </div>

            {/* Real-time Monitor Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Monitor size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Active Admin Session</p>
                            <p className="text-sm font-bold">Secure Local Access</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Live Feed
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">IP: 192.168.1.1 (You)</p>
                    </div>
                </div>

                <div className="bg-white border border-border p-5 rounded-2xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Compliance Status</p>
                            <p className="text-sm font-bold text-foreground">Integrity Verified</p>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-right leading-tight max-w-[120px]">
                        Logs are cryptographically signed and immutable.
                    </p>
                </div>
            </div>

            {/* Control Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search action, target or actor..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft text-sm shadow-sm">
                    <Filter size={18} />
                    Filter Actor
                </button>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-2xl shadow-premium border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/50">
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Timestamp</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Target</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Actor</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Reason</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-secondary/10 transition-soft">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                                            <Calendar size={12} />
                                            {log.timestamp}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${log.action.includes('Blocked') || log.action.includes('Refund') ? 'bg-rose-50 text-rose-700' :
                                            log.action.includes('Verified') || log.action.includes('Published') ? 'bg-emerald-50 text-emerald-700' :
                                                'bg-indigo-50 text-indigo-700'
                                            }`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold text-foreground">{log.target}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                                            <User size={14} className="text-muted-foreground" />
                                            {log.actor}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs">
                                        <p className="text-xs text-muted-foreground italic">"{log.reason}"</p>
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
