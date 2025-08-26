const Expense = require("../models/Categories");

exports.addExpense = async (req, res) => {
  try {
    const { userEmail, text, category, amount } = req.body;
    if (!userEmail || !text || !category || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = new Expense({ userEmail, text, category, amount });
    await expense.save();

    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExpensesByUser = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });
    const expenses = await Expense.find({ userEmail: email });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", error: err.message });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const { email, category } = req.body;
    if (!email || !category) {
      return res.status(400).json({ message: "Email and category are required" });
    }
    const result = await Expense.deleteMany({ userEmail: email, category });
    res.status(200).json({ message: `Removed ${result.deletedCount} ${category} expenses` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing category", error: err.message });
  }
};

exports.clearExpenses = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const result = await Expense.deleteMany({ userEmail: email });
    res.status(200).json({ message: `All ${result.deletedCount} expenses cleared for ${email}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error clearing expenses", error: err.message });
  }
};