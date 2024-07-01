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
exports.deleteExpense = exports.updateExpense = exports.getExpense = exports.getExpenseWithoutPagination = exports.addExpense = void 0;
const expenseModal_1 = require("../model/expenseModal");
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, description, amount, is_expense, category } = req.body;
    try {
        if (!date || !description || !amount || !category) {
            res.status(400).json({ message: "This field is required" });
        }
        const new_expense = new expenseModal_1.Expense({
            date,
            description,
            amount,
            is_expense,
            category,
        });
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
exports.addExpense = addExpense;
// ****************** without pagination *****************
const getExpenseWithoutPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all_expense = yield expenseModal_1.Expense.find();
        if (all_expense.length > 0) {
            const income = all_expense.filter((expense) => !expense.is_expense);
            const expenses = all_expense.filter((expense) => expense.is_expense);
            // Calculate total income and total expenses
            const totalIncome = income.reduce((acc, expense) => acc + expense.amount, 0);
            const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
            // Calculate available balance
            const availableBalance = totalIncome - totalExpenses;
            res.status(200).json({
                results: all_expense,
                totalIncome,
                totalExpenses,
                availableBalance,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't get" });
    }
});
exports.getExpenseWithoutPagination = getExpenseWithoutPagination;
// *************************with pagination ***************
const getExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get page and limit from query parameters, with default values
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 5) || 5;
        const fromdate = req.query.fromdate;
        const todate = req.query.todate;
        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;
        let dateFilter = {};
        // Construct date filter based on provided query parameters
        if (fromdate) {
            dateFilter.date = Object.assign(Object.assign({}, dateFilter.date), { $gte: new Date(fromdate) });
        }
        if (todate) {
            dateFilter.date = Object.assign(Object.assign({}, dateFilter.date), { $lte: new Date(todate) });
        }
        // Fetch all expenses within the date range
        const allExpenses = yield expenseModal_1.Expense.find(dateFilter);
        // Separate income and expenses
        const income = allExpenses.filter((expense) => !expense.is_expense);
        const expenses = allExpenses.filter((expense) => expense.is_expense);
        // Calculate total income and total expenses
        const totalIncome = income.reduce((acc, expense) => acc + expense.amount, 0);
        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        // Calculate available balance
        const availableBalance = totalIncome - totalExpenses;
        // Fetch paginated results for the current page
        const paginatedExpenses = yield expenseModal_1.Expense.find(dateFilter)
            .skip(skip)
            .limit(limit);
        // Fetch total count for pagination purposes
        const total = yield expenseModal_1.Expense.countDocuments(dateFilter);
        // Send the paginated results along with pagination info and totals
        res.status(200).json({
            results: paginatedExpenses,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            totalIncome,
            totalExpenses,
            availableBalance,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Data retrieval failed" });
    }
});
exports.getExpense = getExpense;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Find the document by ID and update it with the provided data
        const updatedExpense = yield expenseModal_1.Expense.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        // Send the updated document as the response
        res
            .status(200)
            .json({ data: updatedExpense, success: "Expense updated succesfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Data didn't update" });
    }
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const delete_expense = yield expenseModal_1.Expense.findByIdAndDelete(id);
        if (!delete_expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ success: "Expense deleted succesfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't delete" });
    }
});
exports.deleteExpense = deleteExpense;
