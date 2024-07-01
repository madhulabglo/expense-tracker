"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = require("mongoose");
const OtpSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: "5m" } }
});
exports.Otp = (0, mongoose_1.model)("EmailOtp", OtpSchema);
//# sourceMappingURL=otpModel.js.map