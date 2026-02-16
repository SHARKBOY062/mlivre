
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
  isPcd: text("is_pcd").notNull(), // Storing the selected option text
  gender: text("gender").notNull(),
  maritalStatus: text("marital_status").notNull(),
  race: text("race").notNull(),
  education: text("education").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({ 
  id: true, 
  createdAt: true 
});

export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type Candidate = typeof candidates.$inferSelect;
