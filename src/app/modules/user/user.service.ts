import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../Errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const updateUserFromDB = async (userId: string, payload: Partial<TUser>) => {
 
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return result;
};

const allUserIntoDB = async () => {
  const result = await User.find({ role: { $ne: 'admin' } });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const updateProfileFromDB = async (
  payload: Partial<TUser>,
  authUser: JwtPayload,
) => {
  const isUserExists = await User.findById(authUser.id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  if (isUserExists.isBlock) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is not active!');
  }
  const result = await User.findOneAndUpdate({ _id :isUserExists.id }, payload, {
    new: true,
  });
  return result;
};

const getMe = async (id: string, role: string) => {
  let result = null;
  if (role === 'tenant') {
    result = await User.findById(id);
  }
  if (role === 'admin') {
    result = await User.findById(id);
  }
  if (role === 'landlord') {
    result = await User.findById(id);
  }
  return result;
};

const getSingleUser = async(email : string)=>{
  const result = await User.findOne({email})
  if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, 'User is not founded');
  }
  return result
}

export const UserServices = {
  createUserIntoDB,
  updateUserFromDB,
  allUserIntoDB,
  deleteUser,
  updateProfileFromDB,
  getMe,
  getSingleUser
};
