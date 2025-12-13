/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('branches', function (table) {
      table.string('id').primary();
      table.string('name', 255).notNullable();
      table.string('address', 255);
    })
    .createTable('users', function (table) {
      table.string('id').primary();
      table.string('username', 255).notNullable().unique();
      table.string('role', 50).notNullable();
      table.jsonb('permissions');
      table.timestamps(true, true);
    })
    .createTable('employees', function (table) {
      table.string('id').primary();
      table.string('firstName', 255).notNullable();
      table.string('lastName', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.timestamp('hireDate').notNullable();
      table.string('branchId').references('id').inTable('branches');
      table.boolean('isActive').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('vacations', function (table) {
      table.string('id').primary();
      table.string('employeeId').notNullable().references('id').inTable('employees');
      table.date('startDate').notNullable();
      table.date('endDate').notNullable();
      table.integer('daysUsed').notNullable();
      table.string('status', 50).notNullable().defaultTo('PENDING');
      table.integer('cycleYear').notNullable();
      table.timestamp('requestedAt').defaultTo(knex.fn.now());
      table.string('approvedBy').references('id').inTable('users');
      table.timestamp('approvedAt');
    })
    .createTable('permissions', function (table) {
      table.string('id').primary();
      table.string('employeeId').notNullable().references('id').inTable('employees');
      table.date('permissionDate').notNullable();
      table.integer('hours');
      table.string('reason', 255);
      table.string('status', 50).notNullable().defaultTo('PENDING');
      table.timestamp('requestedAt').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('permissions')
    .dropTable('vacations')
    .dropTable('employees')
    .dropTable('users')
    .dropTable('branches');
};
