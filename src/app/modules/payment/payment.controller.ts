import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './payment.service';
import httpStatus from 'http-status';

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createPayment(req.body,req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Payment created successfully',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
    const result = await PaymentService.verifyPaymentDB(
      req.query.order_id as string,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment verified successfully',
      data: result,
    });
  });

export const PaymentController = {
  createPayment,
  verifyPayment
};
