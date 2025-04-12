import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    style: {
        type: String,
        default: 'default'
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Image', imageSchema); 