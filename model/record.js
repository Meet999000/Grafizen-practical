const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    Sales: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],
    Purchase: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],
    Expend: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],
  },
  {
    autoCreate: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("record", recordSchema);
