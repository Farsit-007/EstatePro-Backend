import { Types } from 'mongoose';

export type TPayment = {
  email: string;
  name: string;
  houseId: Types.ObjectId;
  houseName :string ;
  totalPrice: number;
  requestId :Types.ObjectId;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};