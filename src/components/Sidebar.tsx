"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  BookOpen,
  Layers,
  FileCheck,
  MessageSquare,
  ShieldAlert,
  CreditCard,
  Globe,
  Settings,
  History,
  UserCircle,
  Menu,
  X,
  FileText,
  Briefcase,
  Mail
} from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Students", href: "/students" },
  { icon: UserSquare2, label: "Instructors", href: "/instructors" },
  { icon: FileCheck, label: "KYC Verification", href: "/instructors/kyc" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: Layers, label: "Batches", href: "/batches" },
  { icon: FileText, label: "Forms", href: "/forms" },
  { icon: FileCheck, label: "Study Materials", href: "/materials" },
  { icon: Briefcase, label: "Careers", href: "/careers" },
  { icon: MessageSquare, label: "Chat Moderation", href: "/chat-mod" },
  { icon: ShieldAlert, label: "Course Discipline", href: "/discipline" },
  { icon: CreditCard, label: "Transactions", href: "/transactions" },
  { icon: Mail, label: "Inquiries", href: "/contact" },
  { icon: Settings, label: "Website Settings", href: "/settings" },
  { icon: History, label: "Audit Logs", href: "/logs" },
  { icon: UserCircle, label: "Admin Profile", href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-border"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-40 w-72 bg-white border-r border-border
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                UB
              </div>
              UnboundByte
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-medium">System Control Interface</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-soft
                    ${isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"}
                  `}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border mt-auto">
            <div className="bg-secondary/50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                AD
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">Super Admin</p>
                <p className="text-xs text-muted-foreground truncate">admin@unboundbyte.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
