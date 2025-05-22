import { Router } from 'express';
import { UserRoutes } from '../user/user.route';
import { AuthRoutes } from '../Auth/auth.route';
import { HouseRoutes } from '../rental-house/house.route';
import { requestRoute } from '../request/request.route';
import { PaymentRoute } from '../payment/payment.route';

const router = Router();

const moduleRoutes = [
 
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/rental-house',
    route: HouseRoutes,
  },
  {
    path: '/request',
    route: requestRoute,
  },
  {
    path: '/payment',
    route: PaymentRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
