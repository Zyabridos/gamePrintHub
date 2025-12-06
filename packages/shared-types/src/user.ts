import { z } from "zod";

export const userPublicSchema = z
  .object({
    id: z.number().int(),
    username: z.string(),
    email: z.string().email(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .strict(); // this will forbid extra properties

export type UserPublic = z.infer<typeof userPublicSchema>;
