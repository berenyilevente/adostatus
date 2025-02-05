import { toJSON } from "@/lib/mongo/toJSON";
import mongoose from "mongoose";

export interface IUser {
  email: string;
  emailVerified: Date;
  mobileNumber: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.plugin(toJSON);

export const User =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
