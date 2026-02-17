const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "userName",
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "El dato proporcionado no es un email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
