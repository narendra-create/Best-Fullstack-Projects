import express from 'express'
import { placeOrder, updateorder, orderHistory, getcurrentorders, getsingleorder } from '../controllers/OrderController.js'
import authMiddleware from '../middlewares/jwtcheck.js'

const orderrouter = express.Router();

//now the routes as usual
orderrouter.post('/place', authMiddleware, placeOrder);
orderrouter.get('/current', authMiddleware, getcurrentorders);
orderrouter.patch('/updatestatus/:OrderId', authMiddleware, updateorder);
orderrouter.get('/currentsingle/:orderid', authMiddleware, getsingleorder);
orderrouter.get('/history', authMiddleware, orderHistory);

export default orderrouter;