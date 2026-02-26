import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URL,{
       useNewUrlParser: true,
       useUnifiedTopology: true,
      });

       console.log("mongoose Connected Successfully");
    }
    catch(error) {
         console.error("Error connect to MongoDB",error);
         process.exit(1); //exit with Failure
    }
}