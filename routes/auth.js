const User = require("mongoose").model("User");

function isAuthenticated(token) {
  return User.findOne({ guid: token })
    .then(user => {
      return user === null ? undefined : user._id;
    })
    .catch(err => null);
}

module.exports = isAuthenticated;
