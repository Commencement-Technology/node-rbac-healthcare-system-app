const express = require("express");
const {
  writeRecord,
  createAppointment,
  getAppointmentsByPatientId,
  getRecordsByPatientId,
} = require("../controllers/patientController");

const {
  validateAppointment,
  validatePatientId,
  validateRecord,
} = require("../middlewares/validators/patientValidator");

const router = express.Router();

const { verifyAuth, checkPermissions } = require("../middlewares/auth");

router.post(
  "/patients/:patientId/appointments",
  verifyAuth,
  checkPermissions(["book_appointments"]),
  validateAppointment,
  createAppointment
);

router.get(
  "/patients/:patientId/appointments",
  verifyAuth,
  checkPermissions(["read_own_appointments"]),
  validatePatientId,
  getAppointmentsByPatientId
);

router.get(
  "/patients/:patientId/records",
  verifyAuth,
  checkPermissions(["read_own_records"]),
  validatePatientId,
  getRecordsByPatientId
);

router.post(
  "/patients/:patientId/records",
  verifyAuth,
  checkPermissions(["write_medical_records"]),
  validateRecord,
  writeRecord
);

module.exports = router;
