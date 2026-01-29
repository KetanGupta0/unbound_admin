"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    Save,
    Plus,
    Settings,
    Eye,
    Move,
    Trash2,
    Type,
    List,
    CheckSquare,
    Calendar,
    FileText,
    AlignLeft,
    Hash
} from "lucide-react";
import { useToast } from "@/components/Toast";
import Modal from "@/components/Modal";
import { Field, Section } from "@/mock/forms";

export default function FormBuilderPage() {
    const { toast } = useToast();
    const [title, setTitle] = useState("New Form");
    const [description, setDescription] = useState("");
    const [dates, setDates] = useState({ start: "", end: "" });
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [sections, setSections] = useState<Section[]>([
        { id: "s1", title: "Section 1", fields: [] }
    ]);
    const [activeSectionId, setActiveSectionId] = useState("s1");
    const [previewMode, setPreviewMode] = useState(false);

    const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

    const addSection = () => {
        const newId = `s${sections.length + 1}`;
        setSections([...sections, { id: newId, title: "New Section", fields: [] }]);
        setActiveSectionId(newId);
    };

    const addField = (type: any) => {
        const newField: Field = {
            id: `f${Date.now()}`,
            type,
            label: "New Question",
            required: false,
            placeholder: "",
            options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2'] : undefined
        };

        const updatedSections = sections.map(sec => {
            if (sec.id === activeSectionId) {
                return { ...sec, fields: [...sec.fields, newField] };
            }
            return sec;
        });
        setSections(updatedSections);
    };

    const updateField = (fieldId: string, updates: Partial<Field>) => {
        const updatedSections = sections.map(sec => {
            if (sec.id === activeSectionId) {
                return {
                    ...sec,
                    fields: sec.fields.map(f => f.id === fieldId ? { ...f, ...updates } : f)
                };
            }
            return sec;
        });
        setSections(updatedSections);
    };

    const deleteField = (fieldId: string) => {
        const updatedSections = sections.map(sec => {
            if (sec.id === activeSectionId) {
                return { ...sec, fields: sec.fields.filter(f => f.id !== fieldId) };
            }
            return sec;
        });
        setSections(updatedSections);
    };

    const fieldTypes = [
        { type: 'text', icon: Type, label: 'Short Text' },
        { type: 'textarea', icon: AlignLeft, label: 'Long Text' },
        { type: 'number', icon: Hash, label: 'Number' },
        { type: 'select', icon: List, label: 'Dropdown' },
        { type: 'radio', icon: CheckSquare, label: 'Multiple Choice' },
        { type: 'date', icon: Calendar, label: 'Date' },
        { type: 'file', icon: FileText, label: 'File Upload' },
    ];

    if (previewMode) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => setPreviewMode(false)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-bold"
                    >
                        <ChevronLeft size={20} /> Back to Editor
                    </button>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                        Preview Mode
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-premium border border-border p-8 space-y-8">
                    <div className="border-b border-border pb-6">
                        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                        <p className="text-muted-foreground mt-1">This is how your form will look to students.</p>
                    </div>

                    {sections.map(section => (
                        <div key={section.id} className="space-y-6">
                            {(section.title || sections.length > 1) && (
                                <h3 className="text-lg font-bold text-primary border-l-4 border-primary pl-3">{section.title}</h3>
                            )}

                            <div className="grid gap-6">
                                {section.fields.map(field => (
                                    <div key={field.id} className="space-y-2">
                                        <label className="text-sm font-bold text-foreground block">
                                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                                        </label>

                                        {['text', 'email', 'number', 'date'].includes(field.type) && (
                                            <input
                                                type={field.type}
                                                className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                placeholder={field.placeholder}
                                            />
                                        )}

                                        {field.type === 'textarea' && (
                                            <textarea
                                                className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-y"
                                                placeholder={field.placeholder}
                                            />
                                        )}

                                        {field.type === 'select' && (
                                            <select className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                                <option>Select an option...</option>
                                                {field.options?.map((opt, i) => <option key={i}>{opt}</option>)}
                                            </select>
                                        )}

                                        {field.type === 'radio' && (
                                            <div className="space-y-2">
                                                {field.options?.map((opt, i) => (
                                                    <label key={i} className="flex items-center gap-2 text-sm">
                                                        <input type="radio" name={field.id} className="text-primary focus:ring-primary/20" />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {field.type === 'file' && (
                                            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-secondary/30">
                                                <FileText className="mx-auto text-muted-foreground mb-2" />
                                                <p className="text-sm text-muted-foreground font-bold">Upload File</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {section.fields.length === 0 && (
                                    <p className="text-sm text-muted-foreground italic">No fields in this section.</p>
                                )}
                            </div>
                        </div>
                    ))}

                    <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
                        Submit Application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-2rem)] overflow-hidden space-x-6 animate-in fade-in duration-500">
            {/* Left Sidebar: Form Elements */}
            <div className="w-64 bg-white rounded-3xl border border-border shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border bg-slate-50">
                    <Link href="/forms" className="flex items-center gap-2 text-muted-foreground hover:text-primary font-bold text-sm mb-4 transition-colors">
                        <ChevronLeft size={16} /> All Forms
                    </Link>
                    <h2 className="font-bold text-foreground">Form Elements</h2>
                    <p className="text-xs text-muted-foreground">Drag or click to add</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {fieldTypes.map((item) => (
                        <button
                            key={item.type}
                            onClick={() => addField(item.type)}
                            className="w-full flex items-center gap-3 p-3 bg-white border border-border rounded-xl hover:border-primary hover:bg-indigo-50 hover:text-primary transition-all group text-left shadow-sm hover:shadow-md"
                        >
                            <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-white group-hover:text-primary transition-colors">
                                <item.icon size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-primary">{item.label}</span>
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-border bg-slate-50">
                    <button
                        onClick={addSection}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-secondary text-foreground rounded-xl font-bold text-sm hover:bg-secondary/80 transition-colors"
                    >
                        <Plus size={16} /> Add Section
                    </button>
                </div>
            </div>

            {/* Center: Canvas */}
            <div className="flex-1 flex flex-col bg-slate-100 rounded-3xl border border-border overflow-hidden">
                {/* Canvas Header */}
                <div className="px-6 py-4 bg-white border-b border-border flex justify-between items-center shadow-sm z-10">
                    <input
                        className="text-xl font-bold bg-transparent outline-none border-b border-transparent focus:border-primary text-foreground placeholder:text-muted-foreground"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled Form"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-2 hover:bg-secondary rounded-xl text-muted-foreground hover:text-foreground transition-colors"
                            title="Form Settings"
                        >
                            <Settings size={20} />
                        </button>
                        <button
                            onClick={() => setPreviewMode(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
                        >
                            <Eye size={18} /> Preview
                        </button>
                        <button
                            onClick={() => toast("Form saved successfully!", "success")}
                            className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all"
                        >
                            <Save size={18} /> Save Form
                        </button>
                    </div>
                </div>

                {/* Canvas Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Section Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSectionId(section.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${activeSectionId === section.id
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white text-muted-foreground hover:bg-white/80'
                                        }`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </div>

                        {/* Active Section Editor */}
                        <div className="bg-white rounded-2xl shadow-sm border border-border p-6 min-h-[500px]">
                            <div className="mb-6 flex items-center gap-4">
                                <input
                                    className="flex-1 text-lg font-bold bg-transparent outline-none border-b border-dashed border-border focus:border-primary pb-1"
                                    value={activeSection.title}
                                    onChange={(e) => {
                                        const updated = sections.map(s => s.id === activeSectionId ? { ...s, title: e.target.value } : s);
                                        setSections(updated);
                                    }}
                                />
                                <Settings size={18} className="text-muted-foreground cursor-pointer hover:text-primary" />
                            </div>

                            <div className="space-y-4">
                                {activeSection.fields.map((field) => (
                                    <div key={field.id} className="group relative bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all">
                                        <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => deleteField(field.id)}
                                                className="p-2 bg-white text-rose-500 rounded-lg hover:bg-rose-50 shadow-sm"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="p-2 bg-white text-muted-foreground rounded-lg cursor-grab shadow-sm">
                                                <Move size={16} />
                                            </div>
                                        </div>

                                        <div className="space-y-4 pr-12">
                                            <input
                                                className="w-full bg-transparent font-bold text-foreground outline-none text-base border-b border-transparent focus:border-primary/20 placeholder:text-muted-foreground"
                                                value={field.label}
                                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                                                placeholder="Question Title"
                                            />

                                            {/* Preview of input type */}
                                            <div className="pointer-events-none opacity-60">
                                                {['text', 'email', 'number', 'date'].includes(field.type) && (
                                                    <div className="w-full px-4 py-2 bg-white border border-border rounded-lg text-sm text-muted-foreground">
                                                        {field.type} input answer
                                                    </div>
                                                )}
                                                {field.type === 'textarea' && (
                                                    <div className="w-full h-20 px-4 py-2 bg-white border border-border rounded-lg text-sm text-muted-foreground">
                                                        Long answer text
                                                    </div>
                                                )}
                                                {(field.type === 'select' || field.type === 'radio') && (
                                                    <div className="space-y-2 pointer-events-auto opacity-100">
                                                        {field.options?.map((opt, idx) => (
                                                            <div key={idx} className="flex items-center gap-2">
                                                                <div className={`w-4 h-4 rounded-full border border-border ${field.type === 'radio' ? 'rounded-full' : 'rounded-sm'}`}></div>
                                                                <input
                                                                    className="flex-1 bg-transparent text-sm border-b border-transparent focus:border-primary outline-none"
                                                                    value={opt}
                                                                    onChange={(e) => {
                                                                        const newOpts = [...(field.options || [])];
                                                                        newOpts[idx] = e.target.value;
                                                                        updateField(field.id, { options: newOpts });
                                                                    }}
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        const newOpts = field.options?.filter((_, i) => i !== idx);
                                                                        updateField(field.id, { options: newOpts });
                                                                    }}
                                                                    className="text-muted-foreground hover:text-rose-500"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => updateField(field.id, { options: [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`] })}
                                                            className="text-xs font-bold text-primary hover:underline pl-6"
                                                        >
                                                            Add Option
                                                        </button>
                                                    </div>
                                                )}
                                                {field.type === 'file' && (
                                                    <div className="w-full px-4 py-6 border-dashed border-2 border-border rounded-lg text-center text-sm text-muted-foreground">
                                                        File upload area
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`req-${field.id}`}
                                                        checked={field.required}
                                                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                                        className="rounded border-border text-primary focus:ring-primary/20"
                                                    />
                                                    <label htmlFor={`req-${field.id}`} className="text-xs font-bold text-muted-foreground cursor-pointer select-none">Required</label>
                                                </div>
                                                <input
                                                    className="flex-1 bg-transparent text-xs text-muted-foreground outline-none border-b border-transparent focus:border-primary/20"
                                                    placeholder="Placeholder text..."
                                                    value={field.placeholder || ""}
                                                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {activeSection.fields.length === 0 && (
                                    <div className="text-center py-12 border-2 border-dashed border-border rounded-xl bg-slate-50/50">
                                        <div className="p-4 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm text-muted-foreground">
                                            <Plus size={32} />
                                        </div>
                                        <p className="font-bold text-foreground">No questions yet</p>
                                        <p className="text-sm text-muted-foreground">Select a field type from the left sidebar to start building.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                title="Form Settings"
                description="Configure basic form details and availability."
                footer={
                    <button onClick={() => setIsSettingsOpen(false)} className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-md">Done</button>
                }
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Form Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none text-sm"
                            placeholder="Describe the purpose of this form..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Start Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                value={dates.start}
                                onChange={(e) => setDates({ ...dates, start: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">End Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                value={dates.end}
                                onChange={(e) => setDates({ ...dates, end: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
