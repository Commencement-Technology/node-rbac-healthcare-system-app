const express = require("express");
const resourceController = require("../controllers/resourceController");
const { verifyAuth, checkPermissions } = require("../middlewares/auth");
const router = express.Router();

router.get("/view", auth, authorize(["read"]), resourceController.viewResource);
router.post(
  "/edit",
  verifyAuth,
  checkPermissions(["write"]),
  resourceController.editResource
);
router.delete(
  "/delete",
  verifyAuth,
  checkPermissions(["delete"]),
  resourceController.deleteResource
);

module.exports = router;
