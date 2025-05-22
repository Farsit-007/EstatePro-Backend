/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { THouse } from './house.interface';
import { House } from './house.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { houseSearchAbleFields } from './house.constant';

const createHouseIntoDB = async (payload: THouse, userId: JwtPayload) => {
  const data = { ...payload, landlordId: userId.id };
  const result = await House.create(data);
  return result;
};

const getLandloardOwnHouse = async (user: JwtPayload) => {
  const isUser = await User.findOne({ _id: user.id });
  if (!isUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  const result = await House.find({ landlordId: isUser._id });

  return result;
};

const getAllListingHouse = async (query: Record<string, unknown>) => {
  const houseQuery = new QueryBuilder(
    House.find().populate('landlordId'),
    query,
  )
    .search(houseSearchAbleFields)
    .filter()
    .sort()
    .paginate();

  const meta = await houseQuery.countTotal();
  const result = await houseQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getFeaturedListingHouse = async () => {
  const result = await House.find().sort({ createdAt: -1 }).limit(4);
  return result;
};

const updateListingHouse = async (
  houseId: string,
  payload: Partial<THouse>,
) => {
  const isHouseEsists = await House.findById(houseId);
  if (!isHouseEsists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This house is not found');
  }
  const result = await House.findByIdAndUpdate(houseId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteHouse = async (id: string) => {
  const result = await House.findByIdAndDelete(id);
  return result;
};

const getSingleHouse = async (id: string) => {
  const result = await House.findById(id);
  return result;
};

const getSearchedAllListingHouse = async (query: Record<string, unknown>) => {
  const houseQuery = new QueryBuilder(
    House.find().populate('landlordId'),
    query,
  ).search(houseSearchAbleFields);
  const result = await houseQuery.modelQuery;
  return result;
};

export const HouseServices = {
  createHouseIntoDB,
  getLandloardOwnHouse,
  getAllListingHouse,
  updateListingHouse,
  deleteHouse,
  getSearchedAllListingHouse,
  getSingleHouse,
  getFeaturedListingHouse
};
