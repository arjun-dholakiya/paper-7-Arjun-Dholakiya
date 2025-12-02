import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import AddRecipe from "./pages/AddReceipe";

// Dashboard/Home pages (you can create these later)
const Home = () => (
  <div className="container py-5 text-center">
    <h1 className="text-danger mb-4">🍽️ Welcome to Recipe Finder!</h1>
    <p className="lead">Discover, share, and create amazing recipes</p>
    <div className="mt-5">
      <a href="/recipes" className="btn btn-danger btn-lg me-3">Browse Recipes</a>
      <a href="/add-recipe" className="btn btn-outline-danger btn-lg">Add Recipe</a>
    </div>
  </div>
);
const Dashboard = () => (
  <div className="container py-5">
    <h1 className="text-danger">Dashboard</h1>
    <p>Your recipe statistics and activity will appear here.</p>
  </div>
);
const Profile = () => (
  <div className="container py-5">
    <h1 className="text-danger">Profile</h1>
    <p>Your profile information will appear here.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/add-recipe" element={
          <ProtectedRoute>
            <AddRecipe />
          </ProtectedRoute>
        } />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;