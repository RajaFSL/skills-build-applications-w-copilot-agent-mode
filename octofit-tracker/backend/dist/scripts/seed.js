"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        User_1.UserModel.deleteMany({}),
        Team_1.TeamModel.deleteMany({}),
        Activity_1.ActivityModel.deleteMany({}),
        Leaderboard_1.LeaderboardModel.deleteMany({}),
        Workout_1.WorkoutModel.deleteMany({}),
    ]);
    await Team_1.TeamModel.insertMany([
        { name: 'Coastal Sprinters', captainUsername: 'ava', memberCount: 4, points: 950 },
        { name: 'Peak Performers', captainUsername: 'liam', memberCount: 5, points: 1040 },
        { name: 'Metro Lifters', captainUsername: 'noah', memberCount: 4, points: 880 },
    ]);
    await User_1.UserModel.insertMany([
        {
            username: 'ava',
            displayName: 'Ava Brooks',
            email: 'ava.brooks@octofit.test',
            teamName: 'Coastal Sprinters',
            totalPoints: 260,
        },
        {
            username: 'liam',
            displayName: 'Liam Patel',
            email: 'liam.patel@octofit.test',
            teamName: 'Peak Performers',
            totalPoints: 320,
        },
        {
            username: 'noah',
            displayName: 'Noah Kim',
            email: 'noah.kim@octofit.test',
            teamName: 'Metro Lifters',
            totalPoints: 280,
        },
        {
            username: 'mia',
            displayName: 'Mia Chen',
            email: 'mia.chen@octofit.test',
            teamName: 'Peak Performers',
            totalPoints: 300,
        },
    ]);
    await Activity_1.ActivityModel.insertMany([
        {
            username: 'ava',
            activityType: 'Morning Run',
            durationMinutes: 42,
            caloriesBurned: 390,
            completedAt: new Date('2026-06-20T06:30:00Z'),
        },
        {
            username: 'liam',
            activityType: 'HIIT Session',
            durationMinutes: 35,
            caloriesBurned: 420,
            completedAt: new Date('2026-06-20T12:15:00Z'),
        },
        {
            username: 'mia',
            activityType: 'Cycling',
            durationMinutes: 50,
            caloriesBurned: 460,
            completedAt: new Date('2026-06-21T09:10:00Z'),
        },
        {
            username: 'noah',
            activityType: 'Strength Circuit',
            durationMinutes: 40,
            caloriesBurned: 370,
            completedAt: new Date('2026-06-21T18:00:00Z'),
        },
    ]);
    await Workout_1.WorkoutModel.insertMany([
        {
            title: 'Power Legs Blast',
            intensity: 'High',
            targetArea: 'Lower Body',
            durationMinutes: 45,
            difficulty: 'Advanced',
        },
        {
            title: 'Core Stability Flow',
            intensity: 'Medium',
            targetArea: 'Core',
            durationMinutes: 30,
            difficulty: 'Intermediate',
        },
        {
            title: 'Upper Body Builder',
            intensity: 'Medium',
            targetArea: 'Upper Body',
            durationMinutes: 35,
            difficulty: 'Intermediate',
        },
    ]);
    await Leaderboard_1.LeaderboardModel.insertMany([
        {
            username: 'liam',
            teamName: 'Peak Performers',
            rank: 1,
            points: 320,
            weekLabel: '2026-W25',
        },
        {
            username: 'mia',
            teamName: 'Peak Performers',
            rank: 2,
            points: 300,
            weekLabel: '2026-W25',
        },
        {
            username: 'noah',
            teamName: 'Metro Lifters',
            rank: 3,
            points: 280,
            weekLabel: '2026-W25',
        },
        {
            username: 'ava',
            teamName: 'Coastal Sprinters',
            rank: 4,
            points: 260,
            weekLabel: '2026-W25',
        },
    ]);
    console.log('Seeding complete for users, teams, activities, leaderboard, and workouts.');
}
seedDatabase()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
