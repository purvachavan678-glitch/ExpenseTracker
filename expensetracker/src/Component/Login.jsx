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