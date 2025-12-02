import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutService } from "../services/authService";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutService();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Always clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Redirect to login page
        navigate("/login", { replace: true });
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <h4 className="mt-3">Logging out...</h4>
      </div>
    </Container>
  );
};

export default Logout;