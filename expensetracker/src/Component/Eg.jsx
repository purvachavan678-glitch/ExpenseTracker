import { useState, useEffect } from "react";
import "./Expense.css";
import Home from "./Navbar/Home";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Expenses = () => {
  const [categories] = useState(["Food", "Shopping", "Travels"]);
  const [user, setUser] = useState(null);
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
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    setUser(loggedInUser);

    const saved = localStorage.getItem(`newExpense_${loggedInUser.email}`);
    if (saved) {
      try {
        setExpensesByCategory(JSON.parse(saved));
      } catch {
        setExpensesByCategory({
          Food: [],
          Shopping: [],
          Travels: [],
        });
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `newExpense_${user.email}`,
        JSON.stringify(expensesByCategory)
      );
    }
  }, [expensesByCategory, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !formData.types || !formData.amount || !formData.text) return;

    try {
      const res = await axios.post("http://localhost:5000/api/cat", {
        userEmail: user.email || user,
        text: formData.text,
        category: formData.types,
        amount: formData.amount,
      });

      setMessage(res.data.message);
      console.log("Transaction successful", res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Transaction failed");
      console.error("Transaction error", err);
    }

    const newExpense = {
      text: formData.text,
      amount: Number(formData.amount),
      date: new Date().toLocaleString(),
    };

    const updatedExpenses = {
      ...expensesByCategory,
      [formData.types]: [...expensesByCategory[formData.types], newExpense],
    };

    setExpensesByCategory(updatedExpenses);
    setFormData({ text: "", types: "", amount: "" });
  };

  const handleRemoveCategory = (category) => {
    const updatedExpenses = {
      ...expensesByCategory,
      [category]: [],
    };
    setExpensesByCategory(updatedExpenses);
  };

  const handleRemoveHistory = () => {
    if (user) {
      setExpensesByCategory({
        Food: [],
        Shopping: [],
        Travels: [],
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <>
      <Home />
      {user && <h2>Welcome {user.name || user}</h2>}

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
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
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

//export default Expenses;

//login part

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./L&S.css";
import Home from "./Navbar/Home";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ email: formData.email, name: formData.name })
    );

    localStorage.setItem(`user_${formData.name}`, JSON.stringify(formData));
    navigate("/expense");
  };

  return (
    <>
      <Home />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;

