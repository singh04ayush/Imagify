

export const geenrateImage = async (req, res)=>{
    try {
        
        const {userId, prompt} = req.body
    } catch (error) {
        return res.json({sucess:false, message:error.message});
    }
}


