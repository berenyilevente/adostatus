import { toJSON } from "@/lib/mongo/toJSON";
import mongoose from "mongoose";

export interface IUser {
  email: string;
  emailVerified: Date;
  id: string;
  createdAt: Date;
  updatedAt: Date;
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.plugin(toJSON);

export const User =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);
