'use strict';

import express from 'express';
import CitiesController from '../controllers/cities-controller';
import checkToken from '../middlewares/custom-token-check';
import setLastModifiedDate from '../middlewares/set-last-modified-date';

const citiesController = new CitiesController();
const citiesRouter = express.Router();

citiesRouter.use(checkToken);

citiesRouter.get('/', citiesController.getAll);
citiesRouter.post('/', citiesController.addOne, setLastModifiedDate);
citiesRouter.delete('/:id', citiesController.removeOne);
citiesRouter.put('/:id', citiesController.updateOne, setLastModifiedDate);

export default citiesRouter;