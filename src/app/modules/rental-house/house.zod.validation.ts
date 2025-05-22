import { z } from 'zod';

const houseValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please provide a Name' }),
    location: z.string({ required_error: 'Please provide a location' }),
    description: z.string({ required_error: 'Please provide a description' }),
    amount: z
      .number({
        required_error: 'House price is required',
      })
      .min(0, 'House price cannot be less than 0'),
    rooms: z.string({ required_error: 'Please provide a roomss' }),
    imageUrl: z.array(z.string({ required_error: 'Please provide a images' })),
    amenities : z.array(z.string({ required_error: 'Please provide a images' })), 
  }),
});


const updateHouseValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Please provide a Name' }).optional(),
    location: z.string({ required_error: 'Please provide a location' }).optional(),
    description: z.string({ required_error: 'Please provide a description' }).optional(),
    amount: z
      .number({
        required_error: 'House price is required',
      })
      .min(0, 'House price cannot be less than 0').optional(),
    rooms: z.string({ required_error: 'Please provide a roomss' }).optional(),
    imageUrl: z.array(z.string({ required_error: 'Please provide a images' })).optional(),
    amenities : z.array(z.string({ required_error: 'Please provide a images' })).optional(), 
  }),
});

export const houseValidation = {
  houseValidationSchema,
  updateHouseValidationSchema
};
