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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB = process.env.MONGODB_URI ||
    `mongodb+srv://madhumathilabglo:DSJipD9f5HsCTjUl@cluster0.0ibdwov.mongodb.net/expense_tracker?retryWrites=true&w=majority&appName=Cluster0`;
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (DB) {
            yield mongoose_1.default.connect(DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("DB connected Successfully");
        }
        else {
            console.log("MONGODB_URI is not defined in the environment variables.");
        }
    }
    catch (error) {
        console.log("DB not connected", error);
    }
});
exports.default = connectToDB;
//# sourceMappingURL=dbConfig.js.map