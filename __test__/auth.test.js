const supertest = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const Role = require("../src/models/Role");
const mongoose = require("mongoose");

jest.mock("../src/models/User");
jest.mock("../src/models/Role");

process.env.JWT_SECRET = "test-secret-key";

describe("POST /login", () => {
  const mockUserId = new mongoose.Types.ObjectId();
  const mockRoleId = new mongoose.Types.ObjectId();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 if user exists and credentials are valid", async () => {
    Role.findOne.mockResolvedValue({
      _id: mockRoleId,
      name: "patient",
      permissions: ["read", "write"],
    });

    User.findOne.mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        _id: mockUserId,
        email: "a@gmail.com",
        password:
          "$2a$10$u8NnSBFscUu0h1JBPfEqqemOls16L7fI6DqLqMg6lnXpKZFTNqzUe",
        role: {
          _id: mockRoleId,
          name: "patient",
        },
      }),
    });

    const res = await supertest(app).post("/login").send({
      email: "ali@gmail.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
  });

  it("should return 400 if user does not exist", async () => {
    User.findOne.mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    const res = await supertest(app).post("/login").send({
      email: "nonexistent@gmail.com",
      password: "123456",
    });

    expect(res.status).toBe(400);
  });
});
