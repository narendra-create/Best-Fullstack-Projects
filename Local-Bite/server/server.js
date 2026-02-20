import express from "express"
import dotenv from 'dotenv'
import connectdb from "./config/db.js";
import VendorRoutes from './routes/VendorRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import orderrouter from "./routes/OrderRoutes.js";
import userroutes from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authMiddleware from "./middlewares/jwtcheck.js";
import cartrouter from "./routes/CartRoutes.js";
import verifyrouter from "./routes/PaymentRoutes.js";
import reviewrouter from './routes/ReviewRoutes.js'

dotenv.config();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, //allow cookie
}));

await connectdb();

app.get('/', (req, res) => {
    let allapis = {
        getallven: "/api/vendor/all",
        getvenbyid: "/:id",
        getreport: "/api/vendor/sales-data",
        getnumbers: "/api/vendor/number-data",
        product: {
            addproduct: "/:vendorId",
            getprobyid: "/product/:vendorId"
        },
        user: {
            register: '/api/auth/',
            login: "/api/auth/login",
            logout: "/api/auth/logout"
        },
        orders: {
            place: '/api/order/place',
            update: '/api/order/updatestatus/:OrderId',
            history: '/api/order/history'
        },
        cart: {
            add: '/api/cart/add with product id and quantity in body',
            getcart: '/api/cart/get',
            clearcart: "/clear",
            delete: "/delete/:productid",
            update: '/updateqty with productid and operation in body'
        }
    }
    res.send(allapis);
})
//User routes
app.use('/api/auth', userroutes);
app.get('/api/verify', authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User is authenticated.",
        user: req.user
    });
})

//TELL Express to use vendor routes for any request starting with /api/vendor
app.use('/api/vendor', VendorRoutes);
app.use('/api/review', reviewrouter)
app.use('/api/product', ProductRoutes);
app.use('/api/order', orderrouter);
app.use('/api/cart', cartrouter);
app.use('/api/payment', verifyrouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
