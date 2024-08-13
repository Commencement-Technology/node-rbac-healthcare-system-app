const { body, param } = require("express-validator");

const validateAppointment = [
  param("patientId").isMongoId().withMessage("Invalid patient ID"),
  body("doctorId").isMongoId().withMessage("Invalid doctor ID"),
  body("notes").isString().optional(),
];

const validatePatientId = [
  param("patientId").isMongoId().withMessage("Invalid patient ID"),
];

const validateRecord = [
  param("patientId").isMongoId().withMessage("Invalid patient ID"),
  body("diagnosis").isString().withMessage("Diagnosis is required"),
  body("treatment").isString().withMessage("Treatment is required"),
  body("notes").isString().optional(),
];

module.exports = {
  validateAppointment,
  validatePatientId,
  validateRecord,
};
