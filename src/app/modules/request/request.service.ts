import { JwtPayload } from 'jsonwebtoken';
import { THouse } from '../rental-house/house.interface';
import { TRequest } from './request.interface';
import { RentalRequest } from './request.model';
import { TUser } from '../user/user.interface';
import { Types } from 'mongoose';

const createRequest = async (payload: TRequest) => {
  const result = await RentalRequest.create(payload);
  return result;
};

//Landlord
const getListingOwnRequest = async (user: JwtPayload) => {
  const houses = await RentalRequest.find()
    .populate([
      {
        path: 'houseId',
        model: 'House',
      },
      {
        path: 'tenantId',
        model: 'User',
      },
    ])
    .lean();
  const result = houses.filter((h) => {
    const house = h.houseId as THouse;
    return house && house.landlordId?.toString() === user.id;
  });
  return result;
};

//Tenant
const getTenatRequest = async (user: JwtPayload) => {
  const result = await RentalRequest.find({ tenantId: user.id }).populate([
    {
      path: 'houseId',
      model: 'House',
    },
    {
      path: 'tenantId',
      model: 'User',
    },
  ])
  .lean();;
  return result;
};


//Admin
const getAllRequest = async () => {
  const result = await RentalRequest.find()
    .populate([
      {
        path: 'houseId',
        model: 'House',
        populate: {
          path: 'landlordId',
          model: 'User',
        },
      },
      {
        path: 'tenantId',
        model: 'User',
      },
    ])
    .lean();
  return result;
};


const updateRequestByLandlord = async (
  id: string,
  payload: Partial<TRequest>,
) => {
  const result = await RentalRequest.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getSingleRequest = async (id: string) => {
  const result = await RentalRequest.findById(id)
    .populate([
      {
        path: 'houseId',
        model: 'House',
        populate: {
          path: 'landlordId',
          model: 'User',
        },
      },
      {
        path: 'tenantId',
        model: 'User',
      },
    ])
    .lean();
  return result;
};



const getTenantRequest = async (user: JwtPayload) => {
  const tenantObjectId = new Types.ObjectId(user.id); 

  const result = await RentalRequest.aggregate([
    {
      $match: {
        tenantId: tenantObjectId,
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        status: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);

  return result;
};

export const RequestService = {
  createRequest,
  updateRequestByLandlord,
  getListingOwnRequest,
  getTenatRequest,
  getSingleRequest,
  getAllRequest,
  getTenantRequest
};
