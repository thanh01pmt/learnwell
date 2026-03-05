import React, { createContext, useContext, useState, useEffect } from "react";
import {
    PermissionConfig,
    UserRole,
    FeatureFlagContextType,
    FeaturePermissions,
    RoutePermissions
} from "../types/features";
import { FEATURE_REGISTRY } from "../utils/featureRegistry";
import { toast } from "sonner";

const STORAGE_KEY = "learnwell_feature_config";

const getDefaultConfig = (): PermissionConfig => {
    const features: { [key: string]: FeaturePermissions } = {};

    FEATURE_REGISTRY.forEach(feature => {
        const routePermissions: { [key: string]: RoutePermissions } = {};
        feature.routes.forEach(route => {
            const perms: RoutePermissions = {
                admin: true, // Admin always has access
                teacher: route.defaultRoles.includes("teacher"),
                student: route.defaultRoles.includes("student"),
                parent: route.defaultRoles.includes("parent")
            };
            routePermissions[route.path] = perms;
        });

        features[feature.id] = {
            enabled: true,
            routes: routePermissions
        };
    });

    return {
        version: "1.0",
        lastModified: new Date().toISOString(),
        modifiedBy: "System",
        features,
        contentAccess: {
            classGroups: [
                {
                    id: "class-10a1",
                    name: "Lớp 10A1",
                    teacherId: "t1",
                    studentIds: ["s1", "s2", "s3"],
                    accessibleResources: ["res1", "res2"]
                }
            ]
        },
        webhooks: [
            {
                id: "webhook-1",
                url: "https://api.example.com/webhooks/reports",
                events: ["grade_submission", "attendance_alert"],
                enabled: true
            }
        ]
    };
};

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<PermissionConfig>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : getDefaultConfig();
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }, [config]);

    const hasAccess = (path: string, role: UserRole, context?: any): boolean => {
        // 1. Find the feature and route
        let featureId = "";
        let routePath = "";
        let parentPath: string | undefined = undefined;

        for (const f of FEATURE_REGISTRY) {
            const r = f.routes.find(route => route.path === path);
            if (r) {
                featureId = f.id;
                routePath = r.path;
                parentPath = r.parentPath;
                break;
            }
        }

        if (!featureId) return true; // Default allow for unregistered routes

        const featureConfig = config.features[featureId];
        if (!featureConfig?.enabled) return false;

        // 2. Check specific route permission
        const routePerms = featureConfig.routes[routePath];
        if (routePerms && !routePerms[role]) return false;

        // 3. Hierarchical Check: If current route has a parent, parent must be enabled too
        if (parentPath) {
            const canAccessParent = hasAccess(parentPath, role, context);
            if (!canAccessParent) return false;
        }

        // 4. Special "Parent-Child" Additive/Restrictive Logic
        if (role === 'parent' && context?.studentId) {
            // Mock logic: Parents can only access profile editing if it matches their student
            if (path.includes('/profile') && context.targetStudentId && context.studentId !== context.targetStudentId) {
                return false;
            }
        }

        return true;
    };

    const updateRoutePermission = (featureId: string, path: string, role: UserRole, enabled: boolean) => {
        if (role === 'admin' && !enabled) {
            toast.error("Không thể tắt quyền truy cập của Admin");
            return;
        }

        setConfig(prev => {
            const newConfig = { ...prev };
            const feature = newConfig.features[featureId];
            if (feature) {
                feature.routes[path][role] = enabled;

                // AUTO-DISABLE CHILDREN: If we just disabled a parent, disable all children recursively
                if (!enabled) {
                    const disableChildren = (parentPath: string) => {
                        FEATURE_REGISTRY.forEach(f => {
                            f.routes.forEach(r => {
                                if (r.parentPath === parentPath && feature.routes[r.path]) {
                                    feature.routes[r.path][role] = false;
                                    disableChildren(r.path);
                                }
                            });
                        });
                    };
                    disableChildren(path);
                }
            }
            newConfig.lastModified = new Date().toISOString();
            return newConfig;
        });
    };

    const toggleFeature = (featureId: string, enabled: boolean) => {
        setConfig(prev => {
            const newConfig = { ...prev };
            if (newConfig.features[featureId]) {
                newConfig.features[featureId].enabled = enabled;
            }
            newConfig.lastModified = new Date().toISOString();
            return newConfig;
        });
    };

    const resetToDefault = () => {
        setConfig(getDefaultConfig());
        toast.success("Đã khôi phục cài đặt mặc định");
    };

    const importConfig = (json: string): boolean => {
        try {
            const parsed = JSON.parse(json);
            // Basic validation
            if (parsed.version && parsed.features) {
                setConfig(parsed);
                toast.success("Nhập cấu hình thành công");
                return true;
            }
            throw new Error("Invalid config format");
        } catch (e) {
            toast.error("Lỗi khi nhập cấu hình: " + (e as Error).message);
            return false;
        }
    };

    const exportConfig = (): string => {
        return JSON.stringify(config, null, 2);
    };

    return (
        <FeatureFlagContext.Provider value={{
            config,
            hasAccess,
            updateRoutePermission,
            toggleFeature,
            resetToDefault,
            importConfig,
            exportConfig
        }}>
            {children}
        </FeatureFlagContext.Provider>
    );
};

export const useFeatureFlag = () => {
    const context = useContext(FeatureFlagContext);
    if (context === undefined) {
        throw new Error("useFeatureFlag must be used within a FeatureFlagProvider");
    }
    return context;
};
