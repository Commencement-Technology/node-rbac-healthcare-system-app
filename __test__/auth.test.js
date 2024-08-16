const supertest = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const Role = require("../src/models/Role");
const mongoose = require("mongoose");

jest.mock("../src/models/User");
jest.mock("../src/models/Role");

process.env.JWT_SECRET = "test-secret-key";

const mockUserId = new mongoose.Types.ObjectId();
const mockRoleId = new mongoose.Types.ObjectId();

describe("Auth Controller", () => {
  const mockFindUser = (user) => {
    User.findOne.mockReturnValue({
      populate: jest.fn().mockResolvedValue(user),
    });
  };

  describe("POST /login", () => {
    const mockUser = {
      _id: mockUserId,
      email: "ali@gmail.com",
      password: "$2a$10$u8NnSBFscUu0h1JBPfEqqemOls16L7fI6DqLqMg6lnXpKZFTNqzUe", // bcrypt hash for "123456"
      role: {
        _id: mockRoleId,
        name: "patient",
      },
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return 200 if user exists and credentials are valid", async () => {
      mockFindUser(mockUser);

      const res = await supertest(app).post("/login").send({
        email: mockUser.email,
        password: "123456",
      });

      expect(res.status).toBe(200);
      expect(res.body.user.email).toEqual(mockUser.email);
    });

    it("should return 404 if user does not exist", async () => {
      mockFindUser(null);

      const res = await supertest(app).post("/login").send({
        email: "nonexistent@gmail.com",
        password: "123456",
      });

      expect(res.status).toBe(400);
    });

    it("should return 400 if the email or password fields are left blank", async () => {
      mockFindUser(mockUser);

      const res1 = await supertest(app).post("/login").send({
        email: "nonexistent@gmail.com",
      });

      expect(res1.status).toBe(400);

      const res2 = await supertest(app).post("/login").send({
        password: "123456",
      });

      expect(res2.status).toBe(400);
    });
  });

  describe("POST /register", () => {
    const mockUser = {
      username: "talha",
      email: "talha@gmail.com",
      password: "123456",
      roleName: "patient",
    };

    const mockRole = {
      _id: new mongoose.Types.ObjectId(),
      name: "patient",
    };

    it("should return 201 if user is created successfully", async () => {
      User.findOne.mockResolvedValue(null); // No existing user
      Role.findOne.mockResolvedValue(mockRole);
      User.prototype.save = jest.fn().mockResolvedValue(mockUser);
      const res = await supertest(app).post("/register").send(mockUser);

      expect(res.status).toBe(201);
    });

    it("should return 400 if user already exist", async () => {
      User.findOne.mockResolvedValue(mockUser);
      Role.findOne.mockResolvedValue(mockRole);

      const res = await supertest(app).post("/register").send(mockUser);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "User already exists",
      });
    });
  });
});
