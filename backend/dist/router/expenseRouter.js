"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseController_1 = require("../controller/expenseController");
const authendicate_1 = require("../middleware/authendicate");
const router = (0, express_1.Router)();
router.get("/getallexpense", authendicate_1.authenticateToken, expenseController_1.getExpenseWithoutPagination);
router.post("/addexpense", authendicate_1.authenticateToken, expenseController_1.addExpense);
router.get("/getexpense", authendicate_1.authenticateToken, expenseController_1.getExpense);
router.patch("/updateexpense/:id/", authendicate_1.authenticateToken, expenseController_1.updateExpense);
router.delete("/deleteexpense/:id/", authendicate_1.authenticateToken, expenseController_1.deleteExpense);
exports.default = router;
//# sourceMappingURL=expenseRouter.js.map