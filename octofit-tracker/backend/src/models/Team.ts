import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    captainUsername: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 1 },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;
export const TeamModel = model<TeamDocument>('Team', teamSchema);


