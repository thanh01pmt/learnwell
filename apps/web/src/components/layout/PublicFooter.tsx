import { GraduationCap, Facebook, Linkedin, Github, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

export const PublicFooter = () => {
    const { t } = useTranslation(["landing", "navigation"]);

    return (
        <footer className="relative border-t border-border bg-muted/30 py-16 lg:py-24 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center gap-3 w-fit">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter italic inline-block px-2 -mx-2 py-1 -my-1">LearnWell</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                            {t("landing:landing.footer.description")}
                        </p>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted/50 border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted/50 border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted/50 border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted/50 border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
                                <Github className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-1 hidden lg:block"></div>

                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary italic">{t("landing:landing.footer.sections.products")}</h3>
                        <ul className="space-y-4">
                            <li><Link to="/explore/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("landing:landing.header.nav.gallery")}</Link></li>
                            <li><Link to="/explore/problems" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("landing:landing.footer.nav.problemsCode")}</Link></li>
                            <li><Link to="/explore/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("landing:landing.header.nav.leaderboard")}</Link></li>
                            <li><Link to="/explore/contests" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("landing:landing.footer.nav.contests")}</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary italic">{t("landing:landing.footer.sections.community")}</h3>
                        <ul className="space-y-4">
                            <li><Link to="/explore/forum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("landing:landing.header.nav.forum")}</Link></li>
                            <li><Link to="/explore/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("landing:landing.footer.nav.techBlog")}</Link></li>
                            <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("landing:landing.footer.nav.aboutUs")}</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary italic">{t("landing:landing.footer.sections.newsletter")}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed uppercase font-black">{t("landing:landing.footer.newsletter.note")}</p>
                        <div className="flex gap-2">
                            <Input
                                placeholder={t("landing:landing.footer.newsletter.placeholder")}
                                className="h-10 text-sm rounded-xl"
                            />
                            <Button className="h-10 px-4 rounded-xl font-bold text-xs uppercase tracking-widest">
                                {t("landing:landing.footer.newsletter.submit")}
                            </Button>
                        </div>
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span className="text-xs font-medium">contact@learnwell.vn</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span className="text-xs font-medium">{t("landing:landing.footer.contact.address")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest text-center md:text-left">
                        {t("landing:landing.footer.copyright")}
                    </p>
                    <div className="flex items-center gap-8">
                        <Link to="/privacy" className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors font-bold uppercase tracking-widest">{t("navigation:footer.privacy")}</Link>
                        <Link to="/terms" className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors font-bold uppercase tracking-widest">{t("navigation:footer.terms")}</Link>
                        <Link to="/contact" className="text-[10px] text-muted-foreground/60 hover:text-primary transition-colors font-bold uppercase tracking-widest">{t("landing:landing.footer.links.support")}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
