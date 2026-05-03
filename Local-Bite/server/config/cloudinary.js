import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_NAME ||
    !process.env.CLOUDINARY_KEY ||
    !process.env.CLOUDINARY_SECRET) {
    throw new Error("Cloudinary config missing in environment variables");
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

export default cloudinary;