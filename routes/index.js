const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/todos", require("./todos"));

module.exports = router;
