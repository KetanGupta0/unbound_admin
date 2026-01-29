"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useState, useEffect, createContext, useContext, useCallback } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`
              pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-right-full duration-300
              ${t.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" :
                                t.type === "error" ? "bg-rose-50 border-rose-100 text-rose-800" :
                                    "bg-indigo-50 border-indigo-100 text-indigo-800"}
            `}
                    >
                        {t.type === "success" && <CheckCircle2 size={18} />}
                        {t.type === "error" && <AlertCircle size={18} />}
                        {t.type === "info" && <Info size={18} />}
                        <span className="text-sm font-bold">{t.message}</span>
                        <button
                            onClick={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))}
                            className="ml-2 p-0.5 rounded-md hover:bg-black/5 transition-soft"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
