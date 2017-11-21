'use strict';

import express from 'express';
import CitiesController from '../controllers/cities-controller';
import checkToken from '../middlewares/custom-token-check';

const citiesController = new CitiesController();
const usersRouter = express.Router();

usersRouter.use(checkToken);

usersRouter.get('/', checkToken, citiesController.getAll);

export default usersRouter;