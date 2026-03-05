import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

export const PublicHeader = () => {
    const { t } = useTranslation(["landing"]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useRole();

    const navLinks = [
        { name: t("landing:landing.header.nav.gallery"), href: "/explore/gallery" },
        { name: t("landing:landing.header.nav.leaderboard"), href: "/explore/leaderboard" },
        { name: t("landing:landing.header.nav.forum"), href: "/explore/forum" },
        { name: t("landing:landing.header.nav.blog"), href: "/explore/blog" },
        { name: t("landing:landing.header.nav.problems"), href: "/explore/problems" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground">LearnWell</span>
                    </Link>

                    <nav className="hidden md:flex ml-10 gap-6">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary relative py-1",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:block">
                        <LanguageSwitcher />
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        {isAuthenticated ? (
                            <Button className="bg-primary hover:bg-primary/90 text-white border-0" onClick={() => navigate("/dashboard")}>
                                {t("landing:landing.header.goToDashboard")}
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" className="text-muted-foreground" onClick={() => navigate("/login")}>
                                    {t("landing:landing.header.login")}
                                </Button>
                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-0" onClick={() => navigate("/login")}>
                                    {t("landing:landing.header.signUpFree")}
                                </Button>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden text-muted-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-background px-4 py-6"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="text-lg font-medium text-foreground"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-border my-2" />
                            <Button variant="outline" className="w-full border-border text-foreground" onClick={() => navigate("/login")}>
                                {t("landing:landing.header.login")}
                            </Button>
                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white border-0" onClick={() => navigate("/login")}>
                                {t("landing:landing.header.signUpFree")}
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
