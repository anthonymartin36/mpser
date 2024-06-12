export async function seed(knex) {
  await knex('missing_cats').del()
  await knex('users_table').del()
  await knex('sighted_cats').del()
}
