"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyExpenseData = void 0;
const mongoose_1 = require("mongoose");
const amountArraySchema = new mongoose_1.Schema({
    name: { type: String },
    amount: { type: String },
});
const onlyExpenseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: String, required: true },
    amount_details: { type: [amountArraySchema] },
});
exports.onlyExpenseData = (0, mongoose_1.model)("OnlyExpense", onlyExpenseSchema);
