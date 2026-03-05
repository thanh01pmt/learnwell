import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "./sections/HeroSection";
import { LiveStatsSection } from "./sections/LiveStatsSection";
import { PublicShowcaseTabs } from "./sections/PublicShowcaseTabs";
import { FeaturesGrid } from "./sections/FeaturesGrid";
import { FinalCTASection } from "./sections/FinalCTASection";
import { FloatingEmojis } from "./sections/FloatingEmojis";
import { SectionDivider } from "./sections/SectionDivider";

export default function LandingPage() {
    return (
        <PublicLayout>
            <div className="relative">
                <FloatingEmojis />
                <div className="relative z-10">
                    <HeroSection />
                    <SectionDivider variant="wave" />
                    <LiveStatsSection />
                    <SectionDivider variant="dots" />
                    <PublicShowcaseTabs />
                    <SectionDivider variant="gradient" />
                    <FeaturesGrid />
                    <SectionDivider variant="dots" />
                    <FinalCTASection />
                </div>
            </div>
        </PublicLayout>
    );
}
