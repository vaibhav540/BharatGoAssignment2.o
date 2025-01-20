import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarComponent = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Inline styles
  const navItemStyle = {
    fontSize: "18px", // Increase font size
    color: "black", // Default inactive color
    textDecoration: "none", // No underline for inactive links
    margin: "0 10px", // Add spacing
    transition: "color 0.3s, textDecoration 0.3s", // Smooth transition for styles
  };

  const activeNavItemStyle = {
    color: "#ffa500", // Orange color for active link
    textDecoration: "underline", // Underline for active link
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          <img
            style={{ width: "100%", height: "80px" }}
            src="/assets/shop-logo-removebg-preview.png"
            alt=""
          />
        </NavLink>
        <Navbar.Toggle aria-controls="navbarMenu" />
        <Navbar.Collapse id="navbarMenu">
          <Nav className="m-auto text-center">
            <Nav.Link
              as={NavLink}
              to="/"
              style={({ isActive }) =>
                isActive ? { ...navItemStyle, ...activeNavItemStyle } : navItemStyle
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/product"
              style={({ isActive }) =>
                isActive ? { ...navItemStyle, ...activeNavItemStyle } : navItemStyle
              }
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              style={({ isActive }) =>
                isActive ? { ...navItemStyle, ...activeNavItemStyle } : navItemStyle
              }
            >
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              style={({ isActive }) =>
                isActive ? { ...navItemStyle, ...activeNavItemStyle } : navItemStyle
              }
            >
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center justify-content-center">
            {!currentUser ? (
              <>
                <NavLink to="/login" className="btn btn-outline-dark me-2">
                  <i className="fa fa-sign-in-alt me-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark me-2">
                  <i className="fa fa-user-plus me-1"></i> Register
                </NavLink>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                    fontSize: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  title="Click to update profile"
                  onClick={() => (window.location.href = "/update-profile")}
                >
                  {currentUser.name[0].toUpperCase()}
                </div>
                <NavLink
                  to="/login"
                  className="btn btn-outline-dark ms-2"
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </NavLink>
              </div>
            )}
            <NavLink to="/cart" className="btn btn-outline-dark ms-2">
              <i className="fa fa-cart-shopping me-1"></i> Cart ({cartItems.length})
            </NavLink>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
