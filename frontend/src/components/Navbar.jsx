// src/components/Navbar.jsx
import React from "react";
import { Container, Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logoutService } from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = async () => {
    try {
      await logoutService();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <BootstrapNavbar bg="danger" expand="lg" className="shadow-sm" variant="dark">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          🍳 Recipe Finder
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.token && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
                <Nav.Link as={Link} to="/add-recipe">
                  <Button variant="warning" size="sm" className="fw-bold">
                    + Add Recipe
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user.token ? (
              <>
                <BootstrapNavbar.Text className="me-3 text-white">
                  Welcome, <strong className="text">{user.name}</strong>
                </BootstrapNavbar.Text>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                  size="sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="text-white">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;