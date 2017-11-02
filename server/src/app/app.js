import express from 'express';
import routers from './routers';
import bodyParser from 'body-parser';
import customCookieParser from './middlewares/custom-cookie-parser';
import customQueryParser from './middlewares/custom-query-parser';

const app = express();

app.use(customCookieParser);
app.use(customQueryParser);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/products', routers.productsRouter);
app.use('/api/users/', routers.usersRouter);

export default app;