
import { z } from 'zod';
import { insertCandidateSchema, candidates } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  candidates: {
    create: {
      method: 'POST' as const,
      path: '/api/candidates' as const,
      input: insertCandidateSchema,
      responses: {
        201: z.custom<typeof candidates.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};
