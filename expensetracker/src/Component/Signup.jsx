import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import Home from "./Navbar/Home";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/Signup", {
        name,
        email,
        password,
      });

      setMessage(res.data.message);
      console.log("Signup successful:", res.data);

      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      console.error("Signup error:", error);
    }
  };

  return (
    <>
    <Home/>
    <div className="d-flex justify-content-center align-items-center bg-secondary min-vh-100">
      <div className="bg-white p-4 rounded w-100" style={{ maxWidth: "400px" }}>
        <h2>Register</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
          <p className="mt-2">Already have an account?</p>
          <Link to="/login" className="btn btn-light w-100 rounded-0">
            Login
          </Link>
        </form>
      </div>
    </div>
    </>
  );
}

export default Signup;
