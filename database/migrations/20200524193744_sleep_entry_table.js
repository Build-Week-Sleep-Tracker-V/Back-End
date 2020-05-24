exports.up = function (knex) {
  return knex.schema.createTable("entries", function (entries) {
    entries.increments();
    entries.float("date").notNullable();
    entries.float("time_slept").notNullable();
    entries.integer("mood").unsigned().notNullable();
    entries
      .integer("user_id")
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
