import { TPaymentStatus, TStatus } from './request.interface';

export const Status: TStatus[] = ['pending', 'approved', 'rejected'];
export const PaymentStatus: TPaymentStatus[] = [
  'Paid',
  'Pending',
  'Failed'
];
