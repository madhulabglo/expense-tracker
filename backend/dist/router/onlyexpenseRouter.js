"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authendicate_1 = require("../middleware/authendicate");
const onlyexpenseController_1 = require("../controller/onlyexpenseController");
const router = (0, express_1.Router)();
router.post("/onlyexpense", authendicate_1.authenticateToken, onlyexpenseController_1.addonlyexpense);
router.get("/onlyallexpense", authendicate_1.authenticateToken, onlyexpenseController_1.onlyexpenselistWithoutPagination);
router.get("/onlyexpense", authendicate_1.authenticateToken, onlyexpenseController_1.onlyExpenselistWithPagination);
router.patch("/onlyexpense/:id/", authendicate_1.authenticateToken, onlyexpenseController_1.onlyExpenseUpdate);
router.delete("/onlyexpense/:id/", authendicate_1.authenticateToken, onlyexpenseController_1.onlyExpenseDelete);
router.get("/specificcalculation", authendicate_1.authenticateToken, onlyexpenseController_1.specifiPersonCalculation);
exports.default = router;
//# sourceMappingURL=onlyexpenseRouter.js.map