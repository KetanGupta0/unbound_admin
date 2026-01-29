"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    Phone,
    Lock,
    MapPin,
    Globe,
    Building,
    Hash,
    Users,
    ChevronLeft,
    Save,
    Info,
    CheckCircle2,
    Search,
    Camera,
    Upload,
    X
} from "lucide-react";
import { useToast } from "@/components/Toast";

export default function NewStudentPage() {
    const router = useRouter();
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        // Basic Info
        name: "",
        email: "",
        phone: "",
        password: "",
        // Address Info
        country: "",
        state: "",
        city: "",
        pinCode: "",
        addressLine1: "",
        addressLine2: "",
        // Referral Info
        referralType: "none", // Updated: 'none' | 'person' | 'platform'
        refPersonName: "",
        refPersonEmail: "",
        refPersonPhone: "",
        refId: "",
        refPlatform: "Google",
        // Avatar
        avatar: "", // URL or base64 string
    });

    const [errors, setErrors] = useState<any>({});

    const platforms = ["Google", "Facebook", "YouTube", "Linkedin", "Instagram", "Threads", "Twitter(X)", "Discord", "Line", "Whatsapp"];

    const validate = () => {
        const newErrors: any = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Basic Info Validation
        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone) {
            newErrors.phone = "Phone is required";
        } else if (formData.phone.replace(/\D/g, '').length < 10) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        // Referral Validation (Only if not 'none')
        if (formData.referralType === "person") {
            if (!formData.refPersonName.trim()) newErrors.refPersonName = "Referral name is required";
            if (!formData.refPersonEmail) {
                newErrors.refPersonEmail = "Referral email is required";
            } else if (!emailRegex.test(formData.refPersonEmail)) {
                newErrors.refPersonEmail = "Please enter a valid email for the referrer";
            }
        }

        if (formData.referralType === "platform") {
            if (!formData.refPlatform) newErrors.refPlatform = "Please select a platform";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, avatar: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            toast("Student created successfully!", "success");
            router.push("/students");
        } else {
            toast("Please fix the errors in the form", "error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-soft font-bold text-sm"
                >
                    <ChevronLeft size={18} />
                    Back to List
                </button>
                <h1 className="text-xl font-bold text-foreground">Add New Student</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white rounded-[32px] border border-border shadow-premium overflow-hidden">
                    <div className="px-8 py-6 border-b border-border bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-primary">
                            <User size={20} />
                        </div>
                        <h2 className="font-bold text-foreground">Basic Information</h2>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Full Name *</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter full name"
                                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border ${errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-border bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold`}
                                />
                            </div>
                            {errors.name && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Email Address *</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@example.com"
                                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border ${errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-border bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold`}
                                />
                            </div>
                            {errors.email && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Phone Number *</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border ${errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-border bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold`}
                                />
                            </div>
                            {errors.phone && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Password *</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border ${errors.password ? 'border-rose-500 bg-rose-50/30' : 'border-border bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold`}
                                />
                            </div>
                            {errors.password && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.password}</p>}
                        </div>
                    </div>
                </div>

                {/* Profile Picture */}
                <div className="bg-white rounded-[32px] border border-border shadow-premium overflow-hidden">
                    <div className="px-8 py-6 border-b border-border bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-primary">
                            <Camera size={20} />
                        </div>
                        <h2 className="font-bold text-foreground">Profile Picture <span className="text-xs font-normal text-muted-foreground ml-2">(Optional)</span></h2>
                    </div>
                    <div className="p-8 flex flex-col items-center">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-soft group-hover:border-primary/50">
                                {formData.avatar ? (
                                    <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center text-muted-foreground">
                                        <Upload size={32} strokeWidth={1.5} />
                                        <p className="text-[10px] font-bold mt-2 uppercase tracking-wider">Preview</p>
                                    </div>
                                )}
                            </div>

                            {formData.avatar && (
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 p-1.5 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-soft"
                                >
                                    <X size={14} />
                                </button>
                            )}

                            <label className="absolute inset-0 cursor-pointer opacity-0" htmlFor="avatar-upload">
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-xs font-bold text-foreground">Click the box to upload</p>
                            <p className="text-[10px] text-muted-foreground mt-1">Supports JPG, PNG or WebP. Max 2MB.</p>
                        </div>
                    </div>
                </div>

                {/* Optional: Address Information */}
                <div className="bg-white rounded-[32px] border border-border shadow-premium overflow-hidden">
                    <div className="px-8 py-6 border-b border-border bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-xl shadow-sm text-primary">
                                <MapPin size={20} />
                            </div>
                            <h2 className="font-bold text-foreground">Address Information <span className="text-xs font-normal text-muted-foreground ml-2">(Optional)</span></h2>
                        </div>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Country</label>
                            <input
                                type="text"
                                value={formData.country}
                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                placeholder="e.g. United States"
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">State / Province</label>
                            <input
                                type="text"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                placeholder="e.g. California"
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">City</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                placeholder="e.g. San Francisco"
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Pin / Zip Code</label>
                            <input
                                type="text"
                                value={formData.pinCode}
                                onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                                placeholder="e.g. 94103"
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Address Line 1</label>
                            <input
                                type="text"
                                value={formData.addressLine1}
                                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                                placeholder="Street address, P.O. box"
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                            />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Address Line 2</label>
                            <input
                                type="text"
                                value={formData.addressLine2}
                                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                                placeholder="Apartment, suite, unit, building, floor, etc."
                                className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                            />
                        </div>
                    </div>
                </div>

                {/* Referral Tracking */}
                <div className="bg-white rounded-[32px] border border-border shadow-premium overflow-hidden">
                    <div className="px-8 py-6 border-b border-border bg-slate-50/50 flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-primary">
                            <Users size={20} />
                        </div>
                        <h2 className="font-bold text-foreground">Referral Source</h2>
                    </div>
                    <div className="p-8 space-y-8">
                        {/* Type Toggle */}
                        <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, referralType: 'none' })}
                                className={`px-6 py-2 rounded-xl text-xs font-bold transition-soft ${formData.referralType === 'none' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Not Applicable
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, referralType: 'person' })}
                                className={`px-6 py-2 rounded-xl text-xs font-bold transition-soft ${formData.referralType === 'person' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Referred by Person
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, referralType: 'platform' })}
                                className={`px-6 py-2 rounded-xl text-xs font-bold transition-soft ${formData.referralType === 'platform' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Found on Platform
                            </button>
                        </div>

                        {formData.referralType === 'none' ? (
                            <div className="flex items-center gap-3 p-6 rounded-2xl bg-slate-50 border border-border border-dashed animate-in fade-in duration-300">
                                <Info size={18} className="text-muted-foreground" />
                                <p className="text-xs font-medium text-muted-foreground italic">No referral source selected. This section is optional.</p>
                            </div>
                        ) : formData.referralType === 'person' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Person Name *</label>
                                    <input
                                        type="text"
                                        value={formData.refPersonName}
                                        onChange={(e) => setFormData({ ...formData, refPersonName: e.target.value })}
                                        placeholder="Enter recommender's name"
                                        className={`w-full px-4 py-3 rounded-2xl border ${errors.refPersonName ? 'border-rose-500 bg-rose-50/30' : 'border-border bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold`}
                                    />
                                    {errors.refPersonName && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.refPersonName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Person Email *</label>
                                    <input
                                        type="email"
                                        value={formData.refPersonEmail}
                                        onChange={(e) => setFormData({ ...formData, refPersonEmail: e.target.value })}
                                        placeholder="recommender@example.com"
                                        className={`w-full px-4 py-3 rounded-2xl border ${errors.refPersonEmail ? 'border-rose-500 bg-rose-50/30' : 'border-border bg-slate-50'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold`}
                                    />
                                    {errors.refPersonEmail && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.refPersonEmail}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Person Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        value={formData.refPersonPhone}
                                        onChange={(e) => setFormData({ ...formData, refPersonPhone: e.target.value })}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Referral ID (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.refId}
                                        onChange={(e) => setFormData({ ...formData, refId: e.target.value })}
                                        placeholder="REF12345"
                                        className="w-full px-4 py-3 rounded-2xl border border-border bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-soft text-sm font-semibold"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in duration-300">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Select Platform</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {platforms.map((platform) => (
                                        <button
                                            key={platform}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, refPlatform: platform })}
                                            className={`px-4 py-3 rounded-2xl text-xs font-bold transition-soft border ${formData.refPlatform === platform ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-white border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground'}`}
                                        >
                                            {platform}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-3 rounded-2xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-slate-100 transition-soft"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-10 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-indigo hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
                    >
                        <Save size={18} />
                        Create Student
                    </button>
                </div>
            </form>
        </div>
    );
}
