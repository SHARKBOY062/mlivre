
import { candidates, type InsertCandidate, type Candidate } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;
  updateCandidate(id: number, updates: Partial<InsertCandidate>): Promise<Candidate>;
  getCandidate(id: number): Promise<Candidate | undefined>;
  getCandidates(): Promise<Candidate[]>;
}

export class DatabaseStorage implements IStorage {
  async createCandidate(insertCandidate: InsertCandidate): Promise<Candidate> {
    const [candidate] = await db
      .insert(candidates)
      .values(insertCandidate)
      .returning();
    return candidate;
  }

  async updateCandidate(id: number, updates: Partial<InsertCandidate>): Promise<Candidate> {
    const [candidate] = await db
      .update(candidates)
      .set(updates)
      .where(eq(candidates.id, id))
      .returning();
    return candidate;
  }

  async getCandidate(id: number): Promise<Candidate | undefined> {
    const [candidate] = await db.select().from(candidates).where(eq(candidates.id, id));
    return candidate;
  }

  async getCandidates(): Promise<Candidate[]> {
    return await db.select().from(candidates);
  }
}

export const storage = new DatabaseStorage();
