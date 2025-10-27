import { getAllVendors, getVendorbyId, AddVendor, getVendorByUserid } from '../controllers/VendorController.js'
import express from 'express';
import authMiddleware from '../middlewares/jwtcheck.js';

const router = express.Router();
//get all vendors
router.get('/all', getAllVendors);
//Add vendor
router.post('/', AddVendor);
//get vendor by id
router.get('/uservendor', authMiddleware, getVendorByUserid);
router.get('/:id', getVendorbyId);

export default router;
