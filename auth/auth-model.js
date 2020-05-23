const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users")
    .select("id", "firstName", "lastName", "email")
    .orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function findById(id) {
  return db("users")
    .where({ id })
    .select("id", "firstName", "lastName", "email")
    .first();
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
}
