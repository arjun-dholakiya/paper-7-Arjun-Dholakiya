const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const authMiddleware = require("../../../middleware/authMiddleware");

router.post("/signup",authControllers.signup);
router.post("/login",authControllers.login);
router.post("/logout",authMiddleware,authControllers.logout);

module.exports = router;