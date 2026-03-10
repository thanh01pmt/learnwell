import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileDown, Upload, AlertCircle, FileJson } from 'lucide-react';
import { toast } from "sonner";

interface JsonImportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImport: (data: Record<string, unknown>) => void;
}

export function JsonImportModal({ open, onOpenChange, onImport }: JsonImportModalProps) {
    const [jsonText, setJsonText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation('contests');

    const handleImport = () => {
        try {
            const parsed = JSON.parse(jsonText);
            onImport(parsed);
            setJsonText('');
            setError(null);
            onOpenChange(false);
            toast.success(t('management.import.success'));
        } catch (e) {
            setError(t('management.import.invalid'));
            toast.error(t('management.import.error'));
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setJsonText(content);
            setError(null);
        };
        reader.readAsText(file);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] border-none shadow-2xl bg-card/95 backdrop-blur-xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileJson className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold">{t('management.import.title')}</DialogTitle>
                            <DialogDescription className="text-sm font-medium">{t('management.import.subtitle')}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between group">
                            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t('management.import.paste')}</Label>
                            <label
                                htmlFor="file-upload"
                                className="text-xs font-bold text-primary hover:text-primary/80 cursor-pointer flex items-center gap-1.5 transition-colors"
                            >
                                <Upload className="h-3 w-3" />
                                {t('management.import.upload')}
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept=".json"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </div>
                        <Textarea
                            placeholder='{ "title": "My Contest", ... }'
                            className="h-[250px] font-mono text-xs bg-muted/30 border-border/50 focus-visible:ring-primary/20 resize-none leading-relaxed"
                            value={jsonText}
                            onChange={(e) => {
                                setJsonText(e.target.value);
                                setError(null);
                            }}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-xs font-bold text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-1">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>{t('management.import.cancel')}</Button>
                    <Button
                        onClick={handleImport}
                        disabled={!jsonText.trim()}
                        className="bg-primary hover:bg-primary/90 px-8 font-bold"
                    >
                        {t('management.import.start')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
