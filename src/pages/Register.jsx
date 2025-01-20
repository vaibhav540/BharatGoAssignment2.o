import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
      setError("User already exists with this email.");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  const inputStyle = {
    padding: "10px 15px",
    margin: "5px 0",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="name" style={labelStyle}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="email" style={labelStyle}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="password" style={labelStyle}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={inputStyle}
                  required
                />
              </div>
              {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}
              <div style={{ marginBottom: "15px" }}>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "underline", color: "#17a2b8" }}>
                    Login
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#343a40",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
