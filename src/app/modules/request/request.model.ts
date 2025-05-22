import { model, Schema } from 'mongoose';
import { TRequest } from './request.interface';
import { PaymentStatus, Status } from './request.constant';

const requestSchema = new Schema<TRequest>(
  {
    houseId: {
      type: Schema.Types.ObjectId,
      ref: 'House',
      required : true
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required : true
    },
    requirement :{
      type: String,
      required : true
    },
    status: {
      type: String,
      enum: Status,
      default: 'pending',
      required : true
    },
    moveInDate :{
      type : String,
      required : true
    },
    rentalDuration :{
      type : String,
      required : true
    },
    landlordPhone: {
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: PaymentStatus,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const RentalRequest = model<TRequest>('Request', requestSchema);
