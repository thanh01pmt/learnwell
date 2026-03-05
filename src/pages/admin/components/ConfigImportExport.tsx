import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FileJson, Upload, Download, Copy, Check } from "lucide-react";
import { useFeatureFlag } from "@/contexts/FeatureFlagContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";


export default function ConfigImportExport() {
    const { t } = useTranslation(["dashboard"]);
    const { exportConfig, importConfig } = useFeatureFlag();

    const [jsonText, setJsonText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleExport = () => {
        const json = exportConfig();
        setJsonText(json);

        // Create download link
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `learnwell-feature-config-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success(t("dashboard:mockup.admin.config.messages.exportSuccess"));
    };


    const handleImport = () => {
        if (importConfig(jsonText)) {
            setIsOpen(false);
            setJsonText("");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast.success(t("dashboard:mockup.admin.config.messages.copySuccess"));
    };


    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (open) setJsonText(exportConfig());
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <FileJson className="h-4 w-4" />
                    {t("dashboard:mockup.admin.config.importExport")}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <FileJson className="h-5 w-5 text-primary" />
                        {t("dashboard:mockup.admin.config.title")}
                    </DialogTitle>
                    <DialogDescription>
                        {t("dashboard:mockup.admin.config.description")}
                    </DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Textarea
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                        className="min-h-[300px] font-mono text-xs bg-muted/30 p-4 rounded-2xl"
                        placeholder='{"version": "1.0", ...}'
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={handleCopy}
                    >
                        {isCopied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <DialogFooter className="flex sm:justify-between gap-2">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
                            <Download className="h-4 w-4" />
                            {t("dashboard:mockup.admin.config.actions.downloadJson")}
                        </Button>
                    </div>
                    <Button size="sm" onClick={handleImport} className="gap-2 bg-primary">
                        <Upload className="h-4 w-4" />
                        {t("dashboard:mockup.admin.config.actions.importConfig")}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
