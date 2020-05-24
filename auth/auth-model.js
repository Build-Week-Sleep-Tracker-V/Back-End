const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
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

function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then((id) => {
      return findById(id);
    });
}

function remove(id) {
  return db("users").where({ id }).del();
}
