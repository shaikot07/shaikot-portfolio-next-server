import { Model } from "mongoose";

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    isBlocked: boolean;
    isDeleted: boolean;
    passwordChangedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByCustomMail(id: string): Promise<TUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(plainTextPassword: string, hashedPassword: string,): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number,
    ): boolean;
  }

  export type TLoginUser = {
    email: string;
    password: string;
  };
  