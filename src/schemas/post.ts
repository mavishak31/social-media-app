import { z } from 'zod';

export const createPostSchema = z.object({
  image: z
    .instanceof(File, { message: 'Gambar wajib dipilih' })
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Ukuran gambar maksimal 5MB'),
  caption: z.string().max(300, 'Caption maksimal 300 karakter').optional(),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
