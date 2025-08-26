import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import "./Expense.css";
import Home from "./Navbar/Home";
import CategoryCard from "./CategoryCard";
import axios from "axios";

const Expenses = () => {
  const { user } = useUser();
  const [categories] = useState(["Food", "Shopping", "Travels"]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    text: "",
    types: "",
    amount: "",
  });

  const [expensesByCategory, setExpensesByCategory] = useState({
    Food: [],
    Shopping: [],
    Travels: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login");
      return;
    }
    fetchExpenses(user.email);
  }, [user, navigate]);

  const fetchExpenses = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/expenses?email=${email}`
      );
      const byCategory = { Food: [], Shopping: [], Travels: [] };
      res.data.forEach((exp) => {
        if (byCategory[exp.category]) {
          byCategory[exp.category].push(exp);
        }
      });
      setExpensesByCategory(byCategory);
    } catch {
      setExpensesByCategory({
        Food: [],
        Shopping: [],
        Travels: [],
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.types || !formData.amount || !formData.text) return;

    try {
      const res = await axios.post("http://localhost:5000/api/cat", {
        userEmail: user.email,
        text: formData.text,
        category: formData.types,
        amount: formData.amount,
      });

      setMessage(res.data.message);

      fetchExpenses(user.email);
      setFormData({ text: "", types: "", amount: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Transaction failed");
      console.error("Transaction error", err);
    }
  };

  const handleRemoveCategory = async (category) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/expenses/category`,
        {
          data: { email: user.email, category }
        }
      );
      fetchExpenses(user.email);
    } catch {
      setMessage("Failed to remove category expenses");
    }
  };

  const handleRemoveHistory = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/expenses/all`,
        {
          data: { email: user.email }
        }
      );
      fetchExpenses(user.email);
    } catch {
      setMessage("Failed to remove all expenses");
    }
  };

 

  return (
    <>
      <Home />
      {user && <h2>Welcome {user.name || user.email}</h2>}

      {user ? (
        <>
          <form onSubmit={handleSubmit}>
            <h1>Daily Transactions</h1>

            <label>
              Text
              <input
                type="text"
                name="text"
                placeholder="Enter Text"
                value={formData.text}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              Category
              <select name="types" value={formData.types} onChange={handleChange}>
                <option value="">Select Category</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <br />

            <label>
              Amount
              <input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </label>
            <br />

            <button type="submit">Add Transaction</button>
            <br />
            <br />
            <button type="button" onClick={handleRemoveHistory}>
              Remove History
            </button>
            <br />
            <br />
            
            <br />
            {message && <p>{message}</p>}
          </form>

          <CategoryCard
            user={user}
            expensesByCategory={expensesByCategory}
            onRemoveCategory={handleRemoveCategory}
          />
        </>
      ) : (
        <p>Please login to manage expenses.</p>
      )}
    </>
  );
};

export default Expenses;