const supertest = require("supertest");

const server = require("../api/server");
const db = require("../database/dbConfig");

const { generateToken } = require("../auth/auth-service");

const token = generateToken({
  subject: 1,
  firstName: "mrsimpson3000",
});

afterEach(async () => {
  await db("users").truncate();
});

describe("server", () => {
  describe("post /api/auth/register", () => {
    beforeEach(async () => {
      await supertest(server).post("/api/auth/register").send({
        username: "mrsimpson3000",
        password: "password",
      });
    });
    describe("get /api/users", () => {
      it("should return a status code of 200", () => {
        return supertest(server)
          .get("/api/users")
          .set("Authorization", token)
          .then((res) => {
            expect(res.status).toBe(200);
          });
      });
      it("should return an array length of 1", () => {
        return supertest(server)
          .get("/api/users")
          .set("Authorization", token)
          .then((res) => {
            expect(res.body).toHaveLength(1);
          });
      });
      describe("put /api/users/:id", () => {
        it("should return a status code of 200", () => {
          return supertest(server)
            .put("/api/users/1")
            .set("Authorization", token)
            .send({
              username: "mrsimpson3000",
              password: "mypassword",
            })
            .then((res) => {
              expect(res.status).toBe(200);
            });
        });
        it("should return an updated user", () => {
          return supertest(server)
            .put("/api/users/1")
            .set("Authorization", token)
            .send({
              username: "mrsimpson3000",
              password: "mypassword",
            })
            .then((res) => {
              expect(res.body.updatedUser.id).toBe("1");
            });
        });
      });
    });
  });
});
