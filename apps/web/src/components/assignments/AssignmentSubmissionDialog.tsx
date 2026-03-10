import { useState, useCallback, useEffect } from "react";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    File,
    X,
    CheckCircle,
    Loader2,
    AlertCircle,
    FileText,
    Save,
    Trash2,
    Clock,
    Type,
    Bold,
    Italic,
    List,
    Link as LinkIcon,
    AlertTriangle
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface FileWithStatus {
    file: File;
    id: string;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
}

interface AssignmentSubmissionDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    assignmentTitle: string;
    assignmentId: string;
}

export function AssignmentSubmissionDialog({
    isOpen,
    onOpenChange,
    assignmentTitle,
    assignmentId
}: AssignmentSubmissionDialogProps) {
    const { t } = useTranslation(["assignments", "common"]);
    const [files, setFiles] = useState<FileWithStatus[]>([]);
    const [comment, setComment] = useState("");
    const [isDragActive, setIsDragActive] = useState(false);
    const [isAutoSaving, setIsAutoSaving] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionType, setSubmissionType] = useState<'file' | 'text'>('file');
    const [richText, setRichText] = useState("");
    const [lastSavedTime, setLastSavedTime] = useState(new Date().toLocaleTimeString());

    const isLate = true; // Simulated for high-fidelity demonstration

    // Simulate auto-save when comment changes
    useEffect(() => {
        if (comment.length > 0 || richText.length > 0) {
            setIsAutoSaving(true);
            const timer = setTimeout(() => {
                setIsAutoSaving(false);
                setLastSavedTime(new Date().toLocaleTimeString());
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [comment, richText]);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
    }, []);

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return;

        const addedFiles: FileWithStatus[] = Array.from(newFiles).map(file => ({
            file,
            id: Math.random().toString(36).substr(2, 9),
            progress: 0,
            status: 'uploading'
        }));

        setFiles(prev => [...prev, ...addedFiles]);

        // Simulate upload progress for each file
        addedFiles.forEach(fileInfo => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setFiles(current =>
                        current.map(f => f.id === fileInfo.id ? { ...f, progress: 100, status: 'completed' } : f)
                    );
                } else {
                    setFiles(current =>
                        current.map(f => f.id === fileInfo.id ? { ...f, progress } : f)
                    );
                }
            }, 400);
        });
    };

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragActive(false);
        handleFiles(e.dataTransfer.files);
    }, []);

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleSubmit = () => {
        if (submissionType === 'file' && files.length === 0) {
            toast.error(t("assignments:submission.errorNoFiles"));
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success(t("assignments:submission.successTitle"), {
                description: t("assignments:submission.successDescription", { assignmentTitle }),
            });
            onOpenChange(false);
            // Reset state
            setFiles([]);
            setComment("");
            setRichText("");
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] glass-card border-2 border-border/60 p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            Assignment #{assignmentId.slice(0, 4)}
                        </Badge>
                        <AnimatePresence>
                            {isAutoSaving && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                                >
                                    <Save className="h-3 w-3 animate-pulse" />
                                    {t("assignments:submission.autoSaving")}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <DialogTitle className="text-2xl font-bold">{assignmentTitle}</DialogTitle>
                    <DialogDescription className="flex items-center justify-between">
                        <span>{t("assignments:submission.uploadOrWrite")}</span>
                        {isLate && (
                            <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 ml-2 animate-pulse">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                {t("assignments:submission.lateSubmission")}
                            </Badge>
                        )}
                    </DialogDescription>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* Submission Type Toggle */}
                    <div className="flex p-1 bg-muted rounded-xl w-fit">
                        <button
                            onClick={() => setSubmissionType('file')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${submissionType === 'file' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {t("assignments:submission.attachFile")}
                        </button>
                        <button
                            onClick={() => setSubmissionType('text')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${submissionType === 'text' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {t("assignments:submission.writeDirectly")}
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {submissionType === 'file' ? (
                            <motion.div
                                key="file-submission"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                {/* Dropzone */}
                                <motion.div
                                    onDragOver={onDragOver}
                                    onDragLeave={onDragLeave}
                                    onDrop={onDrop}
                                    whileHover={{ scale: 1.01 }}
                                    className={`
                      relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8 text-center
                      ${isDragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border/60 hover:border-primary/50 bg-muted/30'}
                    `}
                                >
                                    <input
                                        type="file"
                                        multiple
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => handleFiles(e.target.files)}
                                    />
                                    <div className={`
                      h-16 w-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors
                      ${isDragActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}
                    `}>
                                        <Upload className="h-8 w-8" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">{t("assignments:submission.dropzone.title")}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {t("assignments:submission.dropzone.description")}
                                    </p>
                                </motion.div>

                                {/* File List */}
                                <AnimatePresence>
                                    {files.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-3"
                                        >
                                            <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                {t("assignments:submission.fileList", { count: files.length })}
                                            </h4>
                                            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                                                {files.map((file) => (
                                                    <motion.div
                                                        key={file.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 20 }}
                                                        className="group flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-card/50"
                                                    >
                                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                            {file.status === 'completed' ? (
                                                                <CheckCircle className="h-5 w-5 text-success" />
                                                            ) : (
                                                                <File className="h-5 w-5 text-primary" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <p className="text-sm font-medium truncate">{file.file.name}</p>
                                                                <button
                                                                    onClick={() => removeFile(file.id)}
                                                                    className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                            {file.status === 'uploading' ? (
                                                                <Progress value={file.progress} className="h-1.5" />
                                                            ) : (
                                                                <p className="text-xs text-muted-foreground">
                                                                    {t("assignments:submission.uploadComplete", { size: (file.file.size / 1024).toFixed(1) })}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="text-submission"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <RichTextEditor
                                    value={richText}
                                    onChange={setRichText}
                                    placeholder={t("assignments:submission.placeholderWrite")}
                                />
                                <p className="text-[10px] text-muted-foreground flex items-center justify-end gap-1">
                                    <Clock className="h-3 w-3" />
                                    {t("assignments:submission.autoSaveTime", { time: lastSavedTime })}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Comment */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-muted-foreground">{t("assignments:submission.noteToTeacher")}</h4>
                        <Textarea
                            placeholder={t("assignments:submission.notePlaceholder")}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="rounded-xl border-border/60 bg-muted/30 focus:bg-card transition-all h-24 resize-none"
                        />
                    </div>
                </div>

                <DialogFooter className="p-6 bg-muted/30 border-t border-border/40">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl"
                        disabled={isSubmitting}
                    >
                        {t("assignments:submission.cancel")}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="rounded-xl px-8 min-w-[140px]"
                        disabled={isSubmitting || (submissionType === 'file' && files.some(f => f.status === 'uploading')) || (submissionType === 'text' && richText.length < 10)}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                {t("assignments:submission.submitting")}
                            </>
                        ) : (
                            t("assignments:submission.submit")
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
