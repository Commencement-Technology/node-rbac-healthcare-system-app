const { body } = require("express-validator");

const validateLogin = [
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
];

const validateRegister = [
  body("username", "Username is required").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  body("roleName", "Role is required").not().isEmpty(),
];

module.exports = {
  validateLogin,
  validateRegister,
};
