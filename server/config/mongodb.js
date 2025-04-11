import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB Connected Successfully");
        });

        mongoose.connection.on('error', (err) => {
            console.error("MongoDB Connection Error:", err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("MongoDB Disconnected");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/imagify`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connection Attempted");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;