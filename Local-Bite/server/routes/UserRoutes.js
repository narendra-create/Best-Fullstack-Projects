import { userregister, userlogin, userlogout } from "../controllers/UserController.js";
import express from 'express';

const userroutes = express.Router();

//For register 
userroutes.post('/', userregister);
//For login
userroutes.post('/login', userlogin);
//For Logout
userroutes.get('/logout', userlogout);

export default userroutes;