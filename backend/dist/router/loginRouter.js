"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controller/loginController");
const router = (0, express_1.Router)();
router.post("/login", loginController_1.getOtp);
router.post("/verifyotp", loginController_1.verifyOtp);
exports.default = router;
