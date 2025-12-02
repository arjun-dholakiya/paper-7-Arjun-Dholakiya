const mongoose = require("mongoose");

const recentSearchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  query: String
}, { timestamps: true });

module.exports = mongoose.model("RecentSearch", recentSearchSchema);
