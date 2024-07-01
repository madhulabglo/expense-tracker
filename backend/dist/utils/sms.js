"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
function sendSMS(to, body) {
    return client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
        to,
    });
}
exports.sendSMS = sendSMS;
//# sourceMappingURL=sms.js.map