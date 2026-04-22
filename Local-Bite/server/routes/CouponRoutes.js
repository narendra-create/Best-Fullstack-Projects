import express from 'express';
import { addcoupon, getallcoupons, applycoupon, addvendorincoupon } from "../controllers/CouponController.js";
import authMiddleware from "../middlewares/jwtcheck.js";

const couponrouter = express.Router();

couponrouter.get('/getcoupons', getallcoupons);
couponrouter.post('/addcoupon', authMiddleware, addcoupon);
couponrouter.post('/applycoupon', authMiddleware, applycoupon);
couponrouter.patch('/addmyrestaurent', authMiddleware, addvendorincoupon);

export default couponrouter;