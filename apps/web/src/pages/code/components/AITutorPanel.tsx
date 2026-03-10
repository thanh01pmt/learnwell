import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, Sparkles, BookOpen, Calculator, PlayCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export const AITutorPanel: React.FC = () => {
    const { t } = useTranslation(["code", "common"]);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: t("code:ide.tutor.mock.welcome", { problem: "Two Sum" }),
            timestamp: '11:00 AM',
        },
    ]);

    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            setIsTyping(false);
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: t("code:ide.tutor.mock.suggestion"),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1500);

    };

    return (
        <Card className="flex flex-col h-full border-none rounded-none bg-background/50 backdrop-blur-sm">
            <CardHeader className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">AI Tutor</h3>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {t("code:ide.tutor.context", { problem: "Two Sum", lang: "Python" })}
                            </p>
                        </div>

                    </div>
                    <Badge variant="outline" className="text-[10px] font-normal">GPT-4 Turbo</Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 overflow-hidden relative">
                <ScrollArea className="h-full p-4">
                    <div className="space-y-4 pb-4">
                        <AnimatePresence initial={false}>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <Avatar className="w-8 h-8 border">
                                        {message.role === 'assistant' ? (
                                            <>
                                                <AvatarImage src="/ai-avatar.png" />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    <Bot className="w-4 h-4" />
                                                </AvatarFallback>
                                            </>
                                        ) : (
                                            <>
                                                <AvatarImage src="/user-avatar.png" />
                                                <AvatarFallback className="bg-muted text-muted-foreground">
                                                    <User className="w-4 h-4" />
                                                </AvatarFallback>
                                            </>
                                        )}
                                    </Avatar>
                                    <div className={`flex flex-col max-w-[80%] ${message.role === 'user' ? 'items-end' : ''}`}>
                                        <div className={`p-3 rounded-2xl text-xs leading-relaxed ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-muted/50 border rounded-tl-none'
                                            }`}>
                                            {message.content}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground mt-1 px-1">
                                            {message.timestamp}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <div className="flex gap-3">
                                <Avatar className="w-8 h-8 border">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="p-3 rounded-2xl bg-muted/50 border rounded-tl-none flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin text-primary" />
                                    <span className="text-[10px] text-muted-foreground">{t("code:ide.tutor.typing")}</span>
                                </div>

                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
            </CardContent>

            <CardFooter className="p-4 border-t bg-muted/10 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2 border-primary/20 hover:bg-primary/5">
                        <Calculator className="w-3 h-3" />
                        {t("code:ide.tutor.actions.hint")}
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2 border-primary/20 hover:bg-primary/5">
                        <BookOpen className="w-3 h-3" />
                        {t("code:ide.tutor.actions.explain")}
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 px-2 border-primary/20 hover:bg-primary/5">
                        <PlayCircle className="w-3 h-3" />
                        {t("code:ide.tutor.actions.quiz")}
                    </Button>
                </div>


                <div className="relative w-full">
                    <Textarea
                        placeholder={t("code:ide.tutor.inputPlaceholder")}
                        className="min-h-[80px] pr-10 text-xs resize-none bg-background focus:ring-1 focus:ring-primary/30"

                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button
                        size="icon"
                        className="absolute right-2 bottom-2 h-7 w-7 rounded-full transition-transform active:scale-90"
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                    >
                        <Send className="w-3.5 h-3.5" />
                    </Button>
                </div>
                <p className="text-[9px] text-center text-muted-foreground w-full">
                    {t("code:ide.tutor.disclaimer")}
                </p>

            </CardFooter>
        </Card>
    );
};
