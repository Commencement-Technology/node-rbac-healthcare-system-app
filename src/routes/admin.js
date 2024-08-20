const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const {
  validateDeleteUser,
} = require("../middlewares/validators/adminValidator");
const { verifyAuth, checkPermissions } = require("../middlewares/auth");

router.get(
  "/admin/users",
  verifyAuth,
  checkPermissions(["read_users"]),
  getAllUsers
);

router.delete(
  "/admin/users/:userId",
  verifyAuth,
  checkPermissions(["delete_users"]),
  validateDeleteUser,
  deleteUser
);

module.exports = router;
