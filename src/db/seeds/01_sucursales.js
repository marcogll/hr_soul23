exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sucursales').del()
    .then(function () {
      // Inserts seed entries
      return knex('sucursales').insert([
        {nombre: 'Oficina Central', direccion: '123 Calle Principal'},
        {nombre: 'Sucursal Norte', direccion: '456 Avenida Norte'},
        {nombre: 'Sucursal Sur', direccion: '789 Boulevard Sur'}
      ]);
    });
};
