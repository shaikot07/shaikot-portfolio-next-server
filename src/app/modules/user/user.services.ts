import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { User } from "./user.model";
import { ObjectId } from 'mongodb';
import { createToken } from "../Auth/auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';

const registerUser= async(payload:TUser )=>{

    const userExists= await User.findOne({email:payload.email})
    if(userExists){
        throw new AppError(httpStatus.CONFLICT,`${userExists.email} already Exists`)
    }

    const result = await User.create(payload);
  return result;
}

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.isUserExistsByCustomMail(payload.email) as TUser & { _id: ObjectId };
  
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
  
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
    // checking if the user is blocked
  
      // Check if the user is blocked
      if (user.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
      }
  
    //checking if the password is correct
  
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
    //create token and sent to the  client
  
    const jwtPayload = {
      userId: user._id.toString(),
      role: user.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  
    // const refreshToken = createToken(
    //   jwtPayload,
    //   config.jwt_refresh_secret as string,
    //   config.jwt_refresh_expires_in as string,
    // );
  
    return {
      accessToken,
      // refreshToken,
      
    };
  };
  
  const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
  ) => {
    // checking if the user is exist
    const user = await User.isUserExistsByCustomMail(userData.userId);
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted
  
    const isDeleted = user?.isDeleted;
  
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
  
     // Check if the user is blocked
     if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }
  
    //checking if the password is correct
  
    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  
    //hash new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds),
    );
  
    await User.findOneAndUpdate(
      {
        id: userData.userId,
        role: userData.role,
      },
      {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
      },
    );
  
    return null;
  };


export const userServices ={
    registerUser,
    loginUser,
    changePassword
}