import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const port= process.env.PORT ;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=>{
    console.log(`The Server is running on Port ${port}`);
});