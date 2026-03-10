import { vi, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const localeMap = {
  vi: vi,
  en: enUS,
};

export function useDateFnsLocale() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as keyof typeof localeMap;
  return localeMap[currentLang] || vi;
}
