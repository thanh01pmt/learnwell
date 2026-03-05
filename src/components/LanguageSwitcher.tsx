import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Language configuration
const LANGUAGES = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
];

/**
 * Component to switch between languages
 */
export function LanguageSwitcher() {
    const { i18n } = useTranslation('common');

    const handleChange = (code: string) => {
        i18n.changeLanguage(code);
        localStorage.setItem('i18nextLng', code);
    };

    // Normalize language code (e.g., 'vi-VN' -> 'vi') to match our list
    const currentLang = LANGUAGES.find(l => i18n.language?.startsWith(l.code))?.code || 'vi';

    return (
        <div className="flex items-center gap-2">
            <Select value={currentLang} onValueChange={handleChange}>
                <SelectTrigger className="w-[120px] h-9 bg-muted/50 border-transparent focus:border-primary rounded-xl transition-all">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border bg-card">
                    {LANGUAGES.map((lang) => (
                        <SelectItem
                            key={lang.code}
                            value={lang.code}
                            className="cursor-pointer focus:bg-primary focus:text-primary-foreground rounded-lg m-1"
                        >
                            {lang.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default LanguageSwitcher;
