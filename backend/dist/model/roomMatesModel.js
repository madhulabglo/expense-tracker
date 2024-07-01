"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMates = void 0;
const mongoose_1 = require("mongoose");
const RoomMateSchema = new mongoose_1.Schema({
    name: { type: String, required: true }
});
exports.RoomMates = (0, mongoose_1.model)("roommates", RoomMateSchema);
