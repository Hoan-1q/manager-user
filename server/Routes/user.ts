import { Context } from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';

import UserModel from '../models/user';
import { IUser } from '../models/user/type';

const RouterUser = new Router({ prefix: '/api' });
dotenv.config();

RouterUser.get('/users', async (ctx: Context) => {
  console.log(ctx);
  const usersDB = await UserModel.find().lean();
  ctx.status = 200;
  ctx.body = usersDB;
});

RouterUser.get('/user/{id}', async (ctx: Context) => {
  console.log(ctx);
  const { id } = ctx.params;
  const userDB = await UserModel.findById(id).lean();
  ctx.status = 200;
  ctx.body = userDB;
});

RouterUser.post('/user/{id}', async (ctx: Context) => {
  const { id } = ctx.params;
  console.log(ctx);
  const user: IUser = ctx.request.body as any;
  const userSave = new UserModel(user);
  switch (id) {
    case 'new': {
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

export { RouterUser };