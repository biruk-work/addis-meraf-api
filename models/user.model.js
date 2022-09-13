const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    account_holder_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    round: {
      type: Number,
      default: 1,
    },
    token: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "need-to-invite",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
