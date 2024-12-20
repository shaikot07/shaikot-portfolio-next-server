import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { userRoutes } from '../modules/user/user.route';




const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: userRoutes,
  },
 
  
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
