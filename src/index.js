/*jshint esversion: 6 */ 

import 'dotenv/config';
import express from 'express';
import userRouter from './user/user.route.js';
const app = express();

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`app is listening on port ${process.env.PORT}`);
});