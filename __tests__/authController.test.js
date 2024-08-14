const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");
beforeEach(async () => {
  await User.deleteMany();
});
test("Should register a new user", async () => {
  const response = await request(app)
    .post("/register")
    .send({
      username: "Dhriti",
      email: "Dhriti@test.com",
      password: "1234567890",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(response.body).toMatchObject({
    user: {
      username: "Dhriti",
      email: "dhriti@test.com",
    },
  });
  expect(user.password).not.toBe("1234567890");
});
