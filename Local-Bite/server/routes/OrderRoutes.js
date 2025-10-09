import express from 'express'
import { placeOrder, updateorder, orderHistory } from '../controllers/OrderController.js'
import authMiddleware from '../middlewares/jwtcheck.js'

const orderrouter = express.Router();

//now the routes as usual
orderrouter.post('/place', authMiddleware, placeOrder);

orderrouter.patch('/updatestatus/:OrderId', authMiddleware, updateorder);
orderrouter.get('/history', authMiddleware, orderHistory);

export default orderrouter;