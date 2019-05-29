const User = require("mongoose").model("User");

function isAuthenticated(token) {
  return User.findOne({ guid: token })
    .then(user => {
      return user === null ? false : true;
    })
    .catch(err => null);
}

module.exports = isAuthenticated;
