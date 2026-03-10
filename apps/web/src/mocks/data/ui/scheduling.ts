export const officeHourTeachers = [
    { id: "1", name: "parent:communication.mock.contacts.hoa", subject: "dashboard:mockup.subjects.math", avatar: "teacher1", availability: ["14:00 - 15:00", "16:00 - 17:00"], days: ["common:daysShort.mon", "common:daysShort.wed"] },
    { id: "2", name: "parent:communication.mock.contacts.nam", subject: "dashboard:mockup.subjects.english", avatar: "teacher2", availability: ["09:00 - 10:30"], days: ["common:daysShort.tue", "common:daysShort.thu"] },
];

export const officeHourSessions = [
    { id: "1", teacher: "parent:communication.mock.contacts.hoa", subject: "dashboard:mockup.subjects.math", dateKey: "common:daysShort.mon", dateValue: "09/02", time: "14:00 - 15:00", status: "confirmed", topicKey: "parent:scheduling.mock.topics.calculusQ" },
    { id: "2", teacher: "parent:communication.mock.contacts.nam", subject: "dashboard:mockup.subjects.english", dateKey: "common:daysShort.tue", dateValue: "10/02", time: "09:30 - 10:00", status: "pending", topicKey: "parent:scheduling.mock.topics.essayUnit5" },
];
