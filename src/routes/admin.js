const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const {
  validateDeleteUser,
} = require("../middlewares/validators/adminValidator");
const { verifyAuth, checkPermissions } = require("../middlewares/auth");

/**
 * @openapi
 * '/admin/users':
 *  get:
 *     tags:
 *     - admin
 *     summary: Get all users
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  username:
 *                    type: string
 *                  email:
 *                    type: string
 *                  role:
 *                    type: string
 *      403:
 *        description: Forbidden - Insufficient permissions
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
router.get(
  "/admin/users",
  verifyAuth,
  checkPermissions(["read_users"]),
  getAllUsers
);

/**
 * @openapi
 * '/admin/users/{userId}':
 *  delete:
 *     tags:
 *     - admin
 *     summary: Delete a user
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        description: ID of the user to delete
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: User deleted successfully
 *      403:
 *        description: Forbidden - Insufficient permissions
 *      404:
 *        description: User not found
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
router.delete(
  "/admin/users/:userId",
  verifyAuth,
  checkPermissions(["delete_users"]),
  validateDeleteUser,
  deleteUser
);

module.exports = router;
