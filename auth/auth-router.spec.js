const supertest = require("supertest");

const server = require("../api/server");
const db = require("../database/dbConfig");

afterEach(async () => {
  await db("users").truncate();
});

describe("server", () => {
  // Testing the tester
  it("can run the tests", () => {
    expect(true).toBeTruthy();
  });
  // Testing the register endpoint
  describe("post /register", () => {
    it("should return a status code of 201", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: "mrsimpson3000",
          password: "password",
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });
  describe("post /register", () => {
    it("should return the newly created username", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: "mrsimpson3000",
          password: "password",
        })
        .then((res) => {
          expect(res.body.data.username).toBe("mrsimpson3000");
        });
    });
  });
  describe("post /register", () => {
    it("should return a status code of 400", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          username: "mrsimpson3000",
        })
        .then((res) => {
          expect(res.status).toBe(400);
        });
    });
  });
  describe("post /register", () => {
    it("should return a message asking for all the credentials", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({
          password: "password",
        })
        .then((res) => {
          expect(res.body.message).toBe(
            "Please provide all the proper credentials. Be sure that they are alphanumeric."
          );
        });
    });
  });
  // Testing login endpoint
  describe("post /login", () => {
    beforeEach(async () => {
      await supertest(server).post("/api/auth/register").send({
        username: "mrsimpson3000",
        password: "password",
      });
    });
    it("should return a status code of 200", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "mrsimpson3000",
          password: "password",
        })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a message", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "mrsimpson3000",
          password: "password",
        })
        .then((res) => {
          expect(res.body.message).toBe("Successful login.");
        });
    });
    it("should return a token", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "mrsimpson3000",
          password: "password",
        })
        .then((res) => {
          expect(res.body.token).toBeDefined();
        });
    });
    it("should return a user id", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "mrsimpson3000",
          password: "password",
        })
        .then((res) => {
          expect(res.body.userId).toBe(1);
        });
    });
    it("should return a status of 401", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "mrsimpson",
          password: "password",
        })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
    it("should return a message saying invalid credentials", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({
          username: "mrsimpson",
          password: "password",
        })
        .then((res) => {
          expect(res.body.message).toBe("Invalid credentials");
        });
    });
  });
});
