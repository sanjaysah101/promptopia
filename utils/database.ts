import mongoose from "mongoose";
import { config } from "../config";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    // console.log("mongodb is already connected");
    return;
  }

  try {
    await mongoose.connect(config.MONGODB_URI, {
      dbName: "promptopia",
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });

    isConnected = true;
  } catch (error) {
    // console.log({ "error:" : error });
    throw new Error("unable to connect to database");
  }
};
