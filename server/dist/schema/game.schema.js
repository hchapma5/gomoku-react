"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGameSchema = exports.updateGameSchema = exports.createGameSchema = exports.getGameByIdSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        boardSize: (0, zod_1.number)({
            required_error: 'Board size is required',
        }),
    }),
};
const updateGameParams = {
    body: (0, zod_1.object)({
        player: (0, zod_1.string)({ required_error: 'Player is required' }),
        board: (0, zod_1.array)((0, zod_1.array)((0, zod_1.string)())).nonempty({ message: 'Board is required' }),
        moveList: (0, zod_1.array)((0, zod_1.object)({
            row: (0, zod_1.number)({ required_error: 'Row is required' }),
            col: (0, zod_1.number)({ required_error: 'Col is required' }),
            player: (0, zod_1.string)({ required_error: 'Player is required' }),
        })),
    }),
};
const getParams = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Game id is required' }),
    }),
};
exports.getGameByIdSchema = (0, zod_1.object)(Object.assign({}, getParams));
exports.createGameSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateGameSchema = (0, zod_1.object)(Object.assign({}, getParams));
exports.deleteGameSchema = (0, zod_1.object)(Object.assign({}, getParams));
