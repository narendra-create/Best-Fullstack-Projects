import { userregister, userlogin, userlogout, Addadress } from "../controllers/UserController.js";
import authMiddleware from '../middlewares/jwtcheck.js'
import express from 'express';

const userroutes = express.Router();

//For register 
userroutes.post('/', userregister);
//For login
userroutes.post('/login', userlogin);
//For Logout
userroutes.get('/logout', userlogout);
//For Addresses
userroutes.post('/addaddress', authMiddleware, Addadress);

export default userroutes;