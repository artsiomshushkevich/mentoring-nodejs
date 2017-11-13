'use strict';

import express from 'express';
import UsersController from '../controllers/users-controller';
import checkToken from '../middlewares/custom-token-check';

const usersController = new UsersController();
const usersRouter = express.Router();

usersRouter.use(checkToken);

usersRouter.get('/', checkToken, usersController.getAll);

export default usersRouter;