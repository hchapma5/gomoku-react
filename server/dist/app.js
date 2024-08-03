"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const auth_handler_1 = __importDefault(require("./handler/auth.handler"));
const game_handler_1 = __importDefault(require("./handler/game.handler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.allowHost || true,
}));
app.use(express_1.default.json());
app.use('/api/auth', auth_handler_1.default);
app.use('/api/game', game_handler_1.default);
exports.server = (0, http_1.createServer)(app);
exports.default = app;
