"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    is_expense: { type: Boolean },
    category: {
        type: String,
        required: true,
    },
});
exports.Expense = (0, mongoose_1.model)("expense", expenseSchema);
//# sourceMappingURL=expenseModal.js.map