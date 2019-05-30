const router = require("express").Router();
const Todo = require("mongoose").model("Todo");

router.use("/user", require("./user"));
router.use("/todo", require("./todo"));

// set your index page
router.get("/", (req, res) => {
  // get todos from db so that your ejs view can render them
  Todo.find({})
    .then(todos => res.render("../views/index", { todos: todos }))
    .catch(err => console.log(err));
});

module.exports = router;
