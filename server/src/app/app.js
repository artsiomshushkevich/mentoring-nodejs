import express from 'express';
import routers from './routers';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/products', routers.productsRouter);
//app.use('/api/users/', routers.usersRouter);

export default app;