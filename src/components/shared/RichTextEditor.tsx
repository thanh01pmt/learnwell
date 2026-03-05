import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    AlignCenter,
    AlignLeft,
    AlignRight,
    Heading1,
    Heading2,
    Type,
    Code,
    Table as TableIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const { t } = useTranslation("common");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Simulated rich text actions (markdown-style)
    const applyAction = (prefix: string, suffix: string = "") => {
        const el = textareaRef.current;
        if (!el) return;

        const start = el.selectionStart;
        const end = el.selectionEnd;
        const text = el.value;
        const selectedText = text.substring(start, end);
        const before = text.substring(0, start);
        const after = text.substring(end);

        const newValue = `${before}${prefix}${selectedText}${suffix}${after}`;
        onChange(newValue);

        // Reset focus and selection
        setTimeout(() => {
            el.focus();
            el.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
        }, 10);
    };

    return (
        <div className="rounded-2xl border border-border/60 bg-muted/30 overflow-hidden group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            {/* Toolbar */}
            <div className="bg-card border-b border-border/40 p-2 flex flex-wrap items-center gap-1">
                <div className="flex items-center gap-1 mr-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("**", "**")}>
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("_", "_")}>
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("<u>", "</u>")}>
                        <UnderlineIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="w-px h-6 bg-border mx-1" />
                <div className="flex items-center gap-1 mx-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("# ")}>
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("## ")}>
                        <Heading2 className="h-4 w-4" />
                    </Button>
                </div>
                <div className="w-px h-6 bg-border mx-1" />
                <div className="flex items-center gap-1 mx-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("- ")}>
                        <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("1. ")}>
                        <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("> ")}>
                        <Quote className="h-4 w-4" />
                    </Button>
                </div>
                <div className="w-px h-6 bg-border mx-1" />
                <div className="flex items-center gap-1 ml-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("[", "](url)")}>
                        <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("![", "](image-url)")}>
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => applyAction("```\n", "\n```")}>
                        <Code className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info(t("editor.tableFeature"))}>
                        <TableIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="relative">
                <Textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder || t("editor.placeholder")}
                    className="min-h-[300px] border-none bg-transparent focus-visible:ring-0 p-6 resize-none transition-all leading-relaxed"
                />

                {/* Placeholder for "Rich Text Rendering" overlay if we wanted to get fancy */}
                <div className="absolute bottom-2 right-4 flex items-center gap-4">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                        {value.length} {t("editor.stats.characters")} • {value.split(/\s+/).filter(Boolean).length} {t("editor.stats.words")}
                    </span>
                </div>
            </div>
        </div>
    );
}
