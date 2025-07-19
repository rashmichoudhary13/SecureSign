import express from 'express';
import { getUserData } from '../controller/userController.js';
import {userAuth, authorizeRoles } from '../middleware/userAuth.js';

const userRouter = express.Router();

// provides user data 
userRouter.get('/data', userAuth, getUserData);
userRouter.get('/admin', userAuth, authorizeRoles('admin'), (req, res) => { res.send('welcom admin'); });
userRouter.get('/editor', userAuth, authorizeRoles('admin','editor'), (req, res) => { res.send('Welcome to editor page!'); });
userRouter.get('/product', userAuth, authorizeRoles('user','admin','editor'), (req, res) => { res.send('Welcome to product page!'); });

export default userRouter;