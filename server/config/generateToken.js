const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // it takes the [the id, the secret ad the expriration time or date]
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12hr" });
};

module.exports = generateToken;