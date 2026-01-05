import express from 'express'
import { placeOrder, updateorder, payonline, orderHistory, getcurrentorders, getsingleorder, cashorder } from '../controllers/OrderController.js'
import authMiddleware from '../middlewares/jwtcheck.js'

const orderrouter = express.Router();

//now the routes as usual
orderrouter.post('/place', authMiddleware, placeOrder);
orderrouter.post('/place-cash', authMiddleware, cashorder);
orderrouter.get('/current', authMiddleware, getcurrentorders);
orderrouter.post('/pay-online/:orderid', authMiddleware, cashorder);
orderrouter.patch('/updatestatus/:OrderId', authMiddleware, updateorder);
orderrouter.get('/currentsingle/:orderid', authMiddleware, getsingleorder);
orderrouter.get('/history', authMiddleware, orderHistory);

export default orderrouter;