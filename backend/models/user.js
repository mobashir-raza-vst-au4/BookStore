const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  points: { type: Number, default: 100 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
