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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoommate = exports.updateRoommates = exports.getRoommates = exports.getRoommatesWithoutPagination = exports.addRoommates = void 0;
const roomMatesModel_1 = require("../model/roomMatesModel");
const addRoommates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        if (!name) {
            res.status(400).json({ name: "This field is required" });
        }
        const new_expense = new roomMatesModel_1.RoomMates({ name });
        yield new_expense.save();
        res
            .status(201)
            .json({ data: new_expense, success: "New data added successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't posted" });
    }
});
exports.addRoommates = addRoommates;
const getRoommatesWithoutPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all_roommates = yield roomMatesModel_1.RoomMates.find();
        res.status(200).json({
            results: all_roommates,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't get" });
    }
});
exports.getRoommatesWithoutPagination = getRoommatesWithoutPagination;
// *************************with pagination ***************
const getRoommates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Validate query parameters (page and limit)
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 5) || 5;
        // 2. Calculate skip value (offset for pagination)
        const skip = (page - 1) * limit;
        // 3. Fetch paginated results for the current page (assuming Mongoose schema)
        const [paginatedExpenses, total] = yield Promise.all([
            roomMatesModel_1.RoomMates.find({}, null, { skip, limit }), // Assuming you have a Mongoose schema named RoomMates
            roomMatesModel_1.RoomMates.countDocuments({}), // Assuming you have a Mongoose schema named RoomMates
        ]);
        // 4. Send the paginated results with additional information
        res.status(200).json({
            results: paginatedExpenses,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Data retrieval failed" });
    }
});
exports.getRoommates = getRoommates;
const updateRoommates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Find the document by ID and update it with the provided data
        const updatedExpense = yield roomMatesModel_1.RoomMates.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedExpense) {
            return res.status(404).json({ message: "Roommate not found" });
        }
        // Send the updated document as the response
        res.status(200).json({
            data: updatedExpense,
            success: "Roommate name updated succesfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Data didn't update" });
    }
});
exports.updateRoommates = updateRoommates;
const deleteRoommate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const delete_expense = yield roomMatesModel_1.RoomMates.findByIdAndDelete(id);
        if (!delete_expense) {
            return res.status(404).json({ message: "Room mate not found" });
        }
        res.status(200).json({ success: "Room mate deleted succesfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't delete" });
    }
});
exports.deleteRoommate = deleteRoommate;
