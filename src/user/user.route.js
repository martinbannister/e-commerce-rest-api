import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from './user.controller.js';
const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
// Routes that require id
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;