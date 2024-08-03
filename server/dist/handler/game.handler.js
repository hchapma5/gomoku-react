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
const express_1 = __importDefault(require("express"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const deserializeUser_1 = require("../middleware/deserializeUser");
const game_service_1 = require("../service/game.service");
const game_schema_1 = require("../schema/game.schema");
const gameLogic_1 = require("../util/gameLogic");
const gameDataFormat_1 = require("../util/gameDataFormat");
const constants_1 = require("../constants");
const gameHandler = express_1.default.Router();
gameHandler.use(deserializeUser_1.deserializeUser);
gameHandler.get('/game-history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const games = yield (0, game_service_1.getAllGamesByUserId)(userId);
    if (games) {
        return res.status(200).send(games.map((game) => ({
            id: game._id,
            outcome: (0, gameDataFormat_1.formatOutcome)(game.state),
            date: (0, gameDataFormat_1.formatDate)(game.createdAt),
        })));
    }
    else {
        return res.status(404).send({ message: 'No games found' });
    }
}));
gameHandler.get('/:id', (0, validateSchema_1.default)(game_schema_1.getGameByIdSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.id;
    const game = yield (0, game_service_1.getGameById)(gameId);
    if (game) {
        return res.status(200).send({
            size: game.boardSize,
            moves: game.moveList,
            outcome: (0, gameDataFormat_1.formatOutcome)(game.state),
        });
    }
    else {
        return res.status(404).send({ message: 'Game not found' });
    }
}));
gameHandler.post('/', (0, validateSchema_1.default)(game_schema_1.createGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { boardSize } = req.body;
        const newGame = yield (0, game_service_1.createGame)({ userId, boardSize });
        return res.status(200).send({ gameId: newGame._id });
    }
    catch (e) {
        return res.status(500).send(e);
    }
}));
gameHandler.delete('/:id', (0, validateSchema_1.default)(game_schema_1.deleteGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.id;
    const userId = req.userId;
    yield (0, game_service_1.deleteGame)(gameId, userId);
    return res.sendStatus(200);
}));
gameHandler.put('/:id', (0, validateSchema_1.default)(game_schema_1.updateGameSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.id;
    const userId = req.userId;
    const { player, row, col } = req.body;
    const game = yield (0, game_service_1.getGameById)(gameId);
    if (!game)
        return res.status(404).send({ message: 'Game not found' });
    // This is purely for POSTMAN testing purposes
    if (game.moveList.some((move) => move.player === player && move.row === row && move.col === col))
        return res
            .status(400)
            .send({ message: 'Bad Move... Try a different position' });
    const board = (0, gameLogic_1.buildGameBoard)(game.boardSize, [
        ...game.moveList,
        { player, row, col },
    ]);
    let response = constants_1.GameState.IN_PROGRESS;
    if ((0, gameLogic_1.checkWin)(player, board)) {
        response =
            player === constants_1.Stone.BLACK ? constants_1.GameState.BLACK_WIN : constants_1.GameState.WHITE_WIN;
    }
    else if ((0, gameLogic_1.checkDraw)(board)) {
        response = constants_1.GameState.DRAW;
    }
    const updatedGame = yield (0, game_service_1.updateGame)(gameId, userId, {
        state: response,
        moveList: [...game.moveList, { player, row, col }],
    });
    if (updatedGame) {
        return res.status(200).send({ state: response });
    }
    else {
        return res.status(500).send('Error updating game');
    }
}));
exports.default = gameHandler;
