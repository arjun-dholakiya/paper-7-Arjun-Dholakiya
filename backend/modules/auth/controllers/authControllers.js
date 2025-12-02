const authServices = require("../services/authServices");
const blacklist = require("../../../utils/tokenBlacklist");

// Signup
exports.signup = async (req, res) => {
  try {
    const { user } = await authServices.signup(req.body);
    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { user, token } = await authServices.login(req.body);
    res.status(200).json({
      message: "User Login Successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    req.user.login_status = false;
    await req.user.save();

    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      await blacklist.add(token);
    }

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed: " + error.message });
  }
};