const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/adminController");

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
  deleteUser
);

module.exports = router;
