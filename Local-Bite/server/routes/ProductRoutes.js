import express from 'express';
import { getProductbyVendor, AddProduct, getAllProducts } from '../controllers/ProductController.js';
//productcontroller functions import

const router = express.Router();

//get all foods available with vendor name
router.get('/all', getAllProducts )
//get all products of vendor
router.get('/product/:vendorId', getProductbyVendor);
//Add product (admin/vendor only)
router.post('/:vendorId', AddProduct); //remove vendor id and secure it after testing

export default router;
