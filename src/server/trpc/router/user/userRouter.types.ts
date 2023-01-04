import { z } from "zod";

export const GetMeOutput = z
  .object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
  })
  .nullable();
