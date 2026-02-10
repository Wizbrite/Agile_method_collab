exports.seed = async function(knex) {
  await knex('tasks').del();
  await knex('tasks').insert([
    { title: 'Setup project repo', description: 'Create base template and README', status: 'done' },
    { title: 'Implement tasks API', description: 'Server side CRUD routes', status: 'in_progress' },
    { title: 'Build client', description: 'Minimal React app to list tasks', status: 'todo' }
  ]);
};
