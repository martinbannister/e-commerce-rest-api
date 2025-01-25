import 'dotenv/config';
import express from 'express';
import userRouter from './user/user.route';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});