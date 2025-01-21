import express from 'express';
import userController from './user.controller.js';
const userRouter = express.Router();
const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = userController;

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
// Routes that require id
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);