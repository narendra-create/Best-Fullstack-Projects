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
            const { category, imageUrl, type } = vendorDetails;
            if (!category) return res.status(400).json({ message: "Vendor details required" })

            const newvendor = new Vendor({
                user: newuser._id,
                name: newuser.name,
                category: category,
                imageUrl: imageUrl,
                type: type
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
                // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production only (HTTPS)
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

const Addadress = async (req, res) => {
    try {
        const { user, role } = req.user;
        const { address } = req.body;
        if (!address || typeof address !== "object") {
            return res.status(400).json({ message: "Address Required" })
        }
        if (!user) {
            return res.status(401).json({ message: "Login First" })
        }
        if (role === "customer") {
            const requiredfields = ["label", "street", "pincode", "phone"]
            for (const field of requiredfields) {
                if (!address[field] || String(address[field]).trim() === "") {
                    return res.status(400).json({ message: `${field} is required !!` })
                }
            }
            const USER = await UserModel.findOne({ _id: user })
            if (!USER) {
                return res.status(404).json({ message: "User Not Found" })
            }

            const alreadyexists = USER.addresses?.length > 0;

            const dbaddress = {
                label: address.label,
                street: address.street,
                city: address.city,
                state: address.state,
                pincode: address.pincode,
                landmark: address.landmark,
                phone: address.phone,
                isDefault: !alreadyexists
            }

            USER.addresses.push(dbaddress);
            await USER.save();
            return res.status(200).json({ message: "Address Added !" })
        }
        else if (role === "vendor") {
            const requiredfields = ["state", "street", "pincode", "phone"]
            for (const field of requiredfields) {
                if (!address[field] || address[field].trim() === "") {
                    return res.status(400).json({ message: `${field} is required` })
                }
            }

            const updatedvendor = await Vendor.findOneAndUpdate({ user: user }, { $set: { address } }, { new: true })
            return res.status(200).json({ message: "Added successfully" })
        }
        res.status(400).json({ message: "Some Error occured" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

const removeaddress = async (req, res) => {
    try {
        const { user, role } = req.user;
        const { addressid } = req.body;
        if (!user) {
            return res.status(401).json({ message: "Please Log in first" })
        }
        if (!addressid) {
            return res.status(400).json({ message: "Give all required fields" })
        }
        if (role === "customer") {
            const findaddress = await UserModel.updateOne({ _id: user }, { $pull: { addresses: { _id: addressid } } })

            if (findaddress.modifiedCount === 0) {
                return res.status(404).json({ message: "Address not found" });
            }
            return res.status(200).json({ message: "Address Removed" })
        }
        if (role === "vendor") {
            return res.status(409).json({ message: "Vendors Can't remove address they can only update it" })
        }
        res.status(400).json({ message: "Some Error Occured" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

const getaddress = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (!user) {
            return res.status(401).json({ message: "Please Login first!" })
        }
        if (role === "customer") {
            const fetchuser = await UserModel.findOne({ _id: user })
            if (!fetchuser) return res.status(404).json({ message: "User Not Found" })
            return res.status(200).json({ message: "Addresses Fetched", Addresses: fetchuser.addresses })
        }
        if (role === "vendor") {
            const findvendor = await Vendor.findOne({ user: user })
            if (!findvendor) return res.status(404).json({ message: "Vendor Not Found" })
            return res.status(200).json({ message: "Address Fetched", Address: findvendor.address })
        }
        return res.status(400).json({ message: "Some Error Occured" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

const updateaddress = async (req, res) => {
    try {
        const { user, role } = req.user;
        const { addressid, updateddata } = req.body;
        if (!updateddata) return res.status(400).json({ message: "Please Give updated address" });

        if (!user) {
            return res.status(401).json({ message: "Please Log in first" })
        }
        //dynamic key selector
        const updates = {};
        for (let key in updateddata) {
            updates[`addresses.$.${key}`] = updateddata[key];
        }
        //logic for customer
        if (role === "customer") {
            if (!addressid) return res.status(400).json({ message: "Please Give Address _id" });
            const newdata = await UserModel.findOneAndUpdate(
                { _id: user, "addresses._id": addressid },
                { $set: updates },
            )
            if (newdata.matchedCount === 0) {
                return res.status(404).json({ message: "Address not found" });
            }
            return res.status(200).json({ message: "Address Updated Successfully" })
        }
        //logic for vendor
        else if (role === "vendor") {
            const result = await Vendor.findOneAndUpdate({ user: user }, { $set: { address: updates } })
            if (result.matchedCount === 0) return res.status(404).json({ message: "Vendor Not Found" })
            return res.status(200).json({ message: "Address Updated" })
        }
        return res.status(400).json({ message: "Some Error Occured" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

export { userlogin, userregister, userlogout, Addadress, removeaddress, getaddress, updateaddress };
