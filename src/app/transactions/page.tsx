"use client";

import {
    CreditCard,
    Search,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Calendar,
    AlertCircle
} from "lucide-react";
import { transactions as initialTransactions } from "@/mock/db";
import { useState } from "react";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast";

export default function TransactionsManagement() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [transactions, setTransactions] = useState(initialTransactions);
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [selectedTxn, setSelectedTxn] = useState<any>(null);

    const filteredTxns = transactions.filter(txn =>
        txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProcessRefund = () => {
        if (selectedTxn) {
            setTransactions(transactions.map(t =>
                t.id === selectedTxn.id ? { ...t, status: 'Refunded', type: 'Refund' as any } : t
            ));
            setIsRefundModalOpen(false);
            toast(`Refund for ${selectedTxn.id} processed successfully!`, "success");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Transactions & Refunds</h1>
                    <p className="text-muted-foreground mt-1">Monitor all platform revenue, filter payments, and process refunds.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => toast("Exporting CSV report...", "info")}
                        className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-secondary shadow-sm text-sm"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold transition-soft hover:bg-indigo-700 shadow-md text-sm">
                        <CreditCard size={18} />
                        Manual Entry
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Gross Revenue</p>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground">$142,580</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">+12% from last month</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Refunds Processed</p>
                        <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                            <ArrowDownLeft size={16} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground">$12,450</p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">2.4% refund rate</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Pending Reversals</p>
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <Clock size={16} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground">14</p>
                    <p className="text-xs text-amber-600 font-medium mt-1">Requires admin approval</p>
                </div>
            </div>

            {/* Control Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search by transaction ID or user name..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft text-sm shadow-sm">
                    <Calendar size={18} />
                    Date Range
                </button>
                <button className="flex items-center justify-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl font-semibold text-foreground hover:bg-secondary transition-soft text-sm shadow-sm">
                    <Filter size={18} />
                    Filter Type
                </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl shadow-premium border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-secondary/50">
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">User & Course</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredTxns.map((txn) => (
                                <tr key={txn.id} className="hover:bg-secondary/30 transition-soft">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-xs text-foreground uppercase tracking-tighter">{txn.id}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-medium mt-1">{txn.date}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-semibold">{txn.user}</p>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{txn.course}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${txn.type === 'Payment' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                            }`}>
                                            {txn.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className={`text-sm font-bold ${txn.amount < 0 ? 'text-rose-600' : 'text-foreground'}`}>
                                            {txn.amount < 0 ? `- $${Math.abs(txn.amount)}` : `$${txn.amount}`}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                                            {txn.status === 'Success' || txn.status === 'Processed' ? (
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                            ) : txn.status === 'Failed' || txn.status === 'Refunded' ? (
                                                <XCircle size={14} className="text-rose-500" />
                                            ) : (
                                                <Clock size={14} className="text-amber-500" />
                                            )}
                                            <span className={
                                                txn.status === 'Success' || txn.status === 'Processed' ? 'text-emerald-700' :
                                                    txn.status === 'Failed' || txn.status === 'Refunded' ? 'text-rose-700' :
                                                        'text-amber-700'
                                            }>
                                                {txn.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {txn.type === 'Payment' && txn.status === 'Success' && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedTxn(txn);
                                                        setIsRefundModalOpen(true);
                                                    }}
                                                    className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-soft rounded-lg text-[10px] font-bold uppercase"
                                                >
                                                    Refund
                                                </button>
                                            )}
                                            <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-soft">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Refund Modal */}
            <Modal
                isOpen={isRefundModalOpen}
                onClose={() => setIsRefundModalOpen(false)}
                title="Process Refund?"
                description="This will return the funds to the student's original payment method."
                footer={
                    <>
                        <button onClick={() => setIsRefundModalOpen(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground">Cancel</button>
                        <button onClick={handleProcessRefund} className="px-6 py-2 bg-destructive text-white rounded-xl text-sm font-bold shadow-md">Confirm Refund</button>
                    </>
                }
            >
                {selectedTxn && (
                    <div className="space-y-4">
                        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
                            <AlertCircle className="text-rose-500 mt-0.5" size={20} />
                            <div>
                                <p className="text-sm font-bold text-rose-900">Refund for {selectedTxn.user}</p>
                                <p className="text-xs text-rose-700 mt-1">Amount to be returned: <span className="font-bold">${selectedTxn.amount}</span></p>
                                <p className="text-[10px] text-rose-600 mt-2 italic">Refunds usually take 5-10 business days to reflect.</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Reason for Refund</label>
                            <textarea
                                className="w-full px-4 py-2 border border-border rounded-xl text-sm min-h-[100px]"
                                placeholder="Student requested cancellation..."
                            ></textarea>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
