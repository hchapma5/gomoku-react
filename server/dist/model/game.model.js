"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const gameSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    moveList: { type: Array, default: [] },
    boardSize: {
        type: Number,
        required: true,
    },
    state: { type: String, default: constants_1.GameState.IN_PROGRESS },
    createdAt: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model('Game', gameSchema);
