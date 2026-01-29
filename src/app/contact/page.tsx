"use client";

import { useState } from "react";
import {
    Mail,
    Search,
    Filter,
    Trash2,
    Reply,
    CheckCircle2,
    AlertTriangle,
    Inbox,
    Send
} from "lucide-react";
import { inquiries } from "@/mock/inquiries";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast";

export default function ContactPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<'All' | 'New' | 'Contacted' | 'Spam'>('All');

    // Reply Modal
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<typeof inquiries[0] | null>(null);
    const [replyBody, setReplyBody] = useState("");

    const filteredInquiries = inquiries.filter(inq => {
        const matchesSearch = inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inq.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' ? inq.status !== 'Spam' : inq.status === filter;

        // Special case: 'Spam' filter strictly shows spam. 'All' hides spam unless searched explicitly? 
        // Let's stick to simple: 'All' shows everything except Spam. 'Spam' shows only Spam.
        if (filter === 'Spam') return matchesSearch && inq.status === 'Spam';
        if (filter === 'All') return matchesSearch && inq.status !== 'Spam';
        return matchesSearch && matchesFilter;
    });

    const handleOpenReply = (inq: typeof inquiries[0]) => {
        setSelectedInquiry(inq);
        setReplyBody(`Hi ${inq.name.split(' ')[0]},\n\nThank you for reaching out regarding "${inq.subject}".\n\n`);
        setIsReplyOpen(true);
    };

    const handleSendReply = () => {
        setIsReplyOpen(false);
        toast("Reply sent successfully!", "success");
        // Update local mock logic would go here (e.g. set status to Contacted)
    };

    const handleMarkSpam = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        toast("Marked as Spam.", "error");
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Contact Inquiries</h1>
                    <p className="text-muted-foreground mt-1">Manage and respond to incoming messages.</p>
                </div>
            </div>

            <div className="flex h-[calc(100vh-12rem)] gap-6">
                {/* Sidebar Filters */}
                <div className="w-64 bg-white rounded-2xl border border-border p-4 shadow-sm h-full hidden md:block">
                    <button
                        onClick={() => setFilter('All')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold mb-2 transition-colors ${filter === 'All' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-slate-50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Inbox size={18} /> Inbox
                        </div>
                        <span className="text-xs bg-white border px-2 py-0.5 rounded-md">
                            {inquiries.filter(i => i.status !== 'Spam' && i.status !== 'Contacted').length}
                        </span>
                    </button>
                    <button
                        onClick={() => setFilter('Contacted')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold mb-2 transition-colors ${filter === 'Contacted' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-slate-50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} /> Responded
                        </div>
                    </button>
                    <button
                        onClick={() => setFilter('Spam')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold mb-2 transition-colors ${filter === 'Spam' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-slate-50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={18} /> Spam
                        </div>
                        <span className="text-xs bg-white border px-2 py-0.5 rounded-md">
                            {inquiries.filter(i => i.status === 'Spam').length}
                        </span>
                    </button>
                </div>

                {/* Message List */}
                <div className="flex-1 bg-white rounded-2xl border border-border shadow-sm flex flex-col h-full overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-border flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                placeholder="Search sender, subject..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-border">
                        {filteredInquiries.map(inq => (
                            <div
                                key={inq.id}
                                onClick={() => handleOpenReply(inq)}
                                className={`p-6 hover:bg-slate-50 cursor-pointer transition-colors group ${inq.status === 'New' ? 'bg-white' : 'bg-slate-50/30'}`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${inq.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                                            }`}>
                                            {inq.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className={`text-sm ${inq.status === 'New' ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'}`}>
                                                {inq.name} <span className="text-xs font-normal text-slate-400">&lt;{inq.email}&gt;</span>
                                            </h3>
                                            <p className="text-xs text-muted-foreground">{inq.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {inq.status === 'New' && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">New</span>}
                                        <button
                                            onClick={(e) => handleMarkSpam(inq.id, e)}
                                            className="p-2 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                            title="Mark as Spam"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h4 className={`text-base mb-1 ${inq.status === 'New' ? 'font-bold' : 'font-medium'}`}>{inq.subject}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">{inq.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reply Modal */}
            <Modal
                isOpen={isReplyOpen}
                onClose={() => setIsReplyOpen(false)}
                title={`Reply to ${selectedInquiry?.name}`}
                description="Send an email response."
                footer={
                    <button onClick={handleSendReply} className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
                        <Send size={16} /> Send Email
                    </button>
                }
            >
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl text-sm text-muted-foreground border border-border mb-4 italic">
                        "{selectedInquiry?.message}"
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Subject</label>
                        <input
                            className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium"
                            defaultValue={`Re: ${selectedInquiry?.subject}`}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Message</label>
                        <textarea
                            className="w-full px-4 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium min-h-[200px] resize-none"
                            value={replyBody}
                            onChange={(e) => setReplyBody(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
