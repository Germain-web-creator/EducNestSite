/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  MASTER_DOCTORATE = 'master_doctorate',
  ADMIN = 'admin'
}

export enum Level {
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  M1 = 'M1',
  M2 = 'M2',
  DOCTORAT = 'Doctorat'
}

export enum DocType {
  LICENCE_THESIS = 'licence_thesis',
  MASTER_THESIS = 'master_thesis',
  DOCTORATE_THESIS = 'doctorate_thesis',
  RESEARCH = 'research',
  COURSE = 'course',
  EXAM = 'exam',
  BOOK = 'book'
}

export enum DocStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  schoolId?: string;
  siteId?: string;
  level?: Level;
  subscriptionStatus: 'free' | 'premium';
  subscriptionEndDate?: string;
  downloadCountMonth: number;
  favorites: string[];
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  author: string;
  authorId: string;
  schoolId: string;
  siteId: string;
  level: string;
  domain: string;
  type: DocType;
  fileUrl: string;
  price?: number;
  downloadCount: number;
  status: DocStatus;
  validatedBy?: string;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  siteId: string;
  description: string;
  history?: string;
  objectives?: string;
  image: string;
}

export interface Site {
  id: string;
  name: string;
  location: string;
}

export interface Masterclass {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  likes: number;
  createdAt: string;
}
