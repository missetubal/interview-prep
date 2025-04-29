import { z } from 'zod';

export const authFormSchema = (type: FormType) =>
  z.object({
    fullname: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });

export type AuthFormType = ReturnType<typeof authFormSchema>;
