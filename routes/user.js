const router = require("express").Router();
const User = require("mongoose").model("User");

// get all users
router.get("/", (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => console.log(err));
});

// add a user
router.post("/:firstName/:lastName/:token", (req, res) => {
  const user = new User({ firstName: req.params.firstName, lastName: req.params.lastName, token: req.params.token });
  user.save((err, doc) => {
    if (err) console.log(err);
    res.send("Successfully added user");
  });
});

module.exports = router;
