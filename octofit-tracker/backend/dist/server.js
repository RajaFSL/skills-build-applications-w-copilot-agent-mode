"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Team_1 = require("./models/Team");
const User_1 = require("./models/User");
const Workout_1 = require("./models/Workout");
const app = (0, express_1.default)();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const items = await User_1.UserModel.find().sort({ totalPoints: -1, username: 1 }).lean();
    res.json({ endpoint: `${baseUrl}/api/users/`, count: items.length, items });
});
app.get('/api/teams/', async (_req, res) => {
    const items = await Team_1.TeamModel.find().sort({ points: -1, name: 1 }).lean();
    res.json({ endpoint: `${baseUrl}/api/teams/`, count: items.length, items });
});
app.get('/api/activities/', async (_req, res) => {
    const items = await Activity_1.ActivityModel.find().sort({ completedAt: -1 }).lean();
    res.json({ endpoint: `${baseUrl}/api/activities/`, count: items.length, items });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const items = await Leaderboard_1.LeaderboardModel.find().sort({ rank: 1 }).lean();
    res.json({ endpoint: `${baseUrl}/api/leaderboard/`, count: items.length, items });
});
app.get('/api/workouts/', async (_req, res) => {
    const items = await Workout_1.WorkoutModel.find().sort({ difficulty: 1, title: 1 }).lean();
    res.json({ endpoint: `${baseUrl}/api/workouts/`, count: items.length, items });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        app.listen(port, () => {
            console.log(`OctoFit backend listening on ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}
void startServer();
