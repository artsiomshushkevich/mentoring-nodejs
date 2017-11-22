'use strict';

import express from 'express';
import UsersController from '../controllers/users-controller';
import checkToken from '../middlewares/custom-token-check';
import setLastModifiedDate from '../middlewares/set-last-modified-date';

const usersController = new UsersController();
const usersRouter = express.Router();


usersRouter.get('/', checkToken, usersController.getAll);
usersRouter.post('/', usersController.addOne, setLastModifiedDate);
usersRouter.delete('/:id', checkToken, usersController.removeOne);

export default usersRouter;