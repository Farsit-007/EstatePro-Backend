import express from 'express';
import { validation } from '../../middleware/validation';
import paymentValidationSchema from './payment.zod.validation';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.get(
  '/verify',
  PaymentController.verifyPayment,
);

router.post(
  '/',
  validation(paymentValidationSchema),
  PaymentController.createPayment,
);

export const PaymentRoute = router;