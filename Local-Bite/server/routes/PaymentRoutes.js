import express from 'express';
import verifypayment from '../controllers/PaymentController.js';
import authMiddleware from '../middlewares/jwtcheck.js';

const verifyrouter = express.Router();

verifyrouter.post('/verify-payment', authMiddleware, verifypayment);

export default verifyrouter;