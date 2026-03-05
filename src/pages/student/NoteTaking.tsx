import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/shared/RichTextEditor";
import {
    FileText,
    Plus,
    Search,
    FolderOpen,
    Tag,
    Star,
    MoreVertical,
    Calendar,
    ChevronRight,
    BookOpen,
    Pin,
    Clock,
    Trash2,
    Download,
    Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { mockNotes } from "@/mocks/data";


export default function NoteTaking() {
    const { t } = useTranslation(["notes", "common"]);
    const [notes, setNotes] = useState(mockNotes);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0].id);
    const [searchTerm, setSearchTerm] = useState("");

    const selectedNote = notes.find(n => n.id === selectedNoteId);

    const togglePin = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
    };

    const deleteNote = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotes(notes.filter(n => n.id !== id));
        if (selectedNoteId === id) setSelectedNoteId(null);
    };

    const filteredNotes = notes.filter(n =>
        (t(n.title as any) as any).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t(n.subject as any) as any).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="flex h-[calc(100vh-140px)] gap-6 animate-in fade-in duration-500">
                {/* Sidebar: Note List */}
                <div className="w-80 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            {t("notes:title" as any) as any}
                        </h1>
                        <Button size="icon" className="h-8 w-8 rounded-full shadow-lg shadow-primary/20">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t("notes:searchPlaceholder" as any) as any}
                            className="pl-9 glass-card h-10 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                        {filteredNotes.length > 0 ? (
                            filteredNotes.map((note) => (
                                <motion.div
                                    key={note.id}
                                    whileHover={{ x: 4 }}
                                    onClick={() => setSelectedNoteId(note.id)}
                                    className={cn(
                                        "p-4 rounded-2xl cursor-pointer border transition-all relative group",
                                        selectedNoteId === note.id
                                            ? "bg-primary/10 border-primary/30 shadow-sm"
                                            : "bg-card/50 border-border/40 hover:bg-card hover:border-border"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 rounded-md border-primary/20 text-primary">
                                            {t(note.subject as any) as any}
                                        </Badge>
                                        <button
                                            onClick={(e) => togglePin(note.id, e)}
                                            className={cn(
                                                "transition-colors",
                                                note.pinned ? "text-amber-500" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                                            )}
                                        >
                                            <Pin className={cn("h-3 w-3", note.pinned && "fill-amber-500")} />
                                        </button>
                                    </div>
                                    <h3 className="text-sm font-bold truncate leading-tight mb-2 pr-4">{t(note.title as any) as any}</h3>
                                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {note.date}
                                        </span>
                                        <button
                                            onClick={(e) => deleteNote(note.id, e)}
                                            className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                                <FolderOpen className="h-10 w-10 mb-2" />
                                <p className="text-xs">{t("notes:noNotes" as any) as any}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        {selectedNote ? (
                            <motion.div
                                key={selectedNote.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="h-full flex flex-col"
                            >
                                <Card className="flex-1 glass-card border-border/40 flex flex-col overflow-hidden">
                                    <CardHeader className="p-6 border-b border-border/40 flex flex-row items-center justify-between bg-muted/10">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    defaultValue={t(selectedNote.title as any) as any}
                                                    className="text-xl font-bold border-none bg-transparent p-0 h-auto focus-visible:ring-0 w-full lg:min-w-[400px]"
                                                />
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {t(selectedNote.subject as any) as any}</span>
                                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t("notes:lastUpdated" as any, { time: "10:30 AM" }) as any}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0 flex-1 overflow-hidden">
                                        <div className="h-full overflow-y-auto">
                                            <RichTextEditor
                                                value={t(selectedNote.content as any) as any}
                                                onChange={(val) => { }} // In a real app, update state
                                                placeholder={t("notes:editorPlaceholder" as any) as any}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-muted/20 border border-dashed border-border/60 rounded-3xl">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                    <FileText className="h-10 w-10 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">{t("notes:emptyState.title" as any) as any}</h2>
                                <p className="text-muted-foreground max-w-sm">{t("notes:emptyState.description" as any) as any}</p>
                                <Button className="mt-8 gap-2 rounded-xl h-12 px-8 shadow-xl shadow-primary/20">
                                    <Plus className="h-5 w-5" /> {t("notes:emptyState.createButton" as any) as any}
                                </Button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AppLayout>
    );
}
