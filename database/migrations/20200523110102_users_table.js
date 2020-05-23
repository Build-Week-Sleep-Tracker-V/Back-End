exports.up = function (knex) {
  return knex.schema.createTable("users", function (users) {
    users.increments();
    users.string("firstName", 128).notNullable();
    users.string("lastName", 128).notNullable();
    users.string("email", 128).notNullable();
    users.string("password", 128).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
