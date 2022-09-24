const express = require("express");

const router = express.Router();

// controller
const { createUser, loginUser } = require("../controller/userController");

router.route("/signup").post(createUser);

router.post("/login", loginUser);

module.exports = router;
