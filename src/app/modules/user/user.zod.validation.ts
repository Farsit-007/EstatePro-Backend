import { z } from 'zod';
import { Role } from './user.constant';

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please provide a Name' }),
    phone: z.string({ required_error: 'Please provide a Phone number' }),
    image: z.string({ required_error: 'Please provide a image' }).default(""),
    email: z
      .string({ required_error: 'Please provide a Email' })
      .email('Please provide a valid Email'),
    password: z.string({ required_error: 'Please provide a password' }),
    role: z.enum([...Role] as [string, ...string[]]),
    city: z.string({ required_error: 'Please provide a city' }),
    address: z.string({ required_error: 'Please provide a address' }),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    role: z.enum([...Role] as [string, ...string[]]).optional(),
    isBlock: z.boolean({ required_error: 'Please provide a value' }).optional(),
  }),
});

export const profileUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please provide a Name' }).optional(),
    phone: z
      .string({ required_error: 'Please provide a Phone number' })
      .optional(),
    image: z
      .string({ required_error: 'Please provide a image' })
      .optional(),

    city: z.string({ required_error: 'Please provide a city' }).optional(),
    address: z
      .string({ required_error: 'Please provide a address' })
      .optional(),
  }),
});
