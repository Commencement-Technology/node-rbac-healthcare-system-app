const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const {
  validateLogin,
  validateRegister,
} = require("../middlewares/validators/authValidators");

/**
 * @openapi
 * '/register':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Register a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: User created successfully
 *      409:
 *        description: Email already exists
 *      400:
 *        description: Validation Error
 *      500:
 *        description: Server Error
 */
router.post("/register", validateRegister, authController.register);

/**
 * @openapi
 * '/login':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: User logged in successfully
 *      401:
 *        description: Invalid credentials
 *      400:
 *        description: Validation Error
 *      500:
 *        description: Server Error
 */
router.post("/login", validateLogin, authController.login);

module.exports = router;
