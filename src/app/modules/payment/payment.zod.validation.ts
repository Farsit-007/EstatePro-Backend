import { z } from 'zod';

const paymentValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address.'),
    houseId: z.string().trim().min(1, 'Product Id is required.'),
    name: z.string().trim(),
    requestId : z.string(),
    houseName: z.string().trim(),
    totalPrice: z.number().min(0, 'Total Price must be a positive number'),
    status: z
      .enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'])
      .default('Pending'),
    transaction: z
      .object({
        id: z.string().optional(),
        transactionStatus: z.string().optional(),
        bank_status: z.string().optional(),
        sp_code: z.string().optional(),
        sp_message: z.string().optional(),
        method: z.string().optional(),
        date_time: z.string().optional(),
      })
      .optional(),
  }),
});

export default paymentValidationSchema;