import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Portfolio data schemas
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  details: z.array(z.string()),
  githubUrl: z.string().optional()
});

export const SkillToolSchema = z.object({
  name: z.string(),
  icon: z.string(),
  wikipediaUrl: z.string()
});

export const SkillCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  tools: z.array(SkillToolSchema)
});

export const CertificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  provider: z.string(),
  year: z.string(),
  description: z.string(),
  status: z.string(),
  statusColor: z.string(),
  icon: z.string()
});

export const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  duration: z.string(),
  achievements: z.array(z.string())
});

export const GalleryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imagePath: z.string(),
  category: z.enum(["project", "certificate", "team", "achievement"]),
  date: z.string().optional()
});

export type Project = z.infer<typeof ProjectSchema>;
export type SkillTool = z.infer<typeof SkillToolSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
