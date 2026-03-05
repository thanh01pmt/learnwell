import { PublicLayout } from "@/components/layout/PublicLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
    const { t } = useTranslation(["contact", "navigation"]);
    return (
        <PublicLayout>
            <section className="pt-16 md:pt-24 pb-20">
                <div className="container">
                    <Breadcrumbs items={[{ label: t("contact:contact.title") }]} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-3xl lg:text-5xl font-black mb-8">
                                {t("contact:contact.title")} <span className="text-primary">LearnWell</span>
                            </h1>
                            <p className="text-lg text-muted-foreground mb-12">
                                {t("contact:contact.subtitle")}
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{t("contact:contact.info.email.title")}</h3>
                                        <p className="text-muted-foreground">{t("contact:contact.info.email.value")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 rounded-full bg-info/10 flex items-center justify-center text-info">
                                        <Phone />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{t("contact:contact.info.phone.title")}</h3>
                                        <p className="text-muted-foreground">{t("contact:contact.info.phone.value")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                        <MapPin />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{t("contact:contact.info.address.title")}</h3>
                                        <p className="text-muted-foreground">{t("contact:contact.info.address.value")}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card-modern p-10"
                        >
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground/80">{t("contact:contact.form.name")}</label>
                                        <Input className="rounded-xl" placeholder={t("contact:contact.form.namePlaceholder")} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground/80">{t("contact:contact.form.email")}</label>
                                        <Input className="rounded-xl" placeholder={t("contact:contact.form.emailPlaceholder")} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">{t("contact:contact.form.subject")}</label>
                                    <Input className="bg-white/5 border-white/10" placeholder={t("contact:contact.form.subjectPlaceholder")} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">{t("contact:contact.form.message")}</label>
                                    <Textarea className="bg-white/5 border-white/10 min-h-[150px]" placeholder={t("contact:contact.form.messagePlaceholder")} />
                                </div>

                                <Button className="w-full h-12 rounded-xl border-0">
                                    {t("contact:contact.form.submit")} <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
