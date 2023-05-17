const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    token: { type: String },
  },
  {
    autoCreate: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
