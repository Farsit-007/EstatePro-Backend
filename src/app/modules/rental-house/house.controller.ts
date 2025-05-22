import { catchAsync } from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { HouseServices } from './house.service';
import { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../utils/sendResponse';

const createHouse = catchAsync(async (req, res) => {
  const result = await HouseServices.createHouseIntoDB(req.body,req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Rental House created successfully',
    data: result,
  });
});

const getLandlordHouse = catchAsync(async (req, res) => {
  const result = await HouseServices.getLandloardOwnHouse(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved  successfully',
    data: result,
  });
});

const getAllHouse = catchAsync(async (req, res) => {
  const result = await HouseServices.getAllListingHouse(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved successfully',
    meta : result.meta,
    data: result.result
  });
});

const getFeaturedHouse = catchAsync(async (req, res) => {
  const result = await HouseServices.getFeaturedListingHouse();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved successfully',
    data: result
  });
});

const updateListingHouse = catchAsync(async (req, res) => {
  const { houseId } = req.params;
  const result = await HouseServices.updateListingHouse(houseId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Updated successfully',
    data: result,
  });
});

const deleteHouse = catchAsync(async (req, res) => {
  const {houseId} = req.params
  const result = await HouseServices.deleteHouse(houseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Deleted successfully',
    data: [],
  });
});

const getSingleHouse = catchAsync(async (req, res) => {
  const {houseId} = req.params
  const result = await HouseServices.getSingleHouse(houseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved successfully',
    data: result,
  });
});


const getSearchedAllHouse = catchAsync(async (req, res) => {

  const result = await HouseServices.getSearchedAllListingHouse(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved successfully',
    data: result,
  });
});


export const HouseController = {
  createHouse,
  getLandlordHouse,
  getAllHouse,
  updateListingHouse,
  deleteHouse,
  getSingleHouse,
  getSearchedAllHouse,
  getFeaturedHouse
};
