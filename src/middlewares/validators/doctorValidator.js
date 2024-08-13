const { param } = require("express-validator");

const validateDoctorId = [
  param("doctorId").isMongoId().withMessage("Invalid doctor ID"),
];

module.exports = {
  validateDoctorId,
};
