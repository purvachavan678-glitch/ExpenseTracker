import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FinancialReports.css";
import Home from "./Navbar/Home";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FinancialReports() {
  const [chartData, setChartData] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || !loggedInUser.email) {
      navigate("/login");
      return;
    }
    setUser(loggedInUser);

    const fetchExpenses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/expenses?email=${loggedInUser.email}`
        );
        const categories = ["Food", "Shopping", "Travels"];
        const byCategory = { Food: [], Shopping: [], Travels: [] };
        res.data.forEach((exp) => {
          if (byCategory[exp.category]) {
            byCategory[exp.category].push(exp);
          }
        });
        const formatted = categories.map((category) => {
          const totalAmount = byCategory[category].reduce(
            (sum, entry) => sum + Number(entry.amount || 0),
            0
          );
          return { category, amount: totalAmount };
        });
        setChartData(formatted);
      } catch (err) {
        setChartData([]);
      }
    };

    fetchExpenses();
  }, [navigate]);

  return (
    <>
      <Home />

      <div className="chart-header">
        <h2 className="chart-title">
          {user ? `${user.name || user.email}'s Financial Reports` : "Transaction Reports"}
        </h2>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="80%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis
              label={{
                value: "Amount",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <br />
      </div>
    </>
  );
}