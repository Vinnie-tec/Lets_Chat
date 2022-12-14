const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

const generateToken = require("../config/generateToken");

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  // check if the user exit
  const userExists = await User.findOne({ email });
  // if it exists throw an eror
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // else go on to create new user
  const user = await User.create({ email, name, password, picture });
  // if successfully created, send to the frontend
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.picture,
      token: generateToken(user._id),
    });
    // console.log(pic)
  } else {
    res.status(404);
    throw new Error("Failed to create user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if the user exit and password are the same
  const user = await User.findOne({ email });
  // if yes, then send
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      picture: user.picture,
      token: generateToken(user._id),
    });
  }
});

// get User
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
  });
  res.send(users);
  // console.log(keyword);
});

module.exports = { createUser, loginUser, allUsers };
