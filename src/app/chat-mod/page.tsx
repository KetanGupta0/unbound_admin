"use client";

import {
    MessageSquare,
    Search,
    Users,
    ShieldAlert,
    Send,
    MoreVertical,
    UserX,
    UserCheck,
    Ban,
    Trash2
} from "lucide-react";
import { chatGroups, groupMessages as initialMessagesMap } from "@/mock/db";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast";

export default function ChatModeration() {
    const { toast } = useToast();
    const [selectedGroup, setSelectedGroup] = useState(chatGroups[0]);
    const [messages, setMessages] = useState(initialMessagesMap[selectedGroup.id as keyof typeof initialMessagesMap] || []);
    const [newMessage, setNewMessage] = useState("");
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState<any>(null);

    // Update messages when group changes
    useEffect(() => {
        setMessages(initialMessagesMap[selectedGroup.id as keyof typeof initialMessagesMap] || []);
    }, [selectedGroup]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const msg = {
            id: `M${Date.now()}`,
            sender: "UnboundByte Support",
            role: "Admin",
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, msg]);
        setNewMessage("");
        toast(`Message sent as Support to ${selectedGroup.name}`, "success");
    };

    const handleDeleteMessage = (id: string) => {
        setMessages(messages.filter(m => m.id !== id));
        toast("Message deleted by Admin", "info");
    };

    const handleBanUser = () => {
        if (selectedMsg) {
            toast(`User ${selectedMsg.sender} has been banned from the platform.`, "error");
            setIsBanModalOpen(false);
        }
    };

    return (
        <div className="h-[calc(100vh-160px)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
            {/* Group List Sidebar */}
            <div className="w-full lg:w-80 flex flex-col gap-4">
                <div className="bg-white rounded-2xl border border-border flex flex-col overflow-hidden shadow-sm h-full">
                    <div className="p-4 border-b border-border">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            <MessageSquare className="text-primary" size={20} />
                            Group Chats
                        </h2>
                        <div className="mt-3 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input
                                type="text"
                                placeholder="Search groups..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {chatGroups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => setSelectedGroup(group)}
                                className={`w-full p-4 flex flex-col gap-1 text-left transition-soft hover:bg-secondary/50 border-b border-border/50 ${selectedGroup.id === group.id ? "bg-primary/5 border-l-4 border-l-primary" : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm text-foreground truncate">{group.name}</span>
                                    <span className="text-[10px] text-muted-foreground">{group.timestamp}</span>
                                </div>
                                <p className="text-xs text-primary font-medium truncate">{group.course}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{group.lastMessage}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 bg-white rounded-2xl border border-border overflow-hidden shadow-premium flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-border bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm font-bold">
                            {selectedGroup.name[0]}
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground text-sm">{selectedGroup.name}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-0.5">
                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                    <Users size={12} /> {selectedGroup.activeStudents} Students
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
                                    <ShieldAlert size={12} /> {selectedGroup.instructor}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-soft" title="Moderation Rules">
                            <ShieldAlert size={20} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-soft">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages Layout */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                    <div className="flex justify-center">
                        <span className="px-3 py-1 bg-white border border-border rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Today</span>
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className="group-hover:translate-x-1 transition-soft">
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${msg.role === 'Admin' ? 'bg-indigo-600 text-white' :
                                    msg.role === 'Instructor' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-border'
                                    }`}>
                                    {msg.sender.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 max-w-[80%]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-xs text-foreground">{msg.sender}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${msg.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' :
                                                msg.role === 'Instructor' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                            }`}>{msg.role}</span>
                                        <span className="text-[9px] text-muted-foreground">{msg.timestamp}</span>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white border border-border shadow-sm text-sm text-foreground leading-relaxed relative group">
                                        {msg.content}
                                        <div className="absolute top-1/2 -right-16 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-soft flex gap-1">
                                            <button
                                                onClick={() => handleDeleteMessage(msg.id)}
                                                className="p-1.5 bg-white border border-border rounded-lg text-rose-500 hover:bg-rose-50 transition-soft shadow-sm"
                                                title="Delete Message"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            {msg.role !== 'Admin' && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedMsg(msg);
                                                        setIsBanModalOpen(true);
                                                    }}
                                                    className="p-1.5 bg-white border border-border rounded-lg text-slate-800 hover:bg-slate-50 transition-soft shadow-sm"
                                                    title="Ban User"
                                                >
                                                    <UserX size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground italic text-sm">
                            <MessageSquare className="opacity-10 mb-2" size={48} />
                            No messages in this group yet.
                        </div>
                    )}

                    {/* Admin Announcement Style */}
                    <div className="flex justify-center">
                        <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-2">
                            <ShieldAlert size={14} className="text-primary" />
                            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">UnboundByte Support joined the chat</p>
                        </div>
                    </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-border">
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-muted-foreground hover:bg-secondary rounded-xl transition-soft">
                            <Ban size={20} />
                        </button>
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                            className="flex-1 relative"
                        >
                            <input
                                type="text"
                                placeholder={`Send a message to ${selectedGroup.name}...`}
                                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-soft shadow-sm"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                    <p className="mt-2 text-[10px] text-muted-foreground text-center">
                        You are messaging as <span className="font-bold text-primary">UnboundByte Support</span>. All moderation actions are logged.
                    </p>
                </div>
            </div>

            {/* Ban Modal */}
            <Modal
                isOpen={isBanModalOpen}
                onClose={() => setIsBanModalOpen(false)}
                title="Ban User from Platform?"
                description="This will restrict the user from all course groups and their account."
                footer={
                    <>
                        <button onClick={() => setIsBanModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button onClick={handleBanUser} className="px-6 py-2 bg-destructive text-white rounded-xl text-sm font-bold shadow-md">Ban permanently</button>
                    </>
                }
            >
                {selectedMsg && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                        <p className="text-sm font-bold text-rose-900">{selectedMsg.sender}</p>
                        <p className="text-xs text-rose-700 mt-1 italic">"{selectedMsg.content}"</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
