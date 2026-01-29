"use client";

import { usePathname } from "next/navigation";
import { useToast } from "@/components/Toast";
import { Search, Bell } from "lucide-react";
import { adminProfile } from "@/mock/db";

const routeTitles: Record<string, string> = {
    "/": "Dashboard Overview",
    "/students": "Student Management",
    "/instructors": "Instructor Management",
    "/courses": "Course Management",
    "/batches": "Batch Management",
    "/approvals": "Study Material Approvals",
    "/chat-mod": "Chat Moderation",
    "/discipline": "Course Discipline",
    "/transactions": "Transactions & Refunds",
    "/public-content": "Public Content Management",
    "/settings": "Website & SEO Settings",
    "/logs": "Audit Logs & Monitoring",
    "/profile": "Admin Profile",
};

export default function Header() {
    const pathname = usePathname();
    const { toast } = useToast();
    const currentTitle = routeTitles[pathname] || "Dashboard";

    return (
        <header className="sticky top-0 z-30 w-full h-16 border-b border-border bg-white/80 backdrop-blur-md px-6 flex items-center justify-between lg:px-8">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-foreground lg:ml-0 ml-12 animate-in fade-in slide-in-from-left-4 duration-500">
                    {currentTitle}
                </h2>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => toast("Global search is coming soon!", "info")}
                    className="p-2 text-muted-foreground hover:text-foreground transition-soft rounded-full hover:bg-secondary"
                >
                    <Search size={20} />
                </button>
                <button
                    onClick={() => toast("All systems operating within normal parameters.", "success")}
                    className="p-2 text-muted-foreground hover:text-foreground transition-soft rounded-full hover:bg-secondary relative"
                >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
                </button>
                <div className="h-8 w-px bg-border mx-2 hidden sm:block"></div>
                <div
                    onClick={() => toast("Redirecting to profile...", "info")}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-transparent group-hover:ring-primary/20 transition-soft">
                        {adminProfile.avatar}
                    </div>
                    <span className="text-sm font-bold text-foreground hidden md:inline-block">{adminProfile.name}</span>
                </div>
            </div>
        </header>
    );
}
