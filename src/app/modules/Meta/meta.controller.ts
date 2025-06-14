import { catchAsync } from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import httpStatus from 'http-status'
import { MetaServices } from "./meta.service"
const metaData = catchAsync(async (req, res) => {
    const result = await MetaServices.getMeta(req.user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrived successfully',
        data: result,
    })
})


export const metaController = {
metaData
}