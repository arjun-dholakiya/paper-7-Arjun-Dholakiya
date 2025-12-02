import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("normal");
  const [data, setData] = useState({
    email: "",
    password: "",
    social_provider: "",
    social_id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token) {
      setIsLoggedIn(true);
      setUserName(user.name || "User");
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setData({
      email: "",
      password: "",
      social_provider: "",
      social_id: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { ...data, login_type: type };

    try {
      const response = await loginService(payload);
      
      // Save data properly
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({
        name: response.data.user?.name || data.name || "User",
        email: response.data.user?.email,
        token: response.data.token
      }));
      
      setIsLoggedIn(true);
      setUserName(response.data.user?.name || data.name || "User");
      alert("Login Successful!");
      
      // Redirect to home
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserName("");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  // If user is already logged in
  if (isLoggedIn) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card style={{ width: "30rem" }} className="p-4 shadow text-center">
          <h3 className="text-primary mb-3">Welcome back, {userName}!</h3>
          <p className="mb-4">You are already logged in.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Button 
              variant="primary" 
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
            <Button 
              variant="outline-danger" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "30rem" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Login</h3>

        {/* Toggle Buttons */}
        <div className="d-flex gap-2 mb-3">
          <Button
            variant={type === "normal" ? "primary" : "secondary"}
            onClick={() => handleTypeChange("normal")}
            className="w-50"
          >
            Normal Login
          </Button>
          <Button
            variant={type === "social" ? "primary" : "secondary"}
            onClick={() => handleTypeChange("social")}
            className="w-50"
          >
            Social Login
          </Button>
        </div>

        <Form onSubmit={handleLogin}>
          {type === "normal" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  name="email" 
                  type="email"
                  value={data.email} 
                  onChange={handleChange} 
                  placeholder="Enter Email" 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password" 
                  value={data.password} 
                  onChange={handleChange} 
                  placeholder="Enter Password" 
                  required 
                />
              </Form.Group>
            </>
          )}

          {type === "social" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Social Provider</Form.Label>
                <Form.Select 
                  name="social_provider" 
                  value={data.social_provider} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Provider</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="apple">Apple</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Social ID</Form.Label>
                <Form.Control 
                  name="social_id" 
                  value={data.social_id} 
                  onChange={handleChange} 
                  placeholder="Enter Social ID" 
                  required 
                />
              </Form.Group>
            </>
          )}

          <Button type="submit" variant="primary" className="w-100 mt-2">
            Login
          </Button>
        </Form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;