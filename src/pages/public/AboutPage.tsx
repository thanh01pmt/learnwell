import { PublicLayout } from "@/components/layout/PublicLayout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
    const { t } = useTranslation(["landing", "navigation"]);
    return (
        <PublicLayout>
            <section className="pt-16 md:pt-24 pb-20">
                <div className="container">
                    <Breadcrumbs items={[{ label: t("landing:landing.about.title") }]} />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-3xl lg:text-5xl font-black mb-8">{t("landing:landing.about.title")} <span className="text-primary">LearnWell</span></h1>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                            {t("landing:landing.about.description")}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                        <div className="card-modern p-10">
                            <h2 className="text-2xl font-bold mb-4 text-primary">{t("landing:landing.about.vision.title")}</h2>
                            <p className="text-muted-foreground">
                                {t("landing:landing.about.vision.description")}
                            </p>
                        </div>
                        <div className="card-modern p-10">
                            <h2 className="text-2xl font-bold mb-4 text-info">{t("landing:landing.about.mission.title")}</h2>
                            <p className="text-muted-foreground">
                                {t("landing:landing.about.mission.description")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
