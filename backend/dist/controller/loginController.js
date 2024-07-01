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
exports.verifyOtp = exports.getOtp = void 0;
const otpgenerator_1 = require("../otp/otpgenerator");
const sms_1 = require("../utils/sms");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const PostNumber = async (req: Request, res: Response): Promise<void> => {
//   console.log(req.body, "Request Body"); // Add detailed logging
//   const { phone } = req.body;
//   const apiKey = process.env.FAST2SMS_API_KEY || "9vGd4troHb5sVlaf7IwAQBCSKRL61Ogk2c8iMNpeuFzZhTWYX0BOE5Y4fhkQHWwvgU6saR3VMNK0oDCZ";
//   // const senderId = "FSTSMS"; // Ensure this is correct based on Fast2SMS documentation
//   try {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const params = {
//       authorization: apiKey,
//       variables_values: `${otp}`,
//       route: "otp",
//       // sender_id: senderId, // Ensure this is correct based on Fast2SMS documentation
//       numbers: phone,
//     };
//     console.log("Request Params:", params); // Log request parameters
//     const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", { params });
//     console.log(response.data, "API Response"); // Log the actual response data
//     res.json({ success: true, message: "OTP sent successfully!" });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     if (axios.isAxiosError(error) && error.response) {
//       // Log the response from the API for debugging
//       console.error("API Response Error:", error.response.data);
//       res.status(error.response.status).json({ success: false, message: error.response.data.message || "Failed to send OTP." });
//     } else {
//       res.status(500).json({ success: false, message: "Failed to send OTP." });
//     }
//   }
// };
const getOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, method } = req.body;
    const otp = (0, otpgenerator_1.generateOTP)();
    const payload = { phone, otp };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_CODE || "jhjherwe945845954jhglsitueoiriuew", { expiresIn: "1d" });
    try {
        if (method === "sms") {
            yield (0, sms_1.sendSMS)(phone, `Your OTP is ${otp}`);
        }
        else {
            res.status(400).send({ message: "Invalid method" });
        }
        res.status(201).json({ message: "OTP sent successfully", token });
    }
    catch (error) {
        res.status(500).json({ message: "Error sending OTP", error });
    }
});
exports.getOtp = getOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, otp } = req.body;
    try {
        const decoded = (yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "jhjherwe945845954jhglsitueoiriuew"));
        if (decoded.otp === otp) {
            res.send({ message: "OTP verified successfully", token: token });
        }
        else {
            res.status(400).send({ message: "Invalid OTP" });
        }
    }
    catch (error) {
        res.status(400).send({ message: "Invalid or expired token", error });
    }
});
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=loginController.js.map