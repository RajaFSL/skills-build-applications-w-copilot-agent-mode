import mongoose from 'mongoose';

export const databaseName = 'octofit_db';
export const defaultMongoUri = `mongodb://127.0.0.1:27017/${databaseName}`;
export const mongoUri = process.env.MONGO_URI || defaultMongoUri;

export async function connectToDatabase(): Promise<void> {
  await mongoose.connect(mongoUri);
}

export async function disconnectFromDatabase(): Promise<void> {
  await mongoose.disconnect();
}
