import express from 'express';
import { validation } from '../../middleware/validation';
import { RequestValidation } from './request.zod.validation';
import { RequestController } from './request.controller';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  validation(RequestValidation.requestValidationSchema),
  auth(USER_ROLE.tenant),
  RequestController.createRequest,
);
router.get(
  '/',
  auth(USER_ROLE.landlord),
  RequestController.getListingOwnRequest,
);

router.get(
  '/admin',
  auth(USER_ROLE.admin),
  RequestController.AllListingRequest,
);

router.get(
  '/count-tenant',
  auth(USER_ROLE.tenant),
  RequestController.CountTenantListingRequest,
);


router.get(
  '/tenant',
  auth(USER_ROLE.tenant),
  RequestController.getTenatRequest,
);
router.put(
  '/:requestId',
  validation(RequestValidation.updateRequestValidationSchema),
  auth(USER_ROLE.landlord),
  RequestController.updateRequestByLandlord,
);


router.get(
  '/:requestId',
  auth(USER_ROLE.landlord,USER_ROLE.tenant,USER_ROLE.admin),
  RequestController.getSingleRequestData,
);

export const requestRoute = router;
