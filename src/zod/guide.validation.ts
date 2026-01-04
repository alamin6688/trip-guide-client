// /zod/guide.validation.ts
import { z } from "zod";

/**
 * Zod schema to validate guide creation
 */
export const createGuideZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password is required" }),
    contactNumber: z.string().min(1, { message: "Contact number is required" }),
    address: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    languages: z
      .array(z.string().min(1))
      .min(1, { message: "At least one language is required" }),
    gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required" }),
    bio: z.string().optional(),

    dailyRate: z.number("Daily rate must be a number"),
    experience: z.number("Experience must be a number"),
    guideCategories: z
      .array(z.object({ id: z.string() }))
      .min(1, { message: "At least one category is required" }),
    profilePhoto: z.any().optional(), // file upload, can be File or string
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Zod schema to validate guide update
 * All fields are optional for partial updates
 */
export const updateGuideZodSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  languages: z.array(z.string()).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  bio: z.string().optional(),
  dailyRate: z.number().optional(),
  experience: z.number().optional(),
  guideCategories: z.array(z.object({ id: z.string() })).optional(),
  removedCategories: z.array(z.string()).optional(),
  profilePhoto: z.any().optional(),
});
