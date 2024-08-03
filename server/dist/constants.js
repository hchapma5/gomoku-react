"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = exports.Stone = void 0;
var Stone;
(function (Stone) {
    Stone["BLACK"] = "BLACK";
    Stone["WHITE"] = "WHITE";
    Stone["EMPTY"] = "EMPTY";
})(Stone || (exports.Stone = Stone = {}));
var GameState;
(function (GameState) {
    GameState["IN_PROGRESS"] = "IN_PROGRESS";
    GameState["BLACK_WIN"] = "BLACK_WIN";
    GameState["WHITE_WIN"] = "WHITE_WIN";
    GameState["DRAW"] = "DRAW";
})(GameState || (exports.GameState = GameState = {}));
