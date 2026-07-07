import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    username: z.string().min(3, 'Username minimal 3 karakter'),
    email: z.string().email('Email tidak valid'),
    phone: z.string().optional(),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string().min(6, 'Konfirmasi password wajib diisi'),
  })
  // Check password and confirm password
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Konfirmasi password tidak sama',
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
