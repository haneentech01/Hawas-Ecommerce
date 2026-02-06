import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('auth.errors.invalidEmail'),
  password: z.string().min(6, 'auth.errors.passwordTooShort'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'auth.errors.nameTooShort'),
  email: z.string().email('auth.errors.invalidEmail'),
  password: z.string().min(6, 'auth.errors.passwordTooShort'),
  confirmPassword: z.string().min(6, 'auth.errors.passwordTooShort'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'auth.errors.passwordsNotMatch',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
