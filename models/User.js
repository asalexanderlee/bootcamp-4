const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, maxlength: 1000 },
  password: { type: String, maxlength: 1000 },
  email: { type: String, maxlength: 1000 },
  guid: { type: String, maxlength: 1000 }
});

module.exports = mongoose.model("User", UserSchema);
