import { THouse } from "../rental-house/house.interface";
import { TUser } from "../user/user.interface";

export type TStatus = 'pending' | 'approved' | 'rejected';
export type TPaymentStatus = 'Paid' | 'Pending' | 'Failed';
export interface TRequest {
  houseId: string | THouse;
  tenantId: string | TUser;
  status: TStatus;
  requirement : string;
  moveInDate : string;
  rentalDuration : string,
  landlordPhone: string | null;
  paymentStatus: TPaymentStatus  | null
}
