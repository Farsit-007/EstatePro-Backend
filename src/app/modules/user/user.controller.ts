import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    })
})

const updateUser = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await UserServices.updateUserFromDB(id,req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
    })
})

const allUsers = catchAsync(async (req, res) => {
    const result = await UserServices.allUserIntoDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrived successfully',
        data: result,
    })
})


const deleteUser = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await UserServices.deleteUser(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
    })
})



const updatePrfile = catchAsync(async (req, res) => {
    console.log(req.user);
    const result = await UserServices.updateProfileFromDB(req.body,req.user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    })
})


const getMe = catchAsync(async (req, res, next) => {
    const {id,role} = req.user
    const result = await UserServices.getMe(id,role)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrived Successfully',
        data: result,
    })
})

const getSingleUser = catchAsync(async (req, res, next) => {
   const {email} = req.params
    const result = await UserServices.getSingleUser(email)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrived Successfully',
        data: result,
    })
})


export const UserController = {
    createUser,
    updateUser,
    allUsers,
    deleteUser,
    updatePrfile,
    getMe,
    getSingleUser
}