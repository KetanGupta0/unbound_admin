"use client";

import { Upload, File, X, CheckCircle2 } from "lucide-react";
import { useState, useCallback } from "react";

interface FileUploadProps {
    label?: string;
    accept?: string;
    onUpload?: (files: File[]) => void;
    maxSize?: number; // in MB
}

export default function FileUpload({ label = "Upload File", accept = "*", onUpload, maxSize = 10 }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const newFiles = Array.from(e.dataTransfer.files);
            setFiles(prev => [...prev, ...newFiles]);
            if (onUpload) onUpload(newFiles);
        }
    }, [onUpload]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
            if (onUpload) onUpload(newFiles);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {label && <label className="text-sm font-bold text-foreground">{label}</label>}

            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all text-center ${isDragging
                        ? 'border-primary bg-indigo-50/50'
                        : 'border-border bg-slate-50 hover:bg-slate-100'
                    }`}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleChange}
                    multiple
                    accept={accept}
                />
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <div className={`p-3 rounded-full ${isDragging ? 'bg-white text-primary shadow-sm' : 'bg-white text-muted-foreground'}`}>
                        <Upload size={24} />
                    </div>
                    <p className="font-bold text-sm text-foreground">
                        {isDragging ? "Drop files now" : "Click or Drag to Upload"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Max size: {maxSize}MB
                    </p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl shadow-sm">
                            <div className="p-2 bg-indigo-50 text-primary rounded-lg">
                                <File size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button
                                onClick={() => removeFile(idx)}
                                className="text-muted-foreground hover:text-rose-500 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
