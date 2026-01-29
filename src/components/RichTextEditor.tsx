"use client";

import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2 } from "lucide-react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, label }: RichTextEditorProps) {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-bold text-foreground">{label}</label>}
            <div className="border border-border rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-border bg-gray-50/50 overflow-x-auto">
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Bold">
                        <Bold size={16} />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Italic">
                        <Italic size={16} />
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Heading 1">
                        <Heading1 size={16} />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Heading 2">
                        <Heading2 size={16} />
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Bullet List">
                        <List size={16} />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Numbered List">
                        <ListOrdered size={16} />
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Link">
                        <LinkIcon size={16} />
                    </button>
                    <button type="button" className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors" title="Image">
                        <ImageIcon size={16} />
                    </button>
                </div>

                {/* Text Area */}
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-4 min-h-[150px] focus:outline-none resize-y text-sm leading-relaxed"
                />
            </div>
            <p className="text-xs text-muted-foreground">
                Markdown shortcuts supported.
            </p>
        </div>
    );
}
