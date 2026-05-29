import mongoose from "mongoose";

const connectDB = async () =>{
  try{
    mongoose.connection.on('connected',()=>console.log('data base connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/FinTrack`);
  }
  catch (err){
console.log(err.message);
  }
}

export default connectDB;