import mongoose from "mongoose";
export const connectMongoDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Mongodb connected on : ", conn.connection.host);
  } catch (error) {
    console.log("Mongodb error : ", error);
  }
};
