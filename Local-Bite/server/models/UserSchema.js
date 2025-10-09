import mongoose from "mongoose";
import { Schema } from "mongoose";

const User = new Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true, 
        // match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
    },
    role: { 
        type: String, 
        required: [true, 'Role is required'], 
        enum: {
            values: ["customer", "vendor"],
            message: 'Role must be either customer or vendor'
        }
    },
    //   Added timestamps for better tracking
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true //   Added automatic timestamp management
});

const UserModel = mongoose.models.User || mongoose.model("User", User);
export default UserModel;