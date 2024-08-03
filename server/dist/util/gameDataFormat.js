"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOutcome = exports.formatDate = void 0;
const constants_1 = require("../constants");
function formatDate(date) {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}
exports.formatDate = formatDate;
function formatOutcome(state) {
    switch (state) {
        case constants_1.GameState.BLACK_WIN:
            return 'BLACK Wins!';
        case constants_1.GameState.WHITE_WIN:
            return 'WHITE Wins!';
        case constants_1.GameState.DRAW:
            return "It's a Draw!";
        case constants_1.GameState.IN_PROGRESS:
            return 'Game in progress';
    }
}
exports.formatOutcome = formatOutcome;
