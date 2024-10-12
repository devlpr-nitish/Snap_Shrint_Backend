import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,   // Removes whitespace
        minlength: 3  // Minimum length for the name
    },
    profileImage: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] // Validate the format
    },
    password: {
        type: String,
        required: true,
        minlength: 6  // Minimum length for the password
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set to current date
    }
})

export const userModel = mongoose.model('User', userSchema); 