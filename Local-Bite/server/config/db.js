import mongoose from "mongoose";

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected ✅", conn.connection.host)
    }
    catch (error) {
        console.log(`Here is env mongo uri - ${process.env.MONGO_URI}`)
        console.log(`Database Connection Error ${error.message}`)
        process.exit(1);
    }
}

export default connectdb;