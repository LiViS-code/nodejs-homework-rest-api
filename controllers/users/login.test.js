const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const {
  describe,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  expect,
  test,
} = require("@jest/globals");

const app = require("../../app");
const { User } = require("../../models");

const { DB_HOST, PORT = 3000 } = process.env;

describe("test login controller", () => {
  let server;

  beforeAll(() => (server = app.listen(PORT)));

  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  // checking for an existing user's login in the database
  test("test login user: mail@mail.com", async () => {
    const loginUser = {
      password: "123456",
      email: "mail@mail.com",
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200); // status 200
    const { body } = response;
    const { email } = body.data.user;
    expect(body.data.token).toBeTruthy(); // create token is Ok
    const { token } = await User.findOne({ email });
    expect(body.data.token).toBe(token); // tokens match
  });
});
