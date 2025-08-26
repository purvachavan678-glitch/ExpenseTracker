import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <>
      <nav className="navbar">
        <h2 className="logo">Expense Tracker</h2>
        <div className="nav-links">
          <Link to="/expense" className="nav-link">Expense</Link>
          <Link to="/financialReports" className="nav-link">FinancialReports</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Signup</Link>

        </div>
      </nav>
      


    </>
  );
}; 

export default Home;
