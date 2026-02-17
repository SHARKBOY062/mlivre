
import { pgTable, text, serial, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  cpf: text("cpf").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email").notNull(),
  birthDate: date("birth_date").notNull(),
  isPcd: text("is_pcd").notNull(),
  gender: text("gender").notNull(),
  maritalStatus: text("marital_status").notNull(),
  race: text("race").notNull(),
  education: text("education").notNull(),
  hasCnh: boolean("has_cnh"),
  licenseType: text("license_type"), // 'completo' | 'apenas_exame'
  hasInsurance: boolean("has_insurance"),
  status: text("status").default("pending"), // 'pending' | 'approved' | 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  hasCnh: z.boolean().optional(),
  licenseType: z.string().optional(),
  hasInsurance: z.boolean().optional(),
  status: z.string().optional(),
});

export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type Candidate = typeof candidates.$inferSelect;
