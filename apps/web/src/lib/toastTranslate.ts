import { toast as sonnerToast } from "sonner";
import i18n from "@/i18n";

export const toast = {
  success: (key: string, options?: any) => {
    return sonnerToast.success((i18n as any).t(key, options));
  },
  error: (key: string, options?: any) => {
    return sonnerToast.error((i18n as any).t(key, options));
  },
  info: (key: string, options?: any) => {
    return sonnerToast.info((i18n as any).t(key, options));
  },
  warning: (key: string, options?: any) => {
    return sonnerToast.warning((i18n as any).t(key, options));
  },
  message: (key: string, options?: any) => {
    return sonnerToast.message((i18n as any).t(key, options));
  },
  // Fallback for raw strings if needed
  raw: sonnerToast,
};
