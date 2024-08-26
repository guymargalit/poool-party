import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export const otpAuthSchema = z.object({
  otp: z.string().length(6),
});

export const venmoAuthSchema = z.object({
  username: z.string(),
  password: z.string(),
});
