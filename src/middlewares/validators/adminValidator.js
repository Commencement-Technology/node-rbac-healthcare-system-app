const { param } = require("express-validator");

const validateDeleteUser = [param("userId", "Invalid user ID").isMongoId()];
module.exports = {
  validateDeleteUser,
};
