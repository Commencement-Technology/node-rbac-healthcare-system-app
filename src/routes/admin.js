const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/adminController");

const { verifyAuth, checkPermissions } = require("../middlewares/auth");

router.get(
  "/admin/users",
  verifyAuth,
  checkPermissions(["read_users"]),
  getAllUsers
);

module.exports = router;
