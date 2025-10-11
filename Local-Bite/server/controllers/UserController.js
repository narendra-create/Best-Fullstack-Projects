import UserModel from "../models/UserSchema.js";
import mongoose from "mongoose";
import Vendor from "../models/VendorSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userregister = async (req, res) => {
    try {
        const { name, email, password, role, vendorDetails } = req.body;
        if (!name || !email || !password || !role) {
            throw new Error("Missing Required fields !")
        }
        if (role !== "vendor" && role !== "customer") return res.status(401).json({ message: "Role not supported - please choose vendor or customer" })
        const isexists = await UserModel.findOne({ email })
        if (isexists) { return res.status(409).json({ message: "User Already exists !" }) }

        //genereating hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newuser = await new UserModel({
            name: name,
            email: email,
            password: hashedpassword, //already hashed password
            role: role
        })
        await newuser.save();

        if (role === "vendor") {
            if (!vendorDetails) return res.status(400).json({ message: "vendor details missing - category and imageUrl" })
            const { category, imageUrl } = vendorDetails;
            console.log(vendorDetails)
            if (!category) return res.status(400).json({ message: "Vendor details required" })

            const newvendor = new Vendor({
                user: newuser._id,
                name: newuser.name,
                category: category,
                imageUrl: imageUrl
            })
            await newvendor.save();

        }
        return res.status(201).json({ message: "Account created successfully ✔️" })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}

const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Please provide emali and password both !" });

        const finduser = await UserModel.findOne({ email: email })

        if (!finduser) res.status(404).json({ message: "User Not Found!!, Please register" });

        //match password
        const isMatch = await bcrypt.compare(password, finduser.password);
        const payload = {
            user: finduser._id,
            role: finduser.role,
            email: finduser.email
        }

        if (isMatch) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            res.cookie("token", token, {
                httpOnly: true, // <-- CRITICAL: Prevents JS access
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production only (HTTPS)
                sameSite: 'strict', // Helps prevent CSRF attacks
                maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
            });
            return res.status(200).json({ message: "Login Successful ✔️" })
        }
        else {
            return res.status(401).json({ message: "The email or password you entered is Incorrect ❌" })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" })
    }
}

const userlogout = async (req, res) => {
    try {
        return res.clearCookie('token').status(200).json({ message: "Logout  Successfull" })
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
}

export { userlogin, userregister, userlogout };
