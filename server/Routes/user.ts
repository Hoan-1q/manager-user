import { Context } from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';

import UserModel from '../models/user';
import { IUser } from '../models/user/type';

const RouterUser = new Router({ prefix: '/api' });
dotenv.config();

RouterUser.get('/users', async (ctx: Context) => {
  const usersDB = await UserModel.find().lean();
  ctx.status = 200;
  ctx.body = usersDB;
});

RouterUser.get('/user/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  const userDB = await UserModel.findById(id);
  ctx.status = 200;
  ctx.body = userDB;
});

RouterUser.post('/user/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  // const { body } = ctx.request;
  console.log(ctx.request);
  const user = ctx.request.body as IUser;
  console.log(user);
  const userSave = new UserModel(user);
  switch (id) {
    case 'new': {
      // console.log(ctx.request);
      const dataSaved = userSave.save();
      if (!dataSaved) throw Error('add user fail');
      break;
    }
    default: {
      const upserAfterEdit = await UserModel.findByIdAndUpdate(id, userSave);
      if (!upserAfterEdit) throw Error('add user fail');
      break;
    }
  }
});

RouterUser.delete('/user/:id', async (ctx: Context) => {
  const { id } = ctx.params;
  const userDB = await UserModel.findByIdAndDelete(id);
  ctx.status = 200;
  ctx.body = userDB;
});

export { RouterUser };