import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoConnect = async () => {
  const uri = process.env.MONGO_URL;

  try {
    const mongo = await mongoose.connect(uri);
    if (mongo) {
      console.log("MongoDB Connected");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

export default mongoConnect;
