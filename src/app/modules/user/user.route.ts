import express from 'express';
import { validation } from '../../middleware/validation';
import {
  profileUpdateValidationSchema,
  updateUserValidationSchema,
  userValidationSchema,
} from './user.zod.validation';
import { UserController } from './user.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();
router.post('/', validation(userValidationSchema), UserController.createUser);

//User Profile Update
router.put(
  '/profile',
  auth(USER_ROLE.landlord,USER_ROLE.admin,USER_ROLE.tenant),
  validation(profileUpdateValidationSchema),
  UserController.updatePrfile,
);
//Admin can block a User and update Role
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validation(updateUserValidationSchema),
  UserController.updateUser,
);

router.get(
  '/:email',
  auth(USER_ROLE.admin),
  UserController.getSingleUser,
);

//Admin can see all users
router.get('/', auth(USER_ROLE.admin), UserController.allUsers);

//Delete User
router.delete('/:id', auth(USER_ROLE.admin), UserController.deleteUser);


router.post(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.landlord, USER_ROLE.tenant),
  UserController.getMe
)


export const UserRoutes = router;
