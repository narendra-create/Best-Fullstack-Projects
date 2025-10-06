import bodyParser from "body-parser"
import express from "express"
import dotenv from 'dotenv'
import connectdb from "./config/db.js";
import VendorRoutes from './routes/VendorRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'

dotenv.config({ path: './.env.local' });

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectdb();

app.get('/', (req, res) => {
    let allapis = {
        addven: "/",
        getallven: "/all",
        getvenbyid: "/:id",
        product: {
            addproduct: "/:vendorId",
            getprobyid: "/product/:vendorId"
        }
    }
    res.send(allapis);
})

// 3. TELL Express to use your vendor routes for any request starting with /api/vendor
app.use('/api/vendor', VendorRoutes)
app.use('/api/product', ProductRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
