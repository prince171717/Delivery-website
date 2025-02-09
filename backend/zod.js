import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "minimum 2 characters are required")
    .max(25, "maximum 25 characters are allowed")
    .regex(/^[a-zA-Z\s]*$/, "Only alphabets are allowed")
    .optional(),
  email: z.string().email(),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password cannot be longer than 25 letters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s.,-]*$/, "Invalid characters in location")
    .optional(),

});


export const loginschema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(25),
});