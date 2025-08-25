const express = require("express");
const router = express.Router();
const expenseController = require("../controller/CategoriesController");


router.post("/", expenseController.addExpense);
router.get("/:name", expenseController.getExpensesByUser);
router.delete("/:name/:category", expenseController.removeCategory);
router.delete("/:name", expenseController.clearExpenses);

module.exports = router;
