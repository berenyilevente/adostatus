import mongoose from "mongoose";

import { config, MONGODB_URI } from "@/config";

const local = `mongodb://127.0.0.1:27017/${config.db.name}`;

const mongodbUri = MONGODB_URI || local;

const connectMongo = async () => {
  if (!mongodbUri) {
    throw new Error("MongoDB URI is not set");
  }

  return mongoose
    .connect(mongodbUri)
    .catch((e) => console.error("Mongoose Client Error: " + e.message));
};

export default connectMongo;
