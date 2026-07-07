import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  username: z.string().min(3, 'Username minimal 3 karakter'),
  phone: z.string().optional(),
  bio: z.string().max(160, 'Bio maksimal 160 karakter').optional(),
  avatarUrl: z
    .string()
    .url('URL avatar tidak valid')
    .optional()
    .or(z.literal('')),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
