
exports.up = function(knex) {
    return knex.schema
    .createTable("users", users => {
      users.increments();
      users
        .varchar("email", 302)
        .notNullable()
        .unique();
      users.string("password", 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("users");
};
