import { userregister, userlogin, userlogout, Addadress, removeaddress, getaddress, updateaddress, makedefault } from "../controllers/UserController.js";
import authMiddleware from '../middlewares/jwtcheck.js'
import express from 'express';
import upload from "../config/multer.js";

const userroutes = express.Router();

//For register 
userroutes.post('/', upload.single("image"), userregister);
//For login
userroutes.post('/login', userlogin);
//For Logout
userroutes.get('/logout', userlogout);
//For Addresses
userroutes.post('/addaddress', authMiddleware, Addadress);
userroutes.delete('/removeaddress', authMiddleware, removeaddress);
userroutes.get('/showaddress', authMiddleware, getaddress);
userroutes.patch('/updateaddress', authMiddleware, updateaddress);
userroutes.patch('/makedefault/:addressid', authMiddleware, makedefault);

export default userroutes;