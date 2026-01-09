import { z } from "zod";

export const updateTouristZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  languages: z.array(z.string()).optional(),
  travelPreferences: z.string().optional(),
});
export type updateTouristZodSchema = z.infer<typeof updateTouristZodSchema>;