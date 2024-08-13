const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({ success: true, data: allUsers });
  } catch (err) {
    res.status(500).json({ success: false, message: `Server error: ${err}` });
  }
};

module.exports = {
  getAllUsers,
};
