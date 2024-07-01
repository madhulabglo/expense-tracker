"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authendicate_1 = require("../middleware/authendicate");
const roommatesController_1 = require("../controller/roommatesController");
const router = (0, express_1.Router)();
router.post("/addroommate", authendicate_1.authenticateToken, roommatesController_1.addRoommates);
router.get("/getallroommate", authendicate_1.authenticateToken, roommatesController_1.getRoommatesWithoutPagination);
router.get("/getroommate", authendicate_1.authenticateToken, roommatesController_1.getRoommates);
router.patch("/updateroommate/:id/", authendicate_1.authenticateToken, roommatesController_1.updateRoommates);
router.delete("/deleteroommate/:id/", authendicate_1.authenticateToken, roommatesController_1.deleteRoommate);
exports.default = router;
//# sourceMappingURL=roommateRouter.js.map