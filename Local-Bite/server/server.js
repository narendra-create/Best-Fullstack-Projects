import express from "express"
// import dotenv from 'dotenv'
import connectdb from "./config/db.js";
import VendorRoutes from './routes/VendorRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import orderrouter from "./routes/OrderRoutes.js";
import userroutes from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';


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
        addven: "/",
        getallven: "/api/vendor/all",
        getvenbyid: "/:id",
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
        }
    }
    res.send(allapis);
})
//User routes
app.use('/api/auth', userroutes);

//TELL Express to use your vendor routes for any request starting with /api/vendor
app.use('/api/vendor', VendorRoutes)
app.use('/api/product', ProductRoutes)
app.use('/api/order', orderrouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
