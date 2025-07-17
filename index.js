import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {router} from "./routes/contactRoutes.js";
import {userRouter} from "./routes/userRoutes.js"
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDb } from './config/dbConnnection.js';
import cors from "cors";
import cookieParser from 'cookie-parser';


dotenv.config();
connectDb();

const port= process.env.PORT ;
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: process.env.FRONTEND_URL, // Adjust the origin to the correct port
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/contacts",router);
app.use("/api/users",userRouter);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`The Server is running on Port ${port}`);
});