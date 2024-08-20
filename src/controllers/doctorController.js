const { validationResult } = require("express-validator");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

const getAppointmentsByDoctorId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const doctorId = req.params.doctorId;

  try {
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "username email")
      .sort({ appointmentDate: 1 });

    const appointmentsCount = appointments.length;
    if (appointmentsCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this doctor.",
      });
    }

    res
      .status(200)
      .json({ success: true, appointmentsCount, data: appointments });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occured while getting appointments by doctor id",
      error: err.message,
    });
  }
};

const getAllPatientsByDoctorId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const doctorId = req.params.doctorId;

  try {
    const doctor = await User.findById(doctorId);

    let patients = doctor.assignedPatients;

    if (!patients) patients = [];

    res.status(200).json({ success: true, data: patients });
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        "An error occured while getting all patients assigned to a doctor",
      error: err.message,
    });
  }
};

module.exports = {
  getAppointmentsByDoctorId,
  getAllPatientsByDoctorId,
};
