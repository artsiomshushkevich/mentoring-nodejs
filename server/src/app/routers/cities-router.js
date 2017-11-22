'use strict';

import express from 'express';
import CitiesController from '../controllers/cities-controller';
import checkToken from '../middlewares/custom-token-check';

const citiesController = new CitiesController();
const citiesRouter = express.Router();

citiesRouter.use(checkToken);

citiesRouter.get('/', checkToken, citiesController.getAll);
citiesRouter.post('/', checkToken, citiesController.addOne);
citiesRouter.delete('/:id', checkToken, citiesController.removeOne);
citiesRouter.put('/:id', checkToken, citiesController.updateOne);

export default citiesRouter;