import axios from 'axios'
import userModel from "../models/userModel.js";
import FormData from "form-data";


export const generateImage = async (req, res)=>{
    try {
        
        const {userId, prompt} = req.body

        const user = await userModel.findById(userId)

        if(!user || !prompt){
            return res.json({success:false, message:"Missing details"})
        }

        if(user.creditBalance === 0 || userModel.creditBalance<0){
            return res.json({success:false, message:"No credit Balance", creditBalance: user.creditBalance})
        }

        const formData = new FormData()
        formData.append('prompt', prompt)

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
              },
              responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance -1})

        res.json({success: true, message: "Image Generated", creditBalance: user.creditBalance - 1, resultImage})


    } catch (error) {
        return res.json({success:false, message:error.message});
    }
}


export default generateImage;