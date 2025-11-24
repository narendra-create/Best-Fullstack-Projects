import { getAllVendors, getVendorbyId, AddVendor, getVendorByUserid, VendorAnalytics, NumberReport, shopstatus, loadshopstatus } from '../controllers/VendorController.js'
import express from 'express';
import authMiddleware from '../middlewares/jwtcheck.js';

const router = express.Router();
//get all vendors
router.get('/all', getAllVendors);
//Add vendor
router.post('/', AddVendor);
//get reports about sales
router.get('/sales-data', authMiddleware, VendorAnalytics);
router.get('/number-data', authMiddleware, NumberReport);
//to close/open shop
router.get('/shopstatus', authMiddleware, loadshopstatus);
router.post('/setshop', authMiddleware, shopstatus);
//get vendor by id and user id
router.get('/uservendor', authMiddleware, getVendorByUserid);
router.get('/:id', getVendorbyId);

export default router;
