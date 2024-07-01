"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otpController_1 = require("../controller/otpController");
const router = (0, express_1.Router)();
router.post("/", otpController_1.otpgenerator);
router.post("/verify-otp", otpController_1.verifyOtp);
exports.default = router;
//# sourceMappingURL=otpRouter.js.map