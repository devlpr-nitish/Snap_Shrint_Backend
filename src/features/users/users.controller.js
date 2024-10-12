
import { userModel } from "./users.schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cloudinary from "../../config/cloudinary.config.js";
import fs from 'fs';

export default class UserController {

    async signup(req, res, next) {

        try {
            const { name, email, password } = req.body;
            console.log(req.body);
            console.log(req.file);

            const user = await userModel.findOne({ email });
            if (user) {
                return res.status(409).json({ message: "User already exists, you can sign in", success: false });
            }

            // Check if file exists before trying to upload
            if (!req.file || !req.file.path) {
                return res.status(400).json({
                    message: "No file uploaded",
                    success: false
                });
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads'
            });

            // make user model
            const newUser = new userModel({ name, profileImage: result.secure_url, email, password });
            newUser.password = await bcrypt.hash(password, 10);
            await newUser.save();

            await fs.unlink(req.file.path, (err) => {
                if (err) console.log(err);
                else console.log("Local file deleted successfully!");
            })

            res.status(201).json({
                message: "signup successfully",
                success: true,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }
    async editProfile(req, res, next) {

        try {
            const { name } = req.body;
            const userID = req.userID;

            if (!userID) {
                return res.status(400).json({
                    message: "User ID is missing",
                    success: false
                });
            }


            // Check if file exists before trying to upload
            if (!req.file || !req.file.path) {
                return res.status(400).json({
                    message: "No file uploaded",
                    success: false
                });
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads'
            });

            await fs.unlink(req.file.path, (err) => {
                if (err) console.log(err);
                else console.log("Local file deleted successfully!");
            })

            const user = await userModel.findByIdAndUpdate(
                userID,
                { name: name, profileImage: result.secure_url },
                { new: true, runValidators: true }
            );





            if (!user) {
                return res.status(409).json({ message: "User not exists, you can't edit this profile", success: false });
            }


            return res.status(201).json({
                message: "profile edited successfully",
                success: true,
                user: user
            });

        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }

    async signin(req, res, next) {

        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            const errorMess = "Auth failed email or password is wrong";

            if (!user) {
                return res.status(403).json({ message: errorMess, success: false });
            }
            // make user model
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(403).json({ message: errorMess, success: false });
            }

            const jwtToken = jwt.sign({ email: user.email, userID: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(201).json({
                message: "signin successfully",
                success: true,
                jwtToken,
                email,
                name: user.name,
                profileImage: user.profileImage
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }

    }
}