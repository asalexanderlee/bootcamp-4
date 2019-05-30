const router = require("express").Router();
const Todo = require("mongoose").model("Todo");
const mongoose = require("mongoose");
const isAuthenticated = require("./auth");

//get all todos
router.get("/", (req, res) => {
  isAuthenticated(req.body.token).then(canAccess => {
    if (canAccess) {
      Todo.find({})
        .then(todos => res.send(todos))
        .catch(err => console.log(err));
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});
//get completed todos
router.get("/complete", (req, res) => {
  isAuthenticated(req.body.token).then(canAccess => {
    if (canAccess) {
      Todo.find({ completedOn: { $ne: null } })
        .then(todos => res.send(todos))
        .catch(err => console.log(err));
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});
//get incomplete todos
router.get("/incomplete", (req, res) => {
  isAuthenticated(req.body.token).then(canAccess => {
    if (canAccess) {
      Todo.find({ completedOn: null })
        .then(todos => res.send(todos))
        .catch(err => console.log(err));
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});
//get a todo by id
router.get("/:_id", (req, res) => {
  isAuthenticated(req.body.token).then(canAccess => {
    if (canAccess) {
      Todo.find({ _id: mongoose.Types.ObjectId(req.params._id) })
        .then(todo => res.send(todo))
        .catch(err => console.log(err));
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});
//add todo
router.post("/", (req, res) => {
  isAuthenticated(req.body.token).then(userId => {
    if (userId) {
      //get userId back from isAuthenticated function and assign to todo
      const todo = new Todo({ description: req.body.text, createdOn: new Date(), completedOn: null, userId: userId });
      todo.save((err, doc) => {
        if (err) console.error(err);
        res.send("Successfully added todo");
      });
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});
//update text of todo by id
router.post("/:_id", (req, res) => {
  isAuthenticated(req.body.token).then(canAccess => {
    if (canAccess) {
      Todo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id) }, { $set: { description: req.body.text } })
        .then(() => res.send("Updated todo description"))
        .catch(err => console.log(err));
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});
//delete todo by id
router.delete("/:_id", (req, res) => {
  isAuthenticated(req.body.token).then(canAccess => {
    if (canAccess) {
      Todo.deleteOne({ _id: mongoose.Types.ObjectId(req.params._id) })
        .then(() => res.send("Successfully deleted todo"))
        .catch(err => console.log(err));
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});
//mark todo as complete by id
router.post("/:_id/complete", (req, res) => {
  isAuthenticated(req.body.token).then(canAccess => {
    if (canAccess) {
      Todo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params._id) }, { $set: { completedOn: new Date() } })
        .then(() => res.send("Marked todo as complete"))
        .catch(err => console.log(err));
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});

module.exports = router;
