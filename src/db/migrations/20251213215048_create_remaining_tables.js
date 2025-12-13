exports.up = function(knex) {
  return knex.schema
    .createTable('vacaciones', function(table) {
      table.increments('id').primary();
      table.integer('id_socia').unsigned().references('id').inTable('socias');
      table.date('fecha_inicio').notNullable();
      table.date('fecha_fin').notNullable();
      table.integer('dias_tomados').notNullable();
      table.string('estado', 50).notNullable();
      table.string('ciclo_anual', 10);
      table.timestamps(true, true);
    })
    .createTable('permisos', function(table) {
      table.increments('id').primary();
      table.integer('id_socia').unsigned().references('id').inTable('socias');
      table.date('fecha').notNullable();
      table.integer('horas');
      table.integer('dias');
      table.text('motivo');
      table.string('estado', 50).notNullable();
      table.timestamps(true, true);
    })
    .createTable('eventos', function(table) {
      table.increments('id').primary();
      table.string('tipo_evento', 100).notNullable();
      table.json('payload');
      table.string('endpoint_url', 255);
      table.string('estado_entrega', 50).defaultTo('pendiente');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('configuraciones', function(table) {
      table.increments('id').primary();
      table.string('clave', 100).unique().notNullable();
      table.text('valor').notNullable();
      table.text('descripcion');
      table.timestamps(true, true);
    })
    .createTable('usuarios', function(table) {
      table.increments('id').primary();
      table.string('nombre', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('password_hash', 255).notNullable();
      table.string('rol', 50).notNullable();
      table.timestamps(true, true);
    })
    .createTable('permisos_granulares', function(table) {
      table.increments('id').primary();
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios');
      table.string('recurso', 100).notNullable();
      table.string('accion', 50).notNullable();
      table.boolean('permitido').defaultTo(false);
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('permisos_granulares')
    .dropTable('usuarios')
    .dropTable('configuraciones')
    .dropTable('eventos')
    .dropTable('permisos')
    .dropTable('vacaciones');
};
