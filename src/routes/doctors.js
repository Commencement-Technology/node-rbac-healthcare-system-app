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

/**
 * @openapi
 * '/doctors/{doctorId}/appointments':
 *  get:
 *     tags:
 *     - /doctors
 *     summary: Get all appointments for a specific doctor
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: ID of the doctor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all appointments
 *       400:
 *         description: Validation Error
 *       404:
 *         description: No appointments found for this doctor
 *       500:
 *         description: Server Error
 */
router.get(
  "/doctors/:doctorId/appointments",
  verifyAuth,
  checkPermissions(["manage_appointments"]),
  validateDoctorId,
  getAppointmentsByDoctorId
);

/**
 * @openapi
 * '/doctors/{doctorId}/patients':
 *  get:
 *     tags:
 *     - /doctors
 *     summary: Get all patients assigned to a specific doctor
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: ID of the doctor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all patients
 *       400:
 *         description: Validation Error
 *       404:
 *         description: No patients found for this doctor
 *       500:
 *         description: Server Error
 */
router.get(
  "/doctors/:doctorId/patients",
  verifyAuth,
  checkPermissions(["read_assigned_patients"]),
  validateDoctorId,
  getAllPatientsByDoctorId
);

module.exports = router;
