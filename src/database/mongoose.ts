import mongoose from "mongoose";

import { config, MONGODB_URI } from "@/config";

const local = `mongodb://127.0.0.1:27017/${config.db.name}`;
export const mongodbUri = MONGODB_URI || local;

const connectMongo = async () => {
  if (!mongodbUri) {
    throw new Error("Add the mongodb uri in the mongo.ts file to use mongoose");
  }
  return mongoose
    .connect(mongodbUri)
    .catch((e: any) => console.error("Mongoose Client Error: " + e.message));
};

export default connectMongo;
