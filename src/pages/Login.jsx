import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setUser(foundUser);
      alert("Login successfully! Let's explore products.");
      navigate("/product");
    } else {
      setError("Invalid email or password");
    }
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

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            {!user ? (
              <form onSubmit={handleLogin}>
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
                    New here?{" "}
                    <Link to="/register" style={{ textDecoration: "underline", color: "#17a2b8" }}>
                      Register
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
                  Login
                </button>
              </form>
            ) : (
              <div>
                <h3>Welcome, {user.name}</h3>
                <button
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    setUser(null);
                  }}
                  style={{
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
