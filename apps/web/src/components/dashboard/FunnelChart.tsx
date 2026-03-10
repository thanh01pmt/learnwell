import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface FunnelDataPoint {
    step: string;
    count: number;
    percentage: number;
}

interface FunnelChartProps {
    data: FunnelDataPoint[];
    className?: string;
}

/**
 * FunnelChart Component (Custom SVG)
 * 
 * Visualizes the drop-off in submissions across stages.
 */
const FunnelChart: React.FC<FunnelChartProps> = ({ data, className }) => {
    const { t } = useTranslation(["teacher", "common"]);
    return (
        <div className={cn("w-full h-full flex flex-col items-center justify-center space-y-6 pt-12", className)}>
            <div className="w-full max-w-2xl px-12 space-y-3">
                {data.map((item, index) => {
                    // Calculate trapezoid widths
                    const nextWidth = data[index + 1] ? (data[index + 1].percentage / 100) * 100 : item.percentage;
                    const currentWidth = item.percentage;

                    return (
                        <div key={item.step} className="relative group">
                            {/* Label Container */}
                            <div className="absolute -left-32 top-1/2 -translate-y-1/2 text-right w-28 pr-4">
                                <div className="text-[10px] font-black uppercase text-muted-foreground opacity-50">{item.step}</div>
                                <div className="text-sm font-bold text-foreground">{item.count} <span className="text-[10px] font-medium text-muted-foreground">IDs</span></div>
                            </div>

                            {/* Visualization Bar */}
                            <div className="flex items-center gap-4">
                                <div className="relative flex-grow flex items-center">
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: `${currentWidth}%`, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                                        className={cn(
                                            "h-12 flex items-center justify-end px-4 text-xs font-black text-white relative",
                                            index === 0 ? "bg-indigo-600 rounded-t-xl" :
                                                index === 1 ? "bg-indigo-500" :
                                                    index === 2 ? "bg-indigo-400" : "bg-success rounded-b-xl"
                                        )}
                                        style={{
                                            clipPath: `polygon(0% 0%, 100% 0%, ${nextWidth === currentWidth ? '100%' : '90%'} 100%, 0% 100%)`,
                                            marginLeft: `${(100 - currentWidth) / 2}%`
                                        }}
                                    >
                                        <span className="drop-shadow-sm">{item.percentage}%</span>
                                    </motion.div>
                                </div>

                                {/* Drop-off indicator */}
                                {index < data.length - 1 && (
                                    <div className="w-24 text-center">
                                        <div className="text-[10px] font-black text-destructive/70 mb-1">
                                            -{item.percentage - data[index + 1].percentage}%
                                        </div>
                                        <div className="h-4 w-[1px] bg-border mx-auto" />
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="bg-destructive/10 text-destructive text-[8px] font-black px-1.5 py-0.5 rounded-full border border-destructive/20"
                                        >
                                            {t('teacher:analytics.drop')}
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-full flex justify-center gap-8 pt-8">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">High Retention</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Passed</span>
                </div>
            </div>
        </div>
    );
};

export default FunnelChart;
