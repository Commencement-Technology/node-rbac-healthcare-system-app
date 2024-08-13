const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.id).populate("role");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

const checkPermissions = (permissions) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate("role");

      if (
        user &&
        user.role &&
        user.role.permissions.some((permission) =>
          permissions.includes(permission)
        )
      ) {
        return next();
      }

      return res.status(403).json({ success: false, message: "Access denied" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: `Server error: ${err}` });
    }
  };
};

module.exports = {
  verifyAuth,
  checkPermissions,
};
