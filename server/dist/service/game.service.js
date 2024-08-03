"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGame = exports.deleteGame = exports.createGame = exports.getGameById = exports.getAllGamesByUserId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const game_model_1 = __importDefault(require("../model/game.model"));
function getAllGamesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.find({
            userId: userId,
            // state: { $ne: 'IN_PROGRESS' },
        }).lean();
    });
}
exports.getAllGamesByUserId = getAllGamesByUserId;
function getGameById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) }).lean();
    });
}
exports.getGameById = getGameById;
function createGame(game) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.create(game);
    });
}
exports.createGame = createGame;
function deleteGame(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.deleteOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
            userId: new mongoose_1.default.Types.ObjectId(userId),
        });
    });
}
exports.deleteGame = deleteGame;
function updateGame(id, userId, input) {
    return __awaiter(this, void 0, void 0, function* () {
        return game_model_1.default.findOneAndUpdate({
            _id: new mongoose_1.default.Types.ObjectId(id),
            userId: new mongoose_1.default.Types.ObjectId(userId),
        }, input, { new: true });
    });
}
exports.updateGame = updateGame;
