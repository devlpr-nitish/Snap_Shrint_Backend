
import mongoose from "mongoose";

const snapSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    snapUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const snapModel = mongoose.model('Snap', snapSchema);
export default snapModel;