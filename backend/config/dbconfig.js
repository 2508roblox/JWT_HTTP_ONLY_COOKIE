import mongoose from "mongoose";

const connectDb = async() => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected')
    } catch (error) {
        console.log(`Database Error: ${error.message}`)

    }
}
export default connectDb