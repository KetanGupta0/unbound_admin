"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Upload,
    Plus,
    Trash2,
    Save,
    User,
    MapPin,
    Briefcase,
    GraduationCap,
    ShieldCheck,
    Camera,
    X,
    FileText,
    CheckCircle2
} from "lucide-react";
import { useToast } from "@/components/Toast";
import Link from "next/link";

interface Qualification {
    id: string;
    university: string;
    degree: string;
    year: string;
    status: string;
}

interface Experience {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
}

export default function NewInstructorPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [basicInfo, setBasicInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        dob: "",
        bio: "",
        avatar: ""
    });

    const [address, setAddress] = useState({
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const [qualifications, setQualifications] = useState<Qualification[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);

    // KYC State - Simulating file selection
    const [kycDocs, setKycDocs] = useState({
        aadharFront: null as File | null,
        aadharBack: null as File | null,
        certificates: [] as File[]
    });

    const [referral, setReferral] = useState({
        source: "None", // None, Person, Platform
        name: "",
        email: ""
    });

    // Handlers
    const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBasicInfo({ ...basicInfo, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const addQualification = () => {
        setQualifications([...qualifications, {
            id: Math.random().toString(36).substr(2, 9),
            university: "",
            degree: "",
            year: "",
            status: "Completed"
        }]);
    };

    const updateQualification = (id: string, field: string, value: string) => {
        setQualifications(qualifications.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const removeQualification = (id: string) => {
        setQualifications(qualifications.filter(q => q.id !== id));
    };

    const addExperience = () => {
        setExperiences([...experiences, {
            id: Math.random().toString(36).substr(2, 9),
            role: "",
            company: "",
            duration: "",
            description: ""
        }]);
    };

    const updateExperience = (id: string, field: string, value: string) => {
        setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    const removeExperience = (id: string) => {
        setExperiences(experiences.filter(e => e.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic Validation
        if (!basicInfo.firstName || !basicInfo.email || !basicInfo.mobile) {
            toast("Please fill in all required basic fields.", "error");
            setIsLoading(false);
            return;
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast("Instructor onboarded successfully! KYC Pending review.", "success");
        router.push("/instructors");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link href="/instructors" className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-muted-foreground" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Onboard New Instructor</h1>
                    <p className="text-muted-foreground">Add a new expert to the platform. They will need to pass KYC verification.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Basic Information & Avatar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center gap-2 mb-6 text-lg font-bold text-primary">
                        <User size={20} />
                        <h2>Basic Information</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group cursor-pointer w-32 h-32">
                                <div className={`w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-border flex items-center justify-center bg-secondary/30 ${basicInfo.avatar ? 'border-primary' : ''}`}>
                                    {basicInfo.avatar ? (
                                        <img src={basicInfo.avatar} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Camera size={32} className="text-muted-foreground opacity-50" />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Upload className="text-white" size={24} />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleAvatarUpload}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground text-center">Profile Photo<br />(Click to upload)</p>
                        </div>

                        {/* Fields */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground">First Name *</label>
                                <input required name="firstName" value={basicInfo.firstName} onChange={handleBasicChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Sarah" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground">Last Name *</label>
                                <input required name="lastName" value={basicInfo.lastName} onChange={handleBasicChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Jenkins" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground">Email Address *</label>
                                <input required type="email" name="email" value={basicInfo.email} onChange={handleBasicChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="sarah@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground">Mobile Number *</label>
                                <input required name="mobile" value={basicInfo.mobile} onChange={handleBasicChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="+1 234 567 8900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground">Date of Birth</label>
                                <input type="date" name="dob" value={basicInfo.dob} onChange={handleBasicChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-muted-foreground">Short Bio</label>
                                <textarea name="bio" value={basicInfo.bio} onChange={handleBasicChange} rows={3} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Brief professional summary..." />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Address Details */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center gap-2 mb-6 text-lg font-bold text-primary">
                        <MapPin size={20} />
                        <h2>Residential Address</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-muted-foreground">Address Line 1</label>
                            <input name="line1" value={address.line1} onChange={handleAddressChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Street address, P.O. box, etc." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">City</label>
                            <input name="city" value={address.city} onChange={handleAddressChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">State/Province</label>
                            <input name="state" value={address.state} onChange={handleAddressChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">Postal/Zip Code</label>
                            <input name="pincode" value={address.pincode} onChange={handleAddressChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground">Country</label>
                            <input name="country" value={address.country} onChange={handleAddressChange} className="w-full p-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                    </div>
                </div>

                {/* 3. Qualifications */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-lg font-bold text-primary">
                            <GraduationCap size={20} />
                            <h2>Qualifications</h2>
                        </div>
                        <button type="button" onClick={addQualification} className="flex items-center gap-1 text-sm font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                            <Plus size={16} /> Add
                        </button>
                    </div>

                    {qualifications.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground bg-secondary/30 rounded-xl border-dashed border border-border">
                            No qualifications added yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {qualifications.map((q) => (
                                <div key={q.id} className="p-4 rounded-xl border border-border bg-gray-50 relative group">
                                    <button
                                        type="button"
                                        onClick={() => removeQualification(q.id)}
                                        className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                        <input
                                            placeholder="University/School"
                                            value={q.university}
                                            onChange={(e) => updateQualification(q.id, 'university', e.target.value)}
                                            className="p-2 bg-white rounded-lg border border-border text-sm outline-none focus:border-primary"
                                        />
                                        <input
                                            placeholder="Degree/Certificate"
                                            value={q.degree}
                                            onChange={(e) => updateQualification(q.id, 'degree', e.target.value)}
                                            className="p-2 bg-white rounded-lg border border-border text-sm outline-none focus:border-primary"
                                        />
                                        <div className="flex gap-4">
                                            <input
                                                placeholder="Year"
                                                value={q.year}
                                                onChange={(e) => updateQualification(q.id, 'year', e.target.value)}
                                                className="w-1/3 p-2 bg-white rounded-lg border border-border text-sm outline-none focus:border-primary"
                                            />
                                            <select
                                                value={q.status}
                                                onChange={(e) => updateQualification(q.id, 'status', e.target.value)}
                                                className="flex-1 p-2 bg-white rounded-lg border border-border text-sm outline-none focus:border-primary"
                                            >
                                                <option value="Completed">Completed</option>
                                                <option value="Pursuing">Pursuing</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 4. Work Experience */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-lg font-bold text-primary">
                            <Briefcase size={20} />
                            <h2>Work Experience</h2>
                        </div>
                        <button type="button" onClick={addExperience} className="flex items-center gap-1 text-sm font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                            <Plus size={16} /> Add
                        </button>
                    </div>

                    <div className="space-y-4">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="p-4 rounded-xl border border-border bg-gray-50 relative group">
                                <button
                                    type="button"
                                    onClick={() => removeExperience(exp.id)}
                                    className="absolute top-2 right-2 p-1.5 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                    <input
                                        placeholder="Job Role / Title"
                                        value={exp.role}
                                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                        className="p-2 bg-white rounded-lg border border-border text-sm outline-none focus:border-primary"
                                    />
                                    <input
                                        placeholder="Company / Organization"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                        className="p-2 bg-white rounded-lg border border-border text-sm outline-none focus:border-primary"
                                    />
                                    <input
                                        placeholder="Duration (e.g. 2020 - Present)"
                                        value={exp.duration}
                                        onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                                        className="p-2 bg-white rounded-lg border border-border text-sm outline-none focus:border-primary"
                                    />
                                    <input
                                        placeholder="Brief Description"
                                        value={exp.description}
                                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                        className="p-2 bg-white rounded-lg border border-border text-sm outline-none focus:border-primary md:col-span-2"
                                    />
                                </div>
                            </div>
                        ))}
                        {experiences.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground bg-secondary/30 rounded-xl border-dashed border border-border">
                                No work experience added yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* 5. KYC Documents */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                    <div className="flex items-center gap-2 mb-6 text-lg font-bold text-primary">
                        <ShieldCheck size={20} />
                        <h2>KYC Documents</h2>
                        <span className="text-xs font-normal text-muted-foreground ml-2">(Max 2MB per file)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Aadhar Front */}
                        <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 transition-colors cursor-pointer relative">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            <FileText size={40} className="text-muted-foreground mb-4 opacity-50" />
                            <p className="font-bold text-foreground">Aadhar Card (Front)</p>
                            <p className="text-xs text-muted-foreground mt-1">Click to upload or drag & drop</p>
                        </div>

                        {/* Aadhar Back */}
                        <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 transition-colors cursor-pointer relative">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            <FileText size={40} className="text-muted-foreground mb-4 opacity-50" />
                            <p className="font-bold text-foreground">Aadhar Card (Back)</p>
                            <p className="text-xs text-muted-foreground mt-1">Click to upload or drag & drop</p>
                        </div>

                        {/* Additional Certs */}
                        <div className="col-span-1 md:col-span-2 border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 transition-colors cursor-pointer relative">
                            <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
                            <Upload size={40} className="text-muted-foreground mb-4 opacity-50" />
                            <p className="font-bold text-foreground">Additional Certificates</p>
                            <p className="text-xs text-muted-foreground mt-1">Upload degrees, diplomas of experience letters</p>
                        </div>
                    </div>
                </div>

                {/* Footer Checkbox & Submit */}
                <div className="flex flex-col gap-4">
                    <div className="p-4 bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-100 flex gap-3 items-start">
                        <input type="checkbox" className="mt-1 w-4 h-4" id="consent" />
                        <label htmlFor="consent" className="text-sm">
                            I verify that all the information provided above is accurate and the uploaded documents are authentic. I understand that any false information may lead to immediate termination.
                        </label>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link href="/instructors" className="px-6 py-3 font-bold text-muted-foreground bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all flex items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            {isLoading ? 'Creating Account...' : (
                                <>
                                    <Save size={18} />
                                    Submit Instructor Application
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
