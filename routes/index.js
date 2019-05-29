const router = require("express").Router();
const Todo = require("mongoose").model("Todo");
//delete this
router.use("/user", require("./user"));
router.use("/todo", require("./todo"));

// index page
router.get("/", (req, res) => {
  Todo.find({})
    .then(todos => res.render("../views/index", { todos: todos }))
    .catch(err => console.log(err));
});

module.exports = router;
