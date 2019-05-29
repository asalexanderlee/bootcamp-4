const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  description: { type: String, maxlength: 500 },
  createdOn: Date,
  completedOn: Date
});

module.exports = mongoose.model("Todo", TodoSchema);
