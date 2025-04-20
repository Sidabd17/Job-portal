const jwt = require('jsonwebtoken');

const isAuthenticated = async(req, res , next) =>{
    try {
        // console.log("Cookies received:", req.cookies);
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
           return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        }

        const decode = await jwt.verify(token , process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"invalid token",
                success:false
            })
        }

        req.id = decode.userId;

        next();
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = isAuthenticated;