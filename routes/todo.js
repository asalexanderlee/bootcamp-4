const router = require("express").Router();
const mongoose = require("mongoose");
const Todo = mongoose.model("Todo");

//get all todos
router.get("/", (req, res) => {
  Todo.find({})
    .then(todos => res.send(todos))
    .catch(err => console.log(err));
});
//get completed todos
router.get("/complete", (req, res) => {
  Todo.find({ completedOn: { $ne: null } })
    .then(todos => res.send(todos))
    .catch(err => console.log(err));
});
//get incomplete todos
router.get("/incomplete", (req, res) => {
  Todo.find({ completedOn: null })
    .then(todos => res.send(todos))
    .catch(err => console.log(err));
});
//get a todo by id
router.get("/:_id", (req, res) => {
  Todo.find({ _id: mongoose.Types.ObjectId(req.params._id) })
    .then(todo => res.send(todo))
    .catch(err => console.log(err));
});
//add todo
router.post("/", (req, res) => {
  const todo = new Todo({ description: req.body.text, createdOn: new Date(), completedOn: null });
  todo.save((err, doc) => {
    if (err) console.error(err);
    res.send("Successfully added todo");
  });
});
//delete todo by id
router.delete("/:_id", (req, res) => {
  console.log("testing");
  Todo.deleteOne({ _id: mongoose.Types.ObjectId(req.params._id) })
    .then(() => res.send("Successfully deleted todo"))
    .catch(err => console.log(err));
});
//mark todo as complete by id
router.post("/:_id/complete", (req, res) => {
  Todo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id) }, { $set: { completedOn: new Date() } })
    .then(() => res.send("Marked todo as complete"))
    .catch(err => console.log(err));
});
//update text of todo by id
router.post("/:_id/:text", (req, res) => {
  Todo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id) }, { $set: { description: req.params.text } })
    .then(() => res.send("Updated todo description"))
    .catch(err => console.log(err));
});

module.exports = router;
