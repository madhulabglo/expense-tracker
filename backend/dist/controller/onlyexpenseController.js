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
exports.onlyExpenseDelete = exports.onlyExpenseUpdate = exports.specifiPersonCalculation = exports.onlyExpenselistWithPagination = exports.onlyexpenselistWithoutPagination = exports.addonlyexpense = void 0;
const onlyexpenseModel_1 = require("../model/onlyexpenseModel");
const roomMatesModel_1 = require("../model/roomMatesModel");
const addonlyexpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date, description, amount, amount_details } = req.body;
    try {
        if (!name || !date || !description || !amount) {
            return res.status(400).json({ message: "This fields are required" });
        }
        const new_expense = new onlyexpenseModel_1.onlyExpenseData({
            name,
            date,
            description,
            amount,
            amount_details,
        });
        yield new_expense.save();
        res.status(201).json({
            data: new_expense,
            success: "The new Expense created successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't posted" });
    }
});
exports.addonlyexpense = addonlyexpense;
const onlyexpenselistWithoutPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all_expense_list = yield onlyexpenseModel_1.onlyExpenseData.find();
        if (all_expense_list.length > 0) {
            const total_expense = all_expense_list.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
            res.status(200).json({
                results: all_expense_list,
                total_expense,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't get" });
    }
});
exports.onlyexpenselistWithoutPagination = onlyexpenselistWithoutPagination;
const onlyExpenselistWithPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 5) || 5;
        const fromdate = req.query.fromdate;
        const todate = req.query.todate;
        const search = req.query.search;
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
        // Log the constructed date filter for debugging
        // Fetch all expenses within the date range
        const allExpenses = yield onlyexpenseModel_1.onlyExpenseData.find(dateFilter);
        // Calculate total income and total expenses
        const totalExpenses = allExpenses.reduce((acc, expense) => acc + parseInt(expense.amount), 0);
        // Fetch paginated results for the current page
        const paginatedExpenses = yield onlyexpenseModel_1.onlyExpenseData
            .find(dateFilter)
            .skip(skip)
            .limit(limit);
        // Fetch total count for pagination purposes
        const total = yield onlyexpenseModel_1.onlyExpenseData.countDocuments(dateFilter);
        // Send the paginated results along with pagination info and totals
        res.status(200).json({
            results: paginatedExpenses,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            totalExpenses,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't get" });
    }
});
exports.onlyExpenselistWithPagination = onlyExpenselistWithPagination;
const specifiPersonCalculation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const fromdate = req.query.fromdate;
        const todate = req.query.todate;
        const name = req.query.name;
        const split = req.query.split;
        let dateFilter = {};
        // Construct date filter based on provided query parameters
        if (fromdate) {
            dateFilter.date = Object.assign(Object.assign({}, dateFilter.date), { $gte: new Date(fromdate) });
        }
        if (todate) {
            dateFilter.date = Object.assign(Object.assign({}, dateFilter.date), { $lte: new Date(todate) });
        }
        const filter = name !== "" ? Object.assign(Object.assign({}, dateFilter), { name: name }) : dateFilter;
        const get_room_mates = yield roomMatesModel_1.RoomMates.find();
        const room = get_room_mates === null || get_room_mates === void 0 ? void 0 : get_room_mates.map((ele) => ele === null || ele === void 0 ? void 0 : ele.name);
        // Fetch all expenses within the date range
        const specific_date = yield onlyexpenseModel_1.onlyExpenseData.find(filter);
        const get_roommates_expense_amount = (_a = specific_date === null || specific_date === void 0 ? void 0 : specific_date.filter((el) => { var _a; return ((_a = el === null || el === void 0 ? void 0 : el.amount_details) === null || _a === void 0 ? void 0 : _a.length) > 0; })) === null || _a === void 0 ? void 0 : _a.map((ele) => ele === null || ele === void 0 ? void 0 : ele.amount_details).flat();
        const get_own_expense_amount = (_b = specific_date === null || specific_date === void 0 ? void 0 : specific_date.filter((el) => (el === null || el === void 0 ? void 0 : el.amount_details.length) === 0)) === null || _b === void 0 ? void 0 : _b.reduce((acc, el) => acc + parseFloat(el === null || el === void 0 ? void 0 : el.amount), 0);
        const spliting_amount = name && split ? get_own_expense_amount / parseInt(split) : 0;
        const totals = room.reduce((acc, person) => {
            acc[person] = get_roommates_expense_amount
                .filter((obj) => obj.name === person)
                .reduce((sum, obj) => sum + parseFloat(obj.amount), 0);
            return acc;
        }, {});
        const non_person_totals = room.reduce((acc, person) => {
            // Check if the current person is the same as the passed name
            if (person !== name && totals[person] !== 0) {
                // If not, calculate the total expense for this person
                const personTotal = get_roommates_expense_amount
                    .filter((obj) => obj.name !== name) // Exclude expenses for the passed name
                    .reduce((sum, obj) => sum + parseFloat(obj.amount), 0); // Calculate sum
                // Add the total expense for this person to the accumulator
                acc[person] = personTotal;
            }
            return acc;
        }, {});
        res.status(200).json({
            results: specific_date,
            total_expense_amount: specific_date.reduce((acc, expense) => acc + parseInt(expense.amount), 0),
            person_expense_total: get_roommates_expense_amount.reduce((acc, expense) => acc + parseInt(expense.amount), 0),
            person_own_expense: [totals],
            other_person_expense: [non_person_totals],
            buy_expense_amount: get_own_expense_amount,
            person_spliting_amount: spliting_amount,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "data doesn't get" });
    }
});
exports.specifiPersonCalculation = specifiPersonCalculation;
const onlyExpenseUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Find the document by ID and update it with the provided data
        const updatedExpense = yield onlyexpenseModel_1.onlyExpenseData.findByIdAndUpdate(id, req.body, {
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
exports.onlyExpenseUpdate = onlyExpenseUpdate;
const onlyExpenseDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const delete_expense = yield onlyexpenseModel_1.onlyExpenseData.findByIdAndDelete(id);
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
exports.onlyExpenseDelete = onlyExpenseDelete;
