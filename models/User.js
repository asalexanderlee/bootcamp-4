const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, maxlength: 1000 },
  lastName: { type: String, maxlength: 1000 },
  token: { type: String, maxlength: 1000 }
});

module.exports = mongoose.model("User", UserSchema);
