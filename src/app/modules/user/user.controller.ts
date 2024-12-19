// import { Request, Response } from "express";
// import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";
// import httpStatus from "http-status";

// const newUserRegistration = catchAsync(
//   async (req: Request, res: Response) => {
//     console.log(req.body);
//     const result =
//       await userServices.registerUser(req.body,);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User Registration successfully!',
//       data: result,
//     });
//   },
// );


// const loginUser = catchAsync(async (req, res) => {
//     const result = await userServices.loginUser(req.body);
//     const { refreshToken, accessToken, needsPasswordChange } = result;
  
//     // res.cookie('refreshToken', refreshToken, {
//     //   secure: config.NODE_ENV === 'production',
//     //   httpOnly: true,
//     // });
  
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User is logged in succesfully!',
//       data: {
//         accessToken,
//         // needsPasswordChange,
//       },
//     });
//   });
  
//   const changePassword = catchAsync(async (req, res) => {
//     const { ...passwordData } = req.body;
  
//     const result = await userServices.changePassword(req.user, passwordData);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Password is updated succesfully!',
//       data: result,
//     });
//   });
  
// export const userController ={
//     newUserRegistration,
//     loginUser,
//     changePassword

// }