import { getAllVendors, getVendorbyId, AddVendor } from '../controllers/VendorController.js'
import express from 'express';

const router = express.Router();
//get all vendors
router.get('/all', getAllVendors);
//Add vendor
router.post('/', AddVendor);
//get vendor by id
router.get('/:id', getVendorbyId);

export default router;
