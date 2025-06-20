import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  generateResetPasswordEmailHtml,
  sendEmail,
} from '../../utils/EmailSender';
const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  const userStatus = user.isBlock;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const jwtPayload = {
    id: user._id,
    userEmail: user.email,
    phone: user.phone,
    role: user.role,
    name: user.name,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '1d',
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    '10d',
  );
  return {
    token,
    refreshToken,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExists(userData.userEmail);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  console.log(user);

  const userStatus = user.isBlock;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(12));

  const result = await User.findOneAndUpdate(
    {
      _id: user._id,
      email: user.email,
      phone: user.phone,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  );
  return null;
};

const refreshToken = async (accessToken: string) => {
  //Check the Token is valid
  const decoded = jwt.verify(
    accessToken,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userEmail, iat } = decoded;

  const user = await User.isUserExists(userEmail);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlock;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized This One!',
    );
  }

  const jwtPayload = {
    id: user._id,
    userEmail: user.email,
    phone: user.phone,
    role: user.role,
    name: user.name,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '1d',
  );

  return {
    token,
  };
};

const sendResetEmail = async (email: string) => {
  const user = await User.isUserExists(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const userStatus = user?.isBlock;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '5m',
  );

  const resetUiLink = `${config.reset_password_ui_link as string}?id=${user?.email}&token=${resetToken}`;
  await sendEmail(user?.email, generateResetPasswordEmailHtml(resetUiLink));
};

const changeResetPasswordIntoDB = async (
  payload: { password: string; email: string },
  token: string,
) => {
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const userStatus = user.isBlock;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail } = decoded;
  if (user.email !== userEmail) {
    throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized!');
  }
  const newHashedPassword = await bcrypt.hash(payload.password, Number(12));

  const result = await User.findOneAndUpdate(
    {
      _id: user._id,
      email: userEmail,
      phone: user.phone,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  )
  return null;
};

export const AuthServices = {
  loginUserIntoDB,
  changePasswordIntoDB,
  refreshToken,
  sendResetEmail,
  changeResetPasswordIntoDB,
};
