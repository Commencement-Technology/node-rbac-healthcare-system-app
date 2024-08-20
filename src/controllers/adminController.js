const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({ success: true, data: allUsers });
  } catch (err) {
    res.status(500).json({ success: false, message: `Server error: ${err}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
      error: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
