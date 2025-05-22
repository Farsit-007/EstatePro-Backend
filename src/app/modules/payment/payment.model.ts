import { model, Schema } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required.'],
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required.'],
    },
    requestId: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: [true, 'name is required.'],
    },
    houseId: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: [true, 'Product Id is required.'],
    },
    houseName : {
        type: String,
        trim: true,
        required: [true, 'Product Id is required.'],
      },
    totalPrice: {
      type: Number,
      trim: true,
      required: [true, 'Total Price is required.'],
      min: [0, 'Total Price must be a positive number'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = model<TPayment>('Payment', paymentSchema);