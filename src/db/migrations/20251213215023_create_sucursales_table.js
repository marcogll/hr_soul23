exports.up = function(knex) {
  return knex.schema.createTable('sucursales', function(table) {
    table.increments('id').primary();
    table.string('nombre', 255).notNullable();
    table.text('direccion');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sucursales');
};
