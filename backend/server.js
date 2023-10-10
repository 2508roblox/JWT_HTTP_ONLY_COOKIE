import express  from "express";
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDb from "./config/dbconfig.js";
import cookieParser from 'cookie-parser';

dotenv.config()
connectDb()
const port  = process.env.PORT || 5000;
const app = express()
app.use(cookieParser())
// de lay duoc cookies trong req
app.use(express.json())
app.use(express.urlencoded({extended: true}))

 // có next để truyền qua middleware tiếp theo hoặc err để vào middleware (err, req, res , next)

app.use('/api/users', userRoutes )
app.get('/', (req, res) => res.status(200).json('home'))
app.listen(port, () => console.log(`Connected to server on port: ${port} `));


//khi ko có route nào khớp thì nó chạy notfound middlware này, nếu có thì route đó phải ko phản hồi res.json
// trong notFound có next(err) để gọi hàm errorHandler * đk ko được có endpoint  res.
// bị skip khi có err 
// khi có route trùng thì route đó phải có next() 
app.use(notFound)
//middleware error khi có next(err), throw new Error, bình thường không hoạt động

app.use(errorHandler)
 

//  POST /api/users/auth
//  POST /api/users/logout
//  GET /api/users/profile
//  PUT /api/users/profile 
