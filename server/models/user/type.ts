import { Document } from 'mongoose';

export type TUser = {
  _id: string,
  email: string,
  password: string,
  displayName: string,
  avatar: string,
};

export type IUser = Document & TUser;
