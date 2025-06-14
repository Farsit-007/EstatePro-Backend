import express from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { metaController } from './meta.controller';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.landlord),
  metaController.metaData,
);

export const MetaRoutes = router;
