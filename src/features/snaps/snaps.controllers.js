import cloudinary from "../../config/cloudinary.config.js";
import postModel from "./post.schmas.js";
import snapModel from "./snaps.schemas.js";
import { ObjectId } from "mongodb";
import fs from 'fs';
import openai from "../../config/openai.config.js";


export default class SnapController {

    async saveSnap(req, res, next) {
        try {
            const { snapUrl } = req.query;
            const userID = req.userID;
            if (!userID) {
                return res.status(400).json({ message: "unauthorized user", success: false });
            }

            const newSnap = new snapModel({
                user: userID,
                snapUrl: snapUrl,
            });

            await newSnap.save();
            return res.status(201).json({ message: 'snap saved successfully', success: true })
        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }

    }

    async getSnaps(req, res, next) {
        try {
            const userID = req.userID;
            if (!userID) {
                return res.status(400).json({ message: "unauthorized user", success: false });
            }
            const snaps = await snapModel.find({ user: userID });

            return res.status(200).json({ snaps: snaps, success: true });

        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }

    async deleteSnaps(req, res, next) {
        try {
            const userID = req.userID;
            const snapId = req.params.id;
            if (!userID) {
                return res.status(400).json({ message: "unauthorized user", success: false });
            }

            await snapModel.deleteOne({ user: userID, _id: new ObjectId(snapId) });

            return res.status(200).json({ message: "deleted sucessfully", success: true });

        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }
    async deletePosts(req, res, next) {
        try {
            const userID = req.userID;
            const postId = req.params.id;
            if (!userID) {
                return res.status(400).json({ message: "unauthorized user", success: false });
            }

            await postModel.deleteOne({ user: userID, _id: new ObjectId(postId) });

            return res.status(200).json({ message: "deleted sucessfully", success: true });

        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }

    async createPost(req, res, next) {
        try {
            const userID = req.userID;
            if (!userID) {
                return res.status(400).json({ message: "unauthorized user", success: false });
            }

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads'
            });

            const newPost = new postModel({
                user: userID,
                imageUrl: result.secure_url
            })

            await newPost.save();

            fs.unlink(req.file.path, (err) => {
                if (err) console.log(err);
                else console.log("Local file deleted successfully!");
            })

            res.status(201).json({ message: 'Image uploaded successfully!', success: true, post: newPost });

        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }

    async getPosts(req, res, next) {
        try {
            const userID = req.userID;
            if (!userID) {
                return res.status(400).json({ message: "unauthorized user", success: false });
            }
            const posts = await postModel.find({ user: userID });

            return res.status(200).json({ posts: posts, success: true });
        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }

    async getAiImage(req, res, next) {

        try {
            const userID = req.userID;
            if (!userID) {
                return res.status(400).json({ message: "unauthorized user", success: false });
            }
            const { prompt, num } = req.body;

            const aiResponse = await openai.images.generate({
                prompt,
                n: num,
                size: "1024x1024"
            })

            console.log(aiResponse);

            const images = aiResponse.data.data;

            return res.status(200).json({ images: images, success: true });
        } catch (err) {
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    }
}