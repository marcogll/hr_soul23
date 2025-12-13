const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  await knex('usuarios').del();
  await knex('configuraciones').del();

  const hashedPassword = await bcrypt.hash('password', 10);

  await knex('usuarios').insert([
    {nombre: 'Admin User', email: 'admin@example.com', password_hash: hashedPassword, rol: 'admin'},
    {nombre: 'Root User', email: 'root@example.com', password_hash: hashedPassword, rol: 'root'}
  ]);

  await knex('configuraciones').insert([
      {clave: 'dias_vacaciones_por_anio', valor: '12,14,16,18,20,22', descripcion: 'Días de vacaciones según antigüedad'},
      {clave: 'webhook_url_vacaciones', valor: 'http://localhost:3012/webhook/vacaciones', descripcion: 'URL para notificaciones de vacaciones'}
  ]);
};
