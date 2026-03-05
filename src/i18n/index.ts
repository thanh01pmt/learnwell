import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import initial files for the first load
import commonVi from './locales/vi/common.json';
import commonEn from './locales/en/common.json';
import validationVi from './locales/vi/validation.json';
import validationEn from './locales/en/validation.json';
import navigationVi from './locales/vi/navigation.json';
import navigationEn from './locales/en/navigation.json';
import authVi from './locales/vi/auth.json';
import authEn from './locales/en/auth.json';
import dashboardVi from './locales/vi/dashboard.json';
import dashboardEn from './locales/en/dashboard.json';
import materialsVi from './locales/vi/materials.json';
import materialsEn from './locales/en/materials.json';
import assignmentsVi from './locales/vi/assignments.json';
import assignmentsEn from './locales/en/assignments.json';
import classroomVi from './locales/vi/classroom.json';
import classroomEn from './locales/en/classroom.json';
import landingVi from './locales/vi/landing.json';
import landingEn from './locales/en/landing.json';
import teacherVi from './locales/vi/teacher.json';
import teacherEn from './locales/en/teacher.json';
import parentVi from './locales/vi/parent.json';
import parentEn from './locales/en/parent.json';
import studentVi from './locales/vi/student.json';
import studentEn from './locales/en/student.json';
import studyGuideVi from './locales/vi/studyGuide.json';
import studyGuideEn from './locales/en/studyGuide.json';
import artifactsVi from './locales/vi/artifacts.json';
import artifactsEn from './locales/en/artifacts.json';
import audioVi from './locales/vi/audio.json';
import audioEn from './locales/en/audio.json';
import contactVi from './locales/vi/contact.json';
import contactEn from './locales/en/contact.json';
import contestsVi from './locales/vi/contests.json';
import contestsEn from './locales/en/contests.json';
import credentialsVi from './locales/vi/credentials.json';
import credentialsEn from './locales/en/credentials.json';
import flashcardsVi from './locales/vi/flashcards.json';
import flashcardsEn from './locales/en/flashcards.json';
import forumVi from './locales/vi/forum.json';
import forumEn from './locales/en/forum.json';
import leaderboardVi from './locales/vi/leaderboard.json';
import leaderboardEn from './locales/en/leaderboard.json';
import legalVi from './locales/vi/legal.json';
import legalEn from './locales/en/legal.json';
import mindmapsVi from './locales/vi/mindmaps.json';
import mindmapsEn from './locales/en/mindmaps.json';
import notesVi from './locales/vi/notes.json';
import notesEn from './locales/en/notes.json';
import plannerVi from './locales/vi/planner.json';
import plannerEn from './locales/en/planner.json';
import practiceVi from './locales/vi/practice.json';
import practiceEn from './locales/en/practice.json';
import settingsVi from './locales/vi/settings.json';
import settingsEn from './locales/en/settings.json';
import socialVi from './locales/vi/social.json';
import socialEn from './locales/en/social.json';
import messagesVi from './locales/vi/messages.json';
import messagesEn from './locales/en/messages.json';
import codeVi from './locales/vi/code.json';
import codeEn from './locales/en/code.json';
import profileVi from './locales/vi/profile.json';
import profileEn from './locales/en/profile.json';
import resourcesVi from './locales/vi/resources.json';
import resourcesEn from './locales/en/resources.json';
import authoringVi from './locales/vi/authoring.json';
import authoringEn from './locales/en/authoring.json';
import notificationsVi from './locales/vi/notifications.json';
import notificationsEn from './locales/en/notifications.json';
import featuresVi from './locales/vi/features.json';
import featuresEn from './locales/en/features.json';
import projectsVi from './locales/vi/projects.json';
import projectsEn from './locales/en/projects.json';
import gamificationVi from './locales/vi/gamification.json';
import gamificationEn from './locales/en/gamification.json';
import achievementsVi from './locales/vi/achievements.json';
import achievementsEn from './locales/en/achievements.json';
import portfolioVi from './locales/vi/portfolio.json';
import portfolioEn from './locales/en/portfolio.json';


const resources = {
  vi: {
    common: commonVi,
    validation: validationVi,
    navigation: navigationVi,
    auth: authVi,
    dashboard: dashboardVi,
    materials: materialsVi,
    assignments: assignmentsVi,
    classroom: classroomVi,
    landing: landingVi,
    teacher: teacherVi,
    parent: parentVi,
    student: studentVi,
    studyGuide: studyGuideVi,
    artifacts: artifactsVi,
    audio: audioVi,
    contact: contactVi,
    contests: contestsVi,
    credentials: credentialsVi,
    flashcards: flashcardsVi,
    forum: forumVi,
    leaderboard: leaderboardVi,
    legal: legalVi,
    mindmaps: mindmapsVi,
    notes: notesVi,
    planner: plannerVi,
    practice: practiceVi,
    settings: settingsVi,
    social: socialVi,
    messages: messagesVi,
    code: codeVi,
    profile: profileVi,
    resources: resourcesVi,
    authoring: authoringVi,
    notifications: notificationsVi,
    features: featuresVi,
    projects: projectsVi,
    gamification: gamificationVi,
    achievements: achievementsVi,
    portfolio: portfolioVi,
  },
  en: {
    common: commonEn,
    validation: validationEn,
    navigation: navigationEn,
    auth: authEn,
    dashboard: dashboardEn,
    materials: materialsEn,
    assignments: assignmentsEn,
    classroom: classroomEn,
    landing: landingEn,
    teacher: teacherEn,
    parent: parentEn,
    student: studentEn,
    studyGuide: studyGuideEn,
    artifacts: artifactsEn,
    audio: audioEn,
    contact: contactEn,
    contests: contestsEn,
    credentials: credentialsEn,
    flashcards: flashcardsEn,
    forum: forumEn,
    leaderboard: leaderboardEn,
    legal: legalEn,
    mindmaps: mindmapsEn,
    notes: notesEn,
    planner: plannerEn,
    practice: practiceEn,
    settings: settingsEn,
    social: socialEn,
    messages: messagesEn,
    code: codeEn,
    profile: profileEn,
    resources: resourcesEn,
    authoring: authoringEn,
    notifications: notificationsEn,
    features: featuresEn,
    projects: projectsEn,
    gamification: gamificationEn,
    achievements: achievementsEn,
    portfolio: portfolioEn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
