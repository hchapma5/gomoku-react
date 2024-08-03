"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB_1 = __importDefault(require("./util/connectDB"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT;
(0, connectDB_1.default)();
mongoose_1.default.connection.once('connected', () => {
    console.log('Connected to database');
    app_1.default.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
