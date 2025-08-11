import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    galleryType : {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Gallery", gallerySchema);