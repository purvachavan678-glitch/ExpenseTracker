import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FinancialReports.css";
import Home from "./Navbar/Home";

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
    if (!loggedInUser) {
      navigate("/login");
      return;
    }
    setUser(loggedInUser);

    const saved = localStorage.getItem(`newExpense_${loggedInUser.email}`);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      const formatted = Object.keys(parsed).map((category) => {
        const totalAmount = parsed[category].reduce(
          (sum, entry) => sum + Number(entry.amount || 0),
          0
        );
        return { category, amount: totalAmount };
      });

      setChartData(formatted);
    } catch (err) {
      console.error("Error parsing expense data", err);
    }
  }, [navigate]);

 

  return (
    <>
      <Home />

      <div className="chart-header">
        <h2 className="chart-title">
          {user ? `${user}'s Financial Reports` : "Transaction Reports"}
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
