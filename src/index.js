import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});