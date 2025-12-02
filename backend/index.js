require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const authRoutes = require("./modules/auth/routes/authRoutes");
const categoryRoutes = require("./modules/category/routes/categoryRoutes");
const recipeRoutes = require("./modules/recipe/routes/recipeRoutes");
const favoriteRoutes = require("./modules/favorites/routes/favoriteRoutes");
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/recipe",recipeRoutes);
app.use("/api/v1/favorite",favoriteRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected")
      const PORT = process.env.PORT || 3000;
      app.listen(PORT,() => {
        console.log(`Server Running On Port ${PORT}`)
      })})
      .catch((err) => {
        console.log("Connection Failed"+err)
      })