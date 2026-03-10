import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Plus,
    Play,
    Settings,
    MoreVertical,
    Brain,
    Star,
    Trophy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Data
const deckData = {
    id: "d1",
    name: "flashcards:mockup.deckName",
    description: "flashcards:mockup.deckDescription",
    cards: [
        { id: 1, front: "flashcards:mockup.cards.q1", back: "flashcards:mockup.cards.a1", difficult: false },
        { id: 2, front: "flashcards:mockup.cards.q2", back: "flashcards:mockup.cards.a2", difficult: false },
        { id: 3, front: "flashcards:mockup.cards.q3", back: "flashcards:mockup.cards.a3", difficult: true },
        { id: 4, front: "flashcards:mockup.cards.q4", back: "flashcards:mockup.cards.a4", difficult: false },
        { id: 5, front: "flashcards:mockup.cards.q5", back: "flashcards:mockup.cards.a5", difficult: true },
    ]
};

export default function Flashcards() {
    const { t } = useTranslation(["flashcards", "common"]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCount, setKnownCount] = useState(0);
    const [unknownCount, setUnknownCount] = useState(0);
    const [showSummary, setShowSummary] = useState(false);

    const currentCard = deckData.cards[currentIndex];
    const progress = ((currentIndex) / deckData.cards.length) * 100;

    const handleNext = (known: boolean) => {
        if (known) setKnownCount(prev => prev + 1);
        else setUnknownCount(prev => prev + 1);

        if (currentIndex < deckData.cards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
            }, 300);
        } else {
            setShowSummary(true);
        }
    };

    const resetDeck = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setKnownCount(0);
        setUnknownCount(0);
        setShowSummary(false);
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                                <Brain className="h-6 w-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{t("flashcards:title" as any) as any}</h1>
                        </div>
                        <p className="text-muted-foreground ml-10">{t(deckData.name as any) as any} • {deckData.cards.length} {t("flashcards:cards" as any) as any}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2 glass-card">
                            <Plus className="h-4 w-4" />
                            {t("flashcards:addCard" as any) as any}
                        </Button>
                        <Button variant="outline" size="icon" className="glass-card">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {!showSummary ? (
                    <div className="space-y-8">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
                                <span>{t("flashcards:progress" as any) as any}</span>
                                <span>{currentIndex + 1} / {deckData.cards.length} {t("flashcards:cards" as any) as any}</span>
                            </div>
                            <Progress value={progress} className="h-2 rounded-full" />
                        </div>

                        {/* Flashcard Container */}
                        <div className="relative h-[400px] perspective-1000">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    className="w-full h-full cursor-pointer"
                                    onClick={() => setIsFlipped(!isFlipped)}
                                >
                                    <motion.div
                                        className="w-full h-full relative preserve-3d transition-transform duration-500 font-sans"
                                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    >
                                        {/* Front */}
                                        <Card className="absolute inset-0 backface-hidden glass-card flex flex-col items-center justify-center p-12 text-center border-2 border-primary/10 shadow-xl group hover:border-primary/30 transition-all">
                                            <Badge variant="outline" className="absolute top-6 left-6 uppercase tracking-widest text-[10px]">{t("flashcards:front" as any) as any}</Badge>
                                            {currentCard.difficult && <Star className="absolute top-6 right-6 h-5 w-5 text-amber-500 fill-amber-500" />}
                                            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                                                {t(currentCard.front as any) as any}
                                            </h2>
                                            <p className="text-muted-foreground text-sm mt-8 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <RotateCcw className="h-4 w-4" /> {t("flashcards:tapToSeeBack" as any) as any}
                                            </p>
                                        </Card>

                                        {/* Back */}
                                        <Card className="absolute inset-0 backface-hidden glass-card flex flex-col items-center justify-center p-12 text-center border-2 border-primary/20 bg-primary/5 rotate-y-180">
                                            <Badge variant="outline" className="absolute top-6 left-6 uppercase tracking-widest text-[10px] text-primary border-primary/30">{t("flashcards:back" as any) as any}</Badge>
                                            <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight">
                                                {t(currentCard.back as any) as any}
                                            </h2>
                                            <div className="absolute bottom-10 flex gap-4">
                                                <Button
                                                    variant="outline"
                                                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 px-6 gap-2"
                                                    onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                                                >
                                                    <XCircle className="h-4 w-4" /> {t("flashcards:unknown" as any) as any}
                                                </Button>
                                                <Button
                                                    className="bg-primary hover:bg-primary text-white shadow-lg shadow-primary/30 px-6 gap-2"
                                                    onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                                                >
                                                    <CheckCircle2 className="h-4 w-4" /> {t("flashcards:known" as any) as any}
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-center gap-8">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 rounded-full border border-border/40 hover:bg-muted"
                                disabled={currentIndex === 0}
                                onClick={() => setCurrentIndex(prev => prev - 1)}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <div className="text-sm font-bold text-muted-foreground bg-muted p-2 px-4 rounded-full">
                                {currentIndex + 1} / {deckData.cards.length}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-12 w-12 rounded-full border border-border/40 hover:bg-muted"
                                disabled={currentIndex === deckData.cards.length - 1}
                                onClick={() => setCurrentIndex(prev => prev + 1)}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-12 space-y-8"
                    >
                        <div className="relative">
                            <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center">
                                <Trophy className="h-16 w-16 text-primary" />
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-full"
                            >
                                <Star className="h-5 w-5 fill-white" />
                            </motion.div>
                        </div>

                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold">{t("flashcards:excellent" as any) as any}</h2>
                            <p className="text-muted-foreground">{t("flashcards:completedDescription" as any) as any}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                            <Card className="glass-card text-center p-6 border-primary/20">
                                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">{t("flashcards:known" as any) as any}</p>
                                <p className="text-3xl font-black text-primary">{knownCount}</p>
                            </Card>
                            <Card className="glass-card text-center p-6 border-red-500/20">
                                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">{t("flashcards:toReview" as any) as any}</p>
                                <p className="text-3xl font-black text-red-600">{unknownCount}</p>
                            </Card>
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={resetDeck} variant="outline" className="gap-2 px-8 rounded-xl h-12">
                                <RotateCcw className="h-4 w-4" /> {t("flashcards:resetDeck" as any) as any}
                            </Button>
                            <Button className="gap-2 px-8 rounded-xl h-12 bg-indigo-600 hover:bg-indigo-700">
                                <Play className="h-4 w-4" /> {t("flashcards:otherDecks" as any) as any}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>

            <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
        </AppLayout>
    );
}
