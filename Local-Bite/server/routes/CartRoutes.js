import express from 'express'
import authMiddleware from '../middlewares/jwtcheck.js'
import { getCart, Additems, Deleteitems, Clearcart } from '../controllers/CartController.js';

const cartrouter = express.Router();

//now the routes as usual
cartrouter.post('/add', authMiddleware, Additems);
cartrouter.get('/get', authMiddleware, getCart);
cartrouter.delete('/clear', authMiddleware, Clearcart);
cartrouter.delete('/delete/:productid', authMiddleware, Deleteitems);

export default cartrouter;