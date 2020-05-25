const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  update,
  remove,
};

function find() {
  return db("entries").orderBy("id");
}

function findBy(filter) {
  return db("entries").where(filter).orderBy("id");
}

function findByUserId(user_id) {
  return db("entries").where({ user_id }).orderBy("id", "desc").limit(5);
}

function findById(id) {
  return db("entries").where({ id }).first();
}

async function add(entry) {
  try {
    const [id] = await db("entries").insert(entry, "id");
    return findById(id);
  } catch (err) {
    throw err;
  }
}

function update(changes, id) {
  return db("entries")
    .where({ id })
    .update(changes)
    .then((id) => {
      return findById(id);
    });
}

function remove(id) {
  return db("entries").where({ id }).del();
}
