import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    weekLabel: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export const LeaderboardModel = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

