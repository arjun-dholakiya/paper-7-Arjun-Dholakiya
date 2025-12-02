const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: function () {
        return this.login_type === "normal";
      },
      unique: true,
      lowercase: true,
      // Optional: basic format check
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: function () {
        return this.login_type === "normal";
      },
    },

    login_type: {
      type: String,
      enum: ["normal", "social"],
      default: "normal",
    },

    login_status: { type: Boolean, default: false },

    social_provider: {
      type: String,
      enum: ["google", "apple", "facebook", null],
      default: null,
    },

    social_id: { type: String, default: null },

    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    recent_searches: [{
        query: { type: String },
        searchedAt: { type: Date, default: Date.now }
      }]
  },
  { timestamps: true }
);

// Make email unique only when it's present (string)
userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $type: "string" } } }
);

module.exports = mongoose.model("User", userSchema);