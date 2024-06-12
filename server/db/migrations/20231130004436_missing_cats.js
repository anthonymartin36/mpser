export async function up(knex) {
  await knex.schema.withSchema('public').createTable('missing_cats', (table) => {
    table.increments('cat_id').primary()
    table.boolean('microchip')
    table.string('microchip_number')
    table.integer('user_id_mc').unsigned()
    table.foreign('user_id_mc').references('users_table.user_id')
    table.string('cat_name')
    table.string('breed')
    table.string('color')
    table.string('description')
    table.date('date_lost')
    table.string('location')
    table.string('missing_cat_phone')
    table.string('missing_cat_email')
    table.string('missing_image_url')
    table.boolean('cat_missing')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('missing_cats')
}
