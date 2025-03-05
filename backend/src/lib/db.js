import mongoose from "mongoose";
// should we import dotenv?
export const connectDB = async () => {
    try{
       const conn = await mongoose.connect(process.env.MONGODB_URI);
       console.log(`connected to mongodb ${conn.connection.host}`)
    }
    catch(error) {
        console.log("failed connecting to mongodb", error);
        process.exit(1);
        
    }
}