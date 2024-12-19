import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';






const router = express.Router();

router.post('/register',validateRequest(UserValidation.userValidationSchema), userController.newUserRegistration)

router.post('/login', userController.loginUser)
// router.post(
//   '/create-student',
//   auth(USER_ROLE.admin),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );



export const userRoutes = router;