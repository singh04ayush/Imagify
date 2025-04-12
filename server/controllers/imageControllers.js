import axios from 'axios'
import userModel from "../models/userModel.js";
import imageModel from "../models/imageModel.js";
import FormData from "form-data";
import mongoose from 'mongoose';

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.user.id;

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
        const newGeneration = await imageModel.create({
            userId: user._id,
            prompt,
            imageUrl: resultImage
        });

        res.json({ 
            success: true, 
            message: "Image Generated", 
            creditBalance: user.creditBalance - 1, 
            resultImage,
            generationId: newGeneration._id
        });

    } catch (error) {
        console.error('Error in generateImage:', error);
        return res.json({ success: false, message: error.message });
    }
};

export const getUserGenerations = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            console.error('No userId found in request');
            return res.json({ success: false, message: "User ID not found" });
        }

        console.log('Fetching generations for userId:', userId);

        // Get total number of generations
        const totalGenerations = await imageModel.countDocuments({ userId });
        console.log('Total generations found:', totalGenerations);

        // Get recent generations (last 5)
        const recentGenerations = await imageModel.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('prompt createdAt _id imageUrl');
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

export const getGeneration = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        console.log('getGeneration called with:', { id, userId });

        if (!userId || !id) {
            console.error('Missing userId or id:', { userId, id });
            return res.json({ success: false, message: "Missing required parameters" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error('Invalid generation ID:', id);
            return res.json({ success: false, message: "Invalid generation ID" });
        }

        console.log('Looking for generation with:', { _id: id, userId });
        const generation = await imageModel.findOne({ _id: id, userId });
        console.log('Generation query result:', generation);

        if (!generation) {
            console.error('Generation not found for:', { id, userId });
            return res.json({ success: false, message: "Generation not found" });
        }

        const response = {
            success: true,
            generation: {
                _id: generation._id,
                prompt: generation.prompt,
                imageUrl: generation.imageUrl,
                createdAt: generation.createdAt
            }
        };
        console.log('Sending response:', response);

        res.json(response);

    } catch (error) {
        console.error('Error in getGeneration:', error);
        console.error('Error stack:', error.stack);
        return res.json({ success: false, message: error.message });
    }
};

export default { generateImage, getUserGenerations, getGeneration };