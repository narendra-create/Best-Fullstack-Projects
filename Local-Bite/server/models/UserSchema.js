import mongoose from "mongoose";
import { Schema } from "mongoose";

const User = new Schema({
    name: { type: String },
    email: { type: String },//and jwt for this
    password: { type: String },//use bcrypt here
    role: { type: String },// vendor or customer
})

const UserModel = mongoose.models.User || mongoose.model("User", User);
export default UserModel;