import jwt from "jsonwebtoken";

const generateToken = async (res, userId) => {
    console.log('jwt')
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, { expiresIn: '10d'} )

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000
    })
}
export default generateToken