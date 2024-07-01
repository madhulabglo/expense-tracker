"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const otpRouter_1 = __importDefault(require("./router/otpRouter"));
const expenseRouter_1 = __importDefault(require("./router/expenseRouter"));
const onlyexpenseRouter_1 = __importDefault(require("./router/onlyexpenseRouter"));
const roommateRouter_1 = __importDefault(require("./router/roommateRouter"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://expense-tracker-frontend-git-master-madhulabglos-projects.vercel.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use((0, cors_1.default)(corsOptions));
// Enhanced logging
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    // console.log('Request Headers:', req.headers);
    next();
});
// Middleware to parse JSON
app.use(express_1.default.json());
// Basic route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
(0, dbConfig_1.default)();
// Routes
app.use('/api/otp', otpRouter_1.default);
app.use('/api/expenses', expenseRouter_1.default);
app.use('/api/onlyexpenses', onlyexpenseRouter_1.default);
app.use('/api/roommates', roommateRouter_1.default);
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
