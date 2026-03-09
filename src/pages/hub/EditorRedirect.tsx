import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

export default function EditorRedirect() {
    const { t } = useTranslation("hub");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const mode = searchParams.get("mode");
        const type = searchParams.get("type");

        // Simulate a brief loading sequence before redirecting
        const timer = setTimeout(() => {
            if (mode === "block") {
                navigate(`/editor/block?type=${type}`, { replace: true });
            } else {
                navigate(`/editor/text?type=${type}&lang=${mode}`, { replace: true });
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h2 className="text-2xl font-mono tracking-wider animate-pulse">{t("editor.loading")}</h2>
            <p className="text-slate-400 mt-2 font-mono">
                {t("editor.loadingExtension", { type: searchParams.get("type")?.toUpperCase() || "CORE" })}
            </p>
        </div>
    );
}
