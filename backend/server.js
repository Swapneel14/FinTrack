import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './configs/db.js';

const app = express();
const port = 3000;

//Middlewares
app.use(express.json());
app.use(cors());

await connectDB();


//API Route
app.get('/',(req,res)=>{
    res.send('Hello I am Live');
})

app.listen(port,()=>{
    console.log("App is listenning to port 3000");
})