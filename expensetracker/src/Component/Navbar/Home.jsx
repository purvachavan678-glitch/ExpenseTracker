import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; 
import "./Home.css";

const Home = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/expense"); 
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Expense Tracker</h2>
      <div className="nav-links">
        <Link to="/expense" className="nav-link">Expense</Link>
        <Link to="/financialReports" className="nav-link">Financial Reports</Link>
        <Link to ="/signup" className="nav-link">Signup</Link>

        {user ? (
          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Home;
