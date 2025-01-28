import mongoose from "mongoose";

import { toJSON } from "@/lib/mongo";

export const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

leadSchema.plugin(toJSON);

export const Lead = mongoose.models?.Lead || mongoose.model("Lead", leadSchema);
