import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
// protect by guess
const protect = asyncHandler(async (req, res, next) => {

   let token;
   token  = req.cookies.jwt

   if (token) {
       try {
        // if exist and match token
        let decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await User.findById(decoded.userId).select('-password')
        res.status(200)
        next()
    } catch (error) {
        // if User not found
        res.status(401)
        throw new Error("Not Authorized, invalid token")
    }
   }else {
    res.status(401)
    throw new Error("Not Authorized, no token")
   }
})  
export {
    protect
}