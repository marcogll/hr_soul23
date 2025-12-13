exports.up = function(knex) {
  return knex.schema.createTable('socias', function(table) {
    table.increments('id').primary();
    table.string('nombre', 255).notNullable();
    table.string('apellido', 255).notNullable();
    table.date('fecha_ingreso').notNullable();
    table.integer('id_sucursal').unsigned().references('id').inTable('sucursales');
    table.boolean('activo').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('socias');
};
