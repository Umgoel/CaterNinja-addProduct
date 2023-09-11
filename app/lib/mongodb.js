import mongoose from "mongoose";
const ConnectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("DB CONNECTED");
    }
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;