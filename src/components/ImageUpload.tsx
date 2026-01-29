"use client";

import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
    label: string;
    description?: string;
    onUpload?: (files: File[]) => void;
    multiple?: boolean;
    maxFiles?: number;
}

export default function ImageUpload({ label, description, onUpload, multiple = false, maxFiles = 1 }: ImageUploadProps) {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // In a real app, this would handle file selection and upload
    const handleMockUpload = () => {
        // Simulating an upload by adding a placeholder image
        const newImage = "https://placehold.co/600x400/png";

        if (multiple) {
            if (previewUrls.length < maxFiles) {
                setPreviewUrls([...previewUrls, newImage]);
            }
        } else {
            setPreviewUrls([newImage]);
        }
    };

    const removeImage = (index: number) => {
        const newUrls = [...previewUrls];
        newUrls.splice(index, 1);
        setPreviewUrls(newUrls);
    };

    return (
        <div className="space-y-3">
            <div>
                <label className="text-sm font-bold text-foreground block">{label}</label>
                {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            </div>

            <div className="flex flex-wrap gap-4">
                {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative group w-32 h-24 rounded-xl overflow-hidden border border-border shadow-sm">
                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-rose-500 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}

                {(multiple ? previewUrls.length < maxFiles : previewUrls.length === 0) && (
                    <button
                        onClick={handleMockUpload}
                        className="w-32 h-24 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-all gap-2"
                    >
                        <Upload size={20} />
                        <span className="text-xs font-bold">Upload</span>
                    </button>
                )}
            </div>
        </div>
    );
}
