import jwt from 'jsonwebtoken'


const userAuth = async(req, res, next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({sucess:false, message:'Not Authorize Login again'})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({sucess:false, message:'Not Authorize. Login again'})
        }

        next();

    } catch (error) {
        return res.json({sucess:false, message:error.message});
    }
};

export default userAuth;