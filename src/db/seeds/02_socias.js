exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('socias').del()
    .then(function () {
      // Inserts seed entries
      return knex('socias').insert([
        {nombre: 'Ana', apellido: 'García', fecha_ingreso: '2022-01-15', id_sucursal: 1, activo: true},
        {nombre: 'Carla', apellido: 'Lopez', fecha_ingreso: '2021-06-20', id_sucursal: 1, activo: true},
        {nombre: 'Maria', apellido: 'Hernandez', fecha_ingreso: '2023-03-10', id_sucursal: 2, activo: false}
      ]);
    });
};
