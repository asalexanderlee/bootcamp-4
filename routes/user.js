const router = require("express").Router();
const User = require("mongoose").model("User");
const uuidv1 = require("uuid/v1");
const isAuthenticated = require("./auth");

// get all users
router.get("/", (req, res) => {
  isAuthenticated(req.body.token).then(canAccess => {
    if (canAccess) {
      User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(500).send("Failed to get info from database"));
    } else res.status(403).send("You must be registered as a user before viewing this info.");
  });
});

// register a user account
router.post("/", (req, res) => {
  const guid = uuidv1();
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    guid: guid
  });
  user.save((err, doc) => {
    if (err) res.status(500).send(err);
    res.send(guid);
  });
});

module.exports = router;
