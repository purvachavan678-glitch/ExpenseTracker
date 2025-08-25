const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  text: { type: String, required: true },
  type:{type:String,require:true},
  amount: { type: Number, required: true },
    category: { type: String, enum: ["Food", "Shopping", "Travels"], required: true },

  date: { type: String, default: () => new Date().toLocaleString() },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
