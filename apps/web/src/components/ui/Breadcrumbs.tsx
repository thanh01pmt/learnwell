import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
    const { t } = useTranslation('navigation');

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex mb-6 animate-fade-in", className)}
        >
            <ol className="flex items-center space-x-2">
                <li>
                    <Link
                        to="/"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                        <Home className="h-4 w-4" />
                        <span className="hidden sm:inline">{t("home")}</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        {item.href ? (
                            <Link
                                to={item.href}
                                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-foreground text-sm font-semibold truncate max-w-[200px] sm:max-w-none">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
