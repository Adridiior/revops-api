import { z } from "zod";

export const dealCreateSchema = z.object({
  name: z.string().min(2),
  value: z.number().int().nonnegative(),
  stage: z.enum(["LEAD", "QUALIFIED", "PROPOSAL", "WON", "LOST"]).optional(),
  owner: z.string().min(2)
});

export const dealUpdateSchema = dealCreateSchema
  .extend({
    accountId: z.string().uuid().nullable().optional()
  })
  .partial();
