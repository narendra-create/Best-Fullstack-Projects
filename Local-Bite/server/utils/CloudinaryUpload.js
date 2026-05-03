import cloudinary from "../config/cloudinary";

const uploadtoCloudinary = (filebuffer, type) => {

    const allowedFolders = ["vendors", "products"];

    if (!allowedFolders.includes(type)) {
        return reject(new Error("Invalid folder type"));
    }

    if (!filebuffer) {
        return reject(new Error("File buffer missing"));
    }

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: type,
                resource_type: "image",
                transformation: [
                    { width: 1000, height: 1000, crop: "limit" },
                    { quality: "auto" },
                    { fetch_format: "auto" }
                ]
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        ).end(filebuffer)
    })
}

export default uploadtoCloudinary;