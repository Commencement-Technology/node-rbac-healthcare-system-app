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

/**
 * @openapi
 * '/patients/{patientId}/appointments':
 *  post:
 *     tags:
 *     - /patients
 *     summary: Create an appointment for a specific patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - notes
 *             properties:
 *               doctorId:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/patients/:patientId/appointments",
  verifyAuth,
  checkPermissions(["book_appointments"]),
  validateAppointment,
  createAppointment
);

/**
 * @openapi
 * '/patients/{patientId}/appointments':
 *  get:
 *     tags:
 *     - /patients
 *     summary: Get all appointments for a specific patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all appointments
 *       400:
 *         description: Validation error
 *       404:
 *         description: No appointments found
 *       500:
 *         description: Server error
 */
router.get(
  "/patients/:patientId/appointments",
  verifyAuth,
  checkPermissions(["read_own_appointments"]),
  validatePatientId,
  getAppointmentsByPatientId
);

/**
 * @openapi
 * '/patients/{patientId}/records':
 *  get:
 *     tags:
 *     - /patients
 *     summary: Get all medical records for a specific patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all records
 *       400:
 *         description: Validation error
 *       404:
 *         description: No records found
 *       500:
 *         description: Server error
 */
router.get(
  "/patients/:patientId/records",
  verifyAuth,
  checkPermissions(["read_own_records"]),
  validatePatientId,
  getRecordsByPatientId
);

/**
 * @openapi
 * '/patients/{patientId}/records':
 *  post:
 *     tags:
 *     - /patients
 *     summary: Write a medical record for a specific patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - diagnosis
 *               - treatment
 *               - notes
 *             properties:
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medical record created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/patients/:patientId/records",
  verifyAuth,
  checkPermissions(["write_medical_records"]),
  validateRecord,
  writeRecord
);

module.exports = router;
