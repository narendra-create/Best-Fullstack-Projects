import { userregister, userlogin } from "../controllers/UserController.js";
import express from 'express';

const userroutes = express.Router();

//For register 
userroutes.post('/', userregister);
//For login
userroutes.post('/login', userlogin);

export default userroutes;