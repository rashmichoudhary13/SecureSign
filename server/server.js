import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = process.env.EXPRESS_FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

// API Endpoints
app.get('/', (req,res)=> res.send("Now the server has started"))
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, ()=> console.log(`Server Started on port ${port}`));
