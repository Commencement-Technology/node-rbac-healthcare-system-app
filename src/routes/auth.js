const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const {
  validateLogin,
  validateRegister,
} = require("../middlewares/validators/authValidators");

router.post("/register", validateRegister, authController.register);

router.post("/login", validateLogin, authController.login);

module.exports = router;
