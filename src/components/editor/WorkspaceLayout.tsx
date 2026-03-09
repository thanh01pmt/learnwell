import React from "react";
import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from "react-resizable-panels";
import { cn } from "@/lib/utils";

interface WorkspaceLayoutProps {
    tutorial: React.ReactNode;
    editor: React.ReactNode;
    preview: React.ReactNode;
    console: React.ReactNode;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
    tutorial,
    editor,
    preview,
    console: consolePane,
}) => {
    return (
        <div className="h-full w-full bg-background overflow-hidden flex flex-col">
            <PanelGroup direction="horizontal" className="flex-1">
                {/* Left Pane: Tutorial */}
                <Panel defaultSize={20} minSize={15} className="bg-card/30 backdrop-blur-sm border-r border-border">
                    {tutorial}
                </Panel>

                <PanelResizeHandle className="w-1 bg-border/50 hover:bg-primary/50 transition-colors" />

                {/* Middle Section: Editor & Console */}
                <Panel defaultSize={50} minSize={30}>
                    <PanelGroup direction="vertical">
                        <Panel defaultSize={70} minSize={20} className="bg-card/10">
                            {editor}
                        </Panel>

                        <PanelResizeHandle className="h-1 bg-border/50 hover:bg-primary/50 transition-colors" />

                        <Panel defaultSize={30} minSize={10} className="bg-slate-950/5 border-t border-border">
                            {consolePane}
                        </Panel>
                    </PanelGroup>
                </Panel>

                <PanelResizeHandle className="w-1 bg-border/50 hover:bg-primary/50 transition-colors" />

                {/* Right Pane: Preview */}
                <Panel defaultSize={30} minSize={20} className="bg-card/20 border-l border-border">
                    {preview}
                </Panel>
            </PanelGroup>
        </div>
    );
};
