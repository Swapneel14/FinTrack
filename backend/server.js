import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = 3000;

//Middlewares
app.use(express.json());
app.use(cors());


//API Route
app.get('/',(req,res)=>{
    res.send('Hello I am Live');
})

app.listen(port,()=>{
    console.log("App is listenning to port 3000");
})