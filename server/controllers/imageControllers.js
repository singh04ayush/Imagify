import axios from 'axios'
import userModel from "../models/userModel.js";
import imageModel from "../models/imageModel.js";
import FormData from "form-data";
import mongoose from 'mongoose';

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({ success: false, message: "Missing details" });
        }

        if (user.creditBalance === 0 || user.creditBalance < 0) {
            return res.json({ success: false, message: "No credit Balance", creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Update user credits
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        // Save the generation to database
        await imageModel.create({
            userId: user._id,
            prompt,
            imageUrl: resultImage
        });

        res.json({ 
            success: true, 
            message: "Image Generated", 
            creditBalance: user.creditBalance - 1, 
            resultImage 
        });

    } catch (error) {
        console.error('Error in generateImage:', error);
        return res.json({ success: false, message: error.message });
    }
};

export const getUserGenerations = async (req, res) => {
    try {
        // Get userId from auth middleware
        const userId = req.user?.id;

        if (!userId) {
            console.error('No userId found in request');
            return res.json({ success: false, message: "User ID not found" });
        }

        console.log('Fetching generations for userId:', userId);

        // Check if imageModel is properly initialized
        if (!mongoose.models.Image) {
            console.error('Image model not properly initialized');
            return res.json({ success: false, message: "Database model not initialized" });
        }

        // Get total number of generations
        const totalGenerations = await imageModel.countDocuments({ userId });
        console.log('Total generations found:', totalGenerations);

        // Get recent generations (last 5)
        const recentGenerations = await imageModel.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('prompt createdAt _id');
        console.log('Recent generations found:', recentGenerations.length);

        // Get unique styles used
        const uniqueStyles = await imageModel.distinct('style', { userId });
        console.log('Unique styles found:', uniqueStyles.length);

        res.json({
            success: true,
            totalGenerations,
            recentGenerations,
            uniqueStyles: uniqueStyles.length
        });

    } catch (error) {
        console.error('Error in getUserGenerations:', error);
        return res.json({ success: false, message: error.message });
    }
};

export default { generateImage, getUserGenerations };