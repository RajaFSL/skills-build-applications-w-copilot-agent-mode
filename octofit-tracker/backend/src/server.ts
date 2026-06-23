import express from 'express';
import mongoose from 'mongoose';
import { ActivityModel } from './models/Activity';
import { LeaderboardModel } from './models/Leaderboard';
import { TeamModel } from './models/Team';
import { UserModel } from './models/User';
import { WorkoutModel } from './models/Workout';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const items = await UserModel.find().sort({ totalPoints: -1, username: 1 }).lean();
  res.json({ endpoint: `${baseUrl}/api/users/`, count: items.length, items });
});

app.get('/api/teams/', async (_req, res) => {
  const items = await TeamModel.find().sort({ points: -1, name: 1 }).lean();
  res.json({ endpoint: `${baseUrl}/api/teams/`, count: items.length, items });
});

app.get('/api/activities/', async (_req, res) => {
  const items = await ActivityModel.find().sort({ completedAt: -1 }).lean();
  res.json({ endpoint: `${baseUrl}/api/activities/`, count: items.length, items });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const items = await LeaderboardModel.find().sort({ rank: 1 }).lean();
  res.json({ endpoint: `${baseUrl}/api/leaderboard/`, count: items.length, items });
});

app.get('/api/workouts/', async (_req, res) => {
  const items = await WorkoutModel.find().sort({ difficulty: 1, title: 1 }).lean();
  res.json({ endpoint: `${baseUrl}/api/workouts/`, count: items.length, items });
});

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`OctoFit backend listening on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

void startServer();
