import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../user/user.constant';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { House } from '../rental-house/house.model';
import { RentalRequest } from '../request/request.model';

const getMeta = async (user: JwtPayload) => {
  let meta;
  switch (user?.role) {
    case USER_ROLE.admin:
      meta = getAdminData();
      break;
    case USER_ROLE.landlord:
      meta = getLandlordData(user as JwtPayload);
      break;
    default:
      throw new AppError(httpStatus.BAD_GATEWAY, 'Invalid Users');
  }
  return meta;
};

const getAdminData = async () => {
  const totalHouse = await House.estimatedDocumentCount();
  const totalTenant = await User.countDocuments({
    role: USER_ROLE.tenant,
  });
  const totalLandlord = await User.countDocuments({
    role: USER_ROLE.landlord,
  });
  const totalRquest = await RentalRequest.estimatedDocumentCount();
  const totalSell = await RentalRequest.countDocuments({
    paymentStatus: 'Paid',
  });

  return {
    totalHouse,
    totalTenant,
    totalLandlord,
    totalRquest,
    totalSell,
  };
};

const getLandlordData = async (user: JwtPayload) => {
  const isUserExists = await User.findOne({ email: user.userEmail });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Users');
  }
  const totalProperty = await House.countDocuments({
    landlordId: isUserExists._id,
  });

  const houseIds = await House.find({ landlordId: isUserExists._id }).select(
    '_id',
  );
  const houseIdList = houseIds.map((h) => h._id);

  const totalTenant = await RentalRequest.countDocuments({
    houseId: { $in: houseIdList },
    paymentStatus: 'Paid',
  });

  return {
    totalProperty,
    totalTenant,
  };
};

export const MetaServices = {
  getMeta,
};
