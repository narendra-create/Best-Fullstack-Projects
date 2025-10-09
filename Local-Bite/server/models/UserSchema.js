import mongoose from "mongoose";
import { Schema } from "mongoose";

const User = new Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'], //   Added required validation
        trim: true, //   Added trim to remove whitespace
        maxlength: [50, 'Name cannot exceed 50 characters'] //   Added length validation
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], //   Added required validation
        unique: true, //   Added unique constraint
        lowercase: true, //   Added lowercase transformation
        trim: true, //   Added trim to remove whitespace
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'] //   Added email validation
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], // Added required validation
    },
    role: { 
        type: String, 
        required: [true, 'Role is required'], //   Enhanced required validation message
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

//   Added indexes for better query performance
User.index({ email: 1 });
User.index({ role: 1 });
User.index({ createdAt: -1 });

const UserModel = mongoose.models.User || mongoose.model("User", User);
export default UserModel;