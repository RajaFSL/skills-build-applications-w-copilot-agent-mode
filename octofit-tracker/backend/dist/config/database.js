"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = exports.defaultMongoUri = exports.databaseName = void 0;
exports.connectToDatabase = connectToDatabase;
exports.disconnectFromDatabase = disconnectFromDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.databaseName = 'octofit_db';
exports.defaultMongoUri = `mongodb://127.0.0.1:27017/${exports.databaseName}`;
exports.mongoUri = process.env.MONGO_URI || exports.defaultMongoUri;
async function connectToDatabase() {
    await mongoose_1.default.connect(exports.mongoUri);
}
async function disconnectFromDatabase() {
    await mongoose_1.default.disconnect();
}
