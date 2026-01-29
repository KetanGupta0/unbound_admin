"use client";

import {
  Users,
  UserSquare2,
  BookOpen,
  Layers,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Clock,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import StatCard from "@/components/StatCard";
import { dashboardStats, pendingApprovals } from "@/mock/db";
import Link from "next/link";
import { useToast } from "@/components/Toast";
import { useState } from "react";

const iconMap = {
  Users,
  UserSquare2,
  BookOpen,
  Layers,
  CreditCard,
};

export default function Dashboard() {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast("Dashboard statistics updated successfully!", "success");
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-sans">Overview</h1>
          <p className="text-muted-foreground mt-1 font-sans">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center gap-2 bg-white text-foreground border border-border px-4 py-2 rounded-xl font-bold transition-soft hover:bg-secondary shadow-sm active:scale-95"
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin text-primary" : ""} />
          Refresh Stats
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = iconMap[stat.icon as keyof typeof iconMap];
          return (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              color={stat.color}
              icon={Icon}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Approvals Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-premium border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Clock className="text-amber-500" size={20} />
              Pending Approvals
            </h3>
            <Link href="/approvals" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Name/Item</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Submitted By</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pendingApprovals.map((item) => (
                  <tr key={item.id} className="hover:bg-secondary/30 transition-soft">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${item.type === 'Study Material' ? 'bg-indigo-100 text-indigo-700' :
                        item.type === 'KYC Onboarding' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 truncate max-w-[200px] font-medium text-sm">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.instructor}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={item.type === 'Study Material' ? '/approvals' : item.type === 'KYC Onboarding' ? '/instructors' : '/transactions'}
                        className="text-primary font-bold text-sm hover:text-indigo-700 transition-soft"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health / Revenue Insight */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-premium border border-border p-6">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
              <TrendingUp className="text-indigo-500" size={20} />
              Revenue Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Monthly Target</p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-2xl font-bold text-indigo-900">$45,280 / $50k</p>
                  <p className="text-xs font-bold text-indigo-600">90%</p>
                </div>
                <div className="mt-3 h-2 w-full bg-indigo-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Revenue is up <span className="text-emerald-600 font-bold">15.4%</span> compared to last month. Most revenue comes from the "Advanced Web Dev" course series.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-premium border border-border p-6">
            <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
              <AlertCircle className="text-rose-500" size={20} />
              System Status
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => toast("API Server check: Status 200 OK", "success")}
                className="w-full flex items-center justify-between text-sm hover:bg-secondary/50 p-1.5 rounded-lg transition-soft"
              >
                <span className="text-muted-foreground font-sans">API Server</span>
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Operational
                </span>
              </button>
              <button
                onClick={() => toast("Database check: DB connection healthy", "success")}
                className="w-full flex items-center justify-between text-sm hover:bg-secondary/50 p-1.5 rounded-lg transition-soft"
              >
                <span className="text-muted-foreground font-sans">Database</span>
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Operational
                </span>
              </button>
              <button
                onClick={() => toast("CDN check: Latency 15ms", "info")}
                className="w-full flex items-center justify-between text-sm hover:bg-secondary/50 p-1.5 rounded-lg transition-soft"
              >
                <span className="text-muted-foreground font-sans">Content CDN</span>
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600 font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Operational
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
