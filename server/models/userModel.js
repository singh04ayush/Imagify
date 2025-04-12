import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creditBalance: { type: Number, default: 5 }
}, {
    timestamps: true  // Add timestamps for better tracking
});

// Fix the model registration
const userModel = mongoose.model("user", userSchema);

export default userModel;