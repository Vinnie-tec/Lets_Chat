const express = require("express");

const router = express.Router();

// auth middleware
const {protect} = require('../middleware/authMiddleware');

// controller
const { createUser, loginUser, allUsers } = require("../controller/userController");

router.route("/").post(createUser).get(protect, allUsers);

router.post("/login", loginUser);

module.exports = router;
