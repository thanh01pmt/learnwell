import { ReactNode } from "react";
import { PublicHeader } from "./PublicHeader";
import { PublicFooter } from "./PublicFooter";

interface PublicLayoutProps {
    children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
            <PublicHeader />
            <main className="flex-grow">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
};
