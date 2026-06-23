import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export const ActivityModel = model<ActivityDocument>('Activity', activitySchema);

