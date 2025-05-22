import express from 'express';
import { validation } from '../../middleware/validation';
import { houseValidation } from './house.zod.validation';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { HouseController } from './house.controller';

const router = express.Router();
router.post(
  '/',
  validation(houseValidation.houseValidationSchema),
  auth(USER_ROLE.landlord),
  HouseController.createHouse,
);

router.get(
  '/own',
  auth(USER_ROLE.landlord),
  HouseController.getLandlordHouse,
);
router.get('/feature', HouseController.getFeaturedHouse);
router.get('/search', HouseController.getSearchedAllHouse);
router.get('/', HouseController.getAllHouse);


router.put(
  '/:houseId',
  validation(houseValidation.updateHouseValidationSchema),
  auth(USER_ROLE.landlord, USER_ROLE.admin),
  HouseController.updateListingHouse,
);

router.delete(
  '/:houseId',
  auth(USER_ROLE.landlord, USER_ROLE.admin),
  HouseController.deleteHouse,
);

router.get(
  '/:houseId',
  HouseController.getSingleHouse,
);


export const HouseRoutes = router;
