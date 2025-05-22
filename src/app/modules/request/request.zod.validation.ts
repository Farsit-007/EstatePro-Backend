import { z } from 'zod';
import { PaymentStatus, Status } from './request.constant';

const requestValidationSchema = z.object({
  body: z.object({
    houseId: z.string({ required_error: 'Please provide the house ID' }),
    tenantId: z.string({ required_error: 'Please provide the tenant ID' }),
    moveInDate: z.string({ required_error: 'Date is required' }),
    rentalDuration: z.string({ required_error: 'Duration is requred' }),
    requirement: z.string({ required_error: 'Requirement is requred' }),
    status: z.enum([...Status] as [string, ...string[]]).default('pending'),
    landlordPhone: z.string().nullable().default(null),
    paymentStatus: z
      .enum([...PaymentStatus] as [string, ...string[]])
      .nullable()
      .default(null),
  }),
});

const updateRequestValidationSchema = z.object({
  body: z.object({
    status: z.enum([...Status] as [string, ...string[]]).optional(),
    landlordPhone: z.string().nullable().default(null).optional(),
  }),
});

export const RequestValidation = {
  requestValidationSchema,
  updateRequestValidationSchema
};
