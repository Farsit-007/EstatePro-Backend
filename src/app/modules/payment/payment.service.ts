import AppError from '../../Errors/AppError';
import { House } from '../rental-house/house.model';
import { User } from '../user/user.model';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';
import httpStatus from 'http-status';
import { orderUtils } from './payment.utils';
import { RentalRequest } from '../request/request.model';

const createPayment = async (payload: TPayment, client_ip: string) => {
  const house = await House.findById(payload.houseId);
  const user = await User.isUserExists(payload.email);
  if (!house) {
    throw new AppError(httpStatus.NOT_FOUND, 'House is not found');
  }
  const result = await Payment.create(payload);
  const shurjopayPayload = {
    amount: house.amount,
    order_id: result._id,
    currency: 'BDT',
    customer_name: user!.name,
    customer_email: user!.email,
    customer_city: user!.city,
    customer_phone: user!.phone,
    customer_address: user!.address,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  if (payment?.transactionStatus) {
    await Payment.findOneAndUpdate(
      { _id: result._id },
      {
        $set: {
          'transaction.id': payment.sp_order_id,
          'transaction.transactionStatus': payment.transactionStatus,
        },
      },
      { new: true },
    );
  }
  if (payment.checkout_url) {
    await RentalRequest.findByIdAndUpdate(payload.requestId, {
      paymentStatus: 'Pending',
    });
  }
  return payment.checkout_url;
};

const verifyPaymentDB = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment.length) {
    const paymentDoc = await Payment.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Failed'
              : verifiedPayment[0].bank_status == 'Pending'
                ? 'Pending'
                : verifiedPayment[0].bank_status == 'Cancel'
                  ? 'Cancelled'
                  : '',
      },
    );
    if (paymentDoc?.requestId && paymentDoc.status) {
      await RentalRequest.findByIdAndUpdate(paymentDoc.requestId, {
        paymentStatus:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Failed'
              : verifiedPayment[0].bank_status == 'Pending'
                ? 'Pending'
                : verifiedPayment[0].bank_status == 'Cancel'
                  ? 'Cancelled'
                  : '',
      });
    }
  }

  console.log(verifiedPayment);

  return verifiedPayment;
};

export const PaymentService = {
  createPayment,
  verifyPaymentDB,
};
