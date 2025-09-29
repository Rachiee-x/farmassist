"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const weather_1 = __importDefault(require("./routes/weather"));
const govschemes_1 = __importDefault(require("./routes/govschemes"));
const chat_1 = __importDefault(require("./routes/chat"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// prefix API
app.use('/api/weather', weather_1.default);
app.use('/api/govschemes', govschemes_1.default);
app.use('/api/chat', chat_1.default);
app.get('/', (req, res) => {
    res.json({ ok: true, message: 'Project Bolt backend is running' });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
