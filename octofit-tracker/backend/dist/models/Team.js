"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    captainUsername: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 1 },
    points: { type: Number, default: 0, min: 0 },
}, { timestamps: true });
exports.TeamModel = (0, mongoose_1.model)('Team', teamSchema);
