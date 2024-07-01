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
exports.verifyOtp = exports.otpgenerator = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const otpModel_1 = require("../model/otpModel");
const smsServices_1 = require("../services/smsServices");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET_CODE || "jhjherwe945845954jhglsitueoiriuew";
const otpgenerator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        const newOtp = new otpModel_1.Otp({ email, otp });
        console.log(email, otp, "emaillll otptptptpt");
        yield (0, smsServices_1.sendOtp)(email, otp);
        console.log("OTP sent to email");
        yield newOtp.save();
        console.log("OTP saved to DB successfully");
        res.status(201).json({ message: "OTP sent to your email" });
    }
    catch (error) {
        console.error("Error in generateOtp:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
});
exports.otpgenerator = otpgenerator;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        if (!otp) {
            return res.status(400).json({ otp: "OTP is required" });
        }
        const otpRecord = yield otpModel_1.Otp.findOne({ otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        const email = otpRecord.email;
        const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: "1d" });
        // Remove the OTP record from the database after verification
        // await Otp.deleteOne({ _id: otpRecord._id });
        res.status(200).json({
            token,
            email: otpRecord.email,
            username: `user` + otpRecord.id.slice(0, 4),
        });
    }
    catch (error) {
        console.error("Error in verifyOtp:", error);
        res.status(500).json({ message: "Failed to verify OTP" });
    }
});
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=otpController.js.map