import express from 'express';
import UsersController from '../controllers/users-controller';

const usersController = new UsersController();
const usersRouter = express.Router();

usersRouter.get('/', usersController.getAll);

export default usersRouter;