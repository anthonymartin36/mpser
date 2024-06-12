export async function up(knex) {
  await knex.schema.withSchema('public').createTable('users_table', (table) => {
    table.increments('user_id').primary()
    table.string('username')
    table.string('password')
    table.string('email')
    table.string('auth0_id')
    table.string('given_name')
    table.string('family_name')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
