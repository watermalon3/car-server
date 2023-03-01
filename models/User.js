const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      // Validators
      type: String,
      max: 100,
      required: true,
      validate: /[a-z]/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: string,
      required: true,
    },
  },
  //   creates createdAT and updatedAt timestamp
  { timestamps: true }
);

//  Generate a collection by creating a MODEL

module.exports = mongoose.model("user", User);
