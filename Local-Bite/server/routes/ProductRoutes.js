import express from 'express';
import authMiddleware from '../middlewares/jwtcheck.js';
import upload from '../config/multer.js';
import { getProductbyVendor, AddProduct, getAllProducts, getProductsbyUser, setstock, removeproduct } from '../controllers/ProductController.js';
//productcontroller functions import

const router = express.Router();

//get all foods available with vendor name
router.get('/all', getAllProducts)
//get products by vendor (only vendordashboard)
router.get('/MyProducts', authMiddleware, getProductsbyUser);
//controllers 
router.patch('/stock', authMiddleware, setstock)
router.delete('/delete/:itemid', authMiddleware, removeproduct)
//get all products of vendor
router.get('/:vendorId', getProductbyVendor);
//Add product (admin/vendor only)
router.post('/:vendorId', authMiddleware, upload.single("image"), AddProduct); //remove vendor id and secure it after testing

export default router;
