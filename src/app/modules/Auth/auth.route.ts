import express from "express"
import { validation } from "../../middleware/validation"
import { changePasswordValidationSchema, loginValidationSchema, refreshTokenValidation } from "./auth.zod.validation"
import { AuthController } from "./auth.controller"
import { auth } from "../../middleware/auth"
import { USER_ROLE } from "../user/user.constant"
const router = express.Router()
router.post(
    '/change-password',
    auth(USER_ROLE.admin,USER_ROLE.landlord,USER_ROLE.tenant),
    validation(changePasswordValidationSchema),
    AuthController.changePassword
)

router.post(
    '/login',
    validation(loginValidationSchema),
    AuthController.loginUser
)


router.post(
    '/refresh-token',
    validation(refreshTokenValidation),
    AuthController.refreshToken
)

export const AuthRoutes = router