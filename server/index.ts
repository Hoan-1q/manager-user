import next from 'next';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import formidable from 'koa2-formidable';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { RouterUser } from './Routes/user';


dotenv.config();

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CONNECTSTRING,
} = process.env;

const server = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();

/** middleware */
server.use(formidable());
server.use(bodyParser());

nextApp.prepare();


router.get('*', async (ctx) => {
  await handler(ctx.req, ctx.res);
  ctx.respond = false;
  ctx.res.statusCode = 200;
});

server.use(RouterUser.routes());
server.use(router.routes());



mongoose
  .connect(
    MONGO_CONNECTSTRING,
    {
      user: MONGO_USER,
      pass: MONGO_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

