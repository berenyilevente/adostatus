import { InferSchemaType } from "mongoose";

import { leadSchema } from "../models/lead.model";

export interface ILead extends InferSchemaType<typeof leadSchema> {
  id: string;
}
