import { PublicLayout } from "@/components/layout/PublicLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
    const { t } = useTranslation(["legal", "navigation"]);
    return (
        <PublicLayout>
            <section className="pt-16 md:pt-24 pb-20">
                <div className="container">
                    <Breadcrumbs items={[{ label: t("navigation:footer.privacy") }]} />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Shield className="h-10 w-10 text-primary" />
                                <h1 className="text-3xl lg:text-5xl font-black">{t("legal:legal.privacy.title")}</h1>
                            </div>
                            <p className="text-muted-foreground text-lg">
                                {t("legal:legal.privacy.lastUpdated", { date: "07/02/2026" })}
                            </p>
                        </div>

                        <div className="space-y-12">
                            {/* Section 1 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Lock className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.privacy.sections.collection.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.privacy.sections.collection.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.privacy.sections.collection.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 2 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center">
                                        <Database className="h-6 w-6 text-info" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.privacy.sections.usage.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.privacy.sections.usage.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.privacy.sections.usage.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                                        <Eye className="h-6 w-6 text-success" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.privacy.sections.protection.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.privacy.sections.protection.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.privacy.sections.protection.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                        <UserCheck className="h-6 w-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.privacy.sections.rights.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.privacy.sections.rights.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.privacy.sections.rights.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 5 */}
                            <div className="glass-card p-8 space-y-4 border-l-4 border-warning">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                                        <AlertTriangle className="h-6 w-6 text-warning" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.privacy.sections.sharing.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.privacy.sections.sharing.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.privacy.sections.sharing.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div className="text-center pt-8">
                                <p className="text-muted-foreground mb-4">
                                    {t("legal:legal.privacy.contactText")}
                                </p>
                                <a href="mailto:privacy@learnwell.vn" className="text-primary font-semibold hover:underline">
                                    privacy@learnwell.vn
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
