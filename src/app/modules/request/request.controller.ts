import { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../../utils/catchAsync';
import { RequestService } from './request.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createRequest = catchAsync(async (req, res) => {
  const result = await RequestService.createRequest(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Requested successfully',
    data: result,
  });
});

const getListingOwnRequest = catchAsync(async (req, res) => {
  const result = await RequestService.getListingOwnRequest(
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved successfully',
    data: result,
  });
});

const AllListingRequest = catchAsync(async (req, res) => {
  const result = await RequestService.getAllRequest();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved successfully',
    data: result,
  });
});

const getTenatRequest = catchAsync(async (req, res) => {
  const result = await RequestService.getTenatRequest(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved successfully',
    data: result,
  });
});

const updateRequestByLandlord = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await RequestService.updateRequestByLandlord(
    requestId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request updated successfully',
    data: result,
  });
});
const getSingleRequestData = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await RequestService.getSingleRequest(requestId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved  successfully',
    data: result,
  });
});


const CountTenantListingRequest = catchAsync(async (req, res) => {
  const result = await RequestService.getTenantRequest(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental House Retrieved successfully',
    data: result,
  });
});

export const RequestController = {
  createRequest,
  getListingOwnRequest,
  updateRequestByLandlord,
  getSingleRequestData,
  getTenatRequest,
  AllListingRequest,
  CountTenantListingRequest
};
