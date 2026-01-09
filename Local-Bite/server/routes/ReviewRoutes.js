import { submitreview, getratings } from "../controllers/RatingController.js";
import authMiddleware from '../middlewares/jwtcheck.js';
import express from 'express';

const reviewrouter = express.Router();

reviewrouter.post('/submit', authMiddleware, submitreview);
reviewrouter.get('/get-reviews/:vendorid', getratings);

export default reviewrouter;