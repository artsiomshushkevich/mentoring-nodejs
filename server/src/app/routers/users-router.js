'use strict';

import express from 'express';
import UsersController from '../controllers/users-controller';
import checkToken from '../middlewares/custom-token-check';

const usersController = new UsersController();
const usersRouter = express.Router();


usersRouter.get('/', checkToken, usersController.getAll);
usersRouter.post('/', usersController.addOne);
usersRouter.delete('/:id', checkToken, usersController.removeOne);

export default usersRouter;