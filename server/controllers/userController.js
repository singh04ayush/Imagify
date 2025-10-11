import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);

        // Save user and handle duplicate key errors specifically
        let user;
        try {
            user = await newUser.save();
        } catch (error) {
            // If duplicate key (E11000), log a concise warning and return 409 without printing full stack
            if (error && error.code === 11000) {
                console.warn(`Duplicate registration attempt for email: ${error.keyValue && error.keyValue.email ? error.keyValue.email : email}`);
                return res.status(409).json({
                    success: false,
                    message: 'An account with this email already exists. Please log in instead.',
                    type: 'info'
                });
            }

            // Unexpected error while saving - log full error for debugging
            console.error('Error saving new user:', error);
            return res.status(500).json({ success: false, message: 'Server error during registration.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.status(201).json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.error('registerUser unexpected error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};




const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:'user does not exists'});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            
            res.json({success:true, token, user: {name: user.name}});

        }else{
            return res.json({success:false, message:'invalid credentials'});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
}


const userCredits = async(req, res) => {
    try {
        const userId = req.user.id;  // Get userId from auth middleware

        if (!userId) {
            console.error('No user ID provided');
            return res.json({ success: false, message: "User ID not found" });
        }

        const user = await userModel.findById(userId);
        
        if (!user) {
            console.error('User not found:', userId);
            return res.json({ success: false, message: "User not found" });
        }

        // Initialize creditBalance if it doesn't exist
        if (user.creditBalance === undefined) {
            user.creditBalance = 0;
            await user.save();
        }

        console.log('Found user:', { userId, credits: user.creditBalance, name: user.name });
        
        res.json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name }
        });
    } catch (error) {
        console.error('Error in userCredits:', error);
        res.json({ success: false, message: error.message });
    }
}


export {registerUser, loginUser, userCredits}