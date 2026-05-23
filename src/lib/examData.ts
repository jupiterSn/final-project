export type Role = "admin" | "user";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
};

export type Exam = {
  id: number;
  title: string;
  subject: string;
  duration: string;
  description: string;
};

export type Submission = {
  id: number;
  examId: number;
  examTitle: string;
  userEmail: string;
  grade: number;
  submittedAt: string;
};

export const defaultUsers: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@secureexam.com",
    password: "admin123",
    role: "admin",
    isVerified: true,
  },
  {
    id: 2,
    name: "Layla",
    email: "layla@example.com",
    password: "user123",
    role: "user",
    isVerified: true,
  },
];

export const defaultExams: Exam[] = [
  {
    id: 1,
    title: "Web Security Basics",
    subject: "Cybersecurity",
    duration: "30 minutes",
    description: "Covers passwords, secure access, and common web threats.",
  },
  {
    id: 2,
    title: "Authentication and Authorization",
    subject: "Web Development",
    duration: "45 minutes",
    description: "Covers login, roles, protected routes, and access control.",
  },
];

export const defaultSubmissions: Submission[] = [
  {
    id: 1,
    examId: 1,
    examTitle: "Web Security Basics",
    userEmail: "layla@example.com",
    grade: 92,
    submittedAt: "2026-05-23",
  },
];