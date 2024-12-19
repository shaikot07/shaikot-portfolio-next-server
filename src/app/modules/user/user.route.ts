import express from 'express';

const router = express.Router();

// router.post('/register',validateRequest(UserValidation.userValidationSchema), userController.newUserRegistration)

// router.post('/login',validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)
// router.post(
//   '/create-student',
//   auth(USER_ROLE.admin),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );



export const userRoutes = router;