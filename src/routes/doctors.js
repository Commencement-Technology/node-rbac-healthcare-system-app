const express = require("express");

const router = express.Router();

const { verifyAuth, checkPermissions } = require("../middlewares/auth");
const {
  getAllPatientsByDoctorId,
  getAppointmentsByDoctorId,
} = require("../controllers/doctorController");

const {
  validateDoctorId,
} = require("../middlewares/validators/doctorValidator");

router.get(
  "/doctors/:doctorId/appointments",
  verifyAuth,
  checkPermissions(["manage_appointments"]),
  validateDoctorId,
  getAppointmentsByDoctorId
);

router.get(
  "/doctors/:doctorId/patients",
  verifyAuth,
  checkPermissions(["read_assigned_patients"]),
  validateDoctorId,
  getAllPatientsByDoctorId
);

module.exports = router;
