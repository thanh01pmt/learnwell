import { PublicLayout } from "@/components/layout/PublicLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { FileText, CheckCircle, XCircle, Scale, Users, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TermsPage() {
    const { t } = useTranslation(["legal", "navigation"]);
    return (
        <PublicLayout>
            <section className="pt-16 md:pt-24 pb-20">
                <div className="container">
                    <Breadcrumbs items={[{ label: t("navigation:footer.terms") }]} />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <FileText className="h-10 w-10 text-primary" />
                                <h1 className="text-3xl lg:text-5xl font-black">{t("legal:legal.terms.title")}</h1>
                            </div>
                            <p className="text-muted-foreground text-lg">
                                {t("legal:legal.terms.lastUpdated", { date: "07/02/2026" })}
                            </p>
                        </div>

                        <div className="space-y-12">
                            {/* Section 1 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.terms.sections.acceptance.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.terms.sections.acceptance.description")}
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center">
                                        <Users className="h-6 w-6 text-info" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.terms.sections.account.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t("legal:legal.terms.sections.account.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.terms.sections.account.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                                    <p className="text-sm text-muted-foreground">
                                        <strong className="text-warning">{t("common:common.new")}:</strong> {t("legal:legal.terms.sections.account.note")}
                                    </p>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-success" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.terms.sections.rights.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t("legal:legal.terms.sections.rights.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.terms.sections.rights.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 4 */}
                            <div className="glass-card p-8 space-y-4 border-l-4 border-destructive">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                                        <XCircle className="h-6 w-6 text-destructive" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.terms.sections.restrictions.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {t("legal:legal.terms.sections.restrictions.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.terms.sections.restrictions.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 5 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                        <Scale className="h-6 w-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.terms.sections.intellectualPropery.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.terms.sections.intellectualPropery.description")}
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                                        <AlertCircle className="h-6 w-6 text-warning" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.terms.sections.liability.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.terms.sections.liability.description")}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    {(t("legal:legal.terms.sections.liability.items", { returnObjects: true }) as string[]).map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section 7 */}
                            <div className="glass-card p-8 space-y-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold">{t("legal:legal.terms.sections.changes.title")}</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t("legal:legal.terms.sections.changes.description")}
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="text-center pt-8">
                                <p className="text-muted-foreground mb-4">
                                    {t("legal:legal.terms.contactText")}
                                </p>
                                <a href="mailto:legal@learnwell.vn" className="text-primary font-semibold hover:underline">
                                    legal@learnwell.vn
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}
