import express from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from './user.controller.js';
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
// Routes that require id
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;