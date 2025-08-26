const express = require("express");
const router = express.Router();
const expenseController = require("../controller/CategoriesController");

router.post("/", expenseController.addExpense);
router.get("/", expenseController.getExpensesByUser); 
router.delete("/category", expenseController.removeCategory);
router.delete("/all", expenseController.clearExpenses);

module.exports = router;