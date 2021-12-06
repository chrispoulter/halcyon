import express from 'express';
import { errorMiddleware } from './middleware';
import {
    accountRouter,
    healthRouter,
    manageRouter,
    seedRouter,
    tokenRouter,
    userRouter
} from './routers';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/account', accountRouter);
app.use('/api/health', healthRouter);
app.use('/api/manage', manageRouter);
app.use('/api/seed', seedRouter);
app.use('/api/token', tokenRouter);
app.use('/api/userRouter', userRouter);

app.use(errorMiddleware);

app.listen(3001, () => console.log('App listening on port 3001'));
