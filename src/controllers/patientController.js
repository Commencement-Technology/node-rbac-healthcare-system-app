const { validationResult } = require("express-validator");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const MedicalRecord = require("../models/MedicalRecord");

const assignPatientToDoctor = async (doctorId, patientId) => {
  try {
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);

    if (doctor.assignedPatients.includes(patientId)) {
      console.log("Patient is already assigned to this doctor");
      return;
    }

    doctor.assignedPatients.push(patientId);
    patient.assignedDoctor = doctorId;

    await doctor.save();
    await patient.save();

    console.log("Patient assigned to doctor successfully");
  } catch (error) {
    console.error("Error assigning patient to doctor:", error);
  }
};

const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { doctorId, notes } = req.body;
  const patientId = req.params.patientId;

  try {
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      notes: notes,
    });

    assignPatientToDoctor(doctorId, patientId);

    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getAppointmentsByPatientId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const patientId = req.params.patientId;

  try {
    const appointments = await Appointment.find({ patient: patientId })
      .populate("doctor", "username email")
      .sort({ appointmentDate: 1 });

    if (appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this patient.",
      });
    }

    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: `Server error: ${err}` });
  }
};

const getRecordsByPatientId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const patientId = req.params.patientId;

  try {
    let records = await MedicalRecord.find({ patient: patientId });

    if (!records) records = [];

    res.status(200).json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", err });
  }
};

const writeRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const patientId = req.params.patientId;
  const doctorId = req.user.id;
  const { diagnosis, treatment, notes } = req.body;

  try {
    const record = new MedicalRecord({
      patient: patientId,
      doctor: doctorId,
      diagnosis,
      treatment,
      notes,
    });

    await record.save();

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err,
    });
  }
};

module.exports = {
  writeRecord,
  createAppointment,
  getAppointmentsByPatientId,
  getRecordsByPatientId,
};
