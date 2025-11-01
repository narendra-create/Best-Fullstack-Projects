import express from 'express'
import authMiddleware from '../middlewares/jwtcheck.js'

const cartrouter = express.Router();

//now the routes as usual
cartrouter.post('/add', authMiddleware, Additems);

cartrouter.post('/delete', authMiddleware, Deleteitems);

export default cartrouter;