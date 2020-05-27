exports.up = function (knex) {
  return knex.schema.createTable("entries", function (entries) {
    entries.increments();
    entries.text("sleepStart", 128).notNullable();
    entries.text("sleepEnd", 128).notNullable();
    entries.integer("mood").unsigned().notNullable();
    entries
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("users.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("entries");
};
