export async function up(knex) {
  await knex.schema.withSchema('public').createTable('sighted_cats', (table) => {
    table.increments('sighted_cat_id').primary()
    table.integer('user_id_sc').references('users_table.user_id')
    table.integer('cat_id_mc').references('missing_cats.cat_id')
    table.string('color')
    table.string('description')
    table.date('date_seen')
    table.float('lat')
    table.float('lng')
    table.string('location')
    table.string('string_location')
    table.string('sighted_cat_phone')
    table.string('sighted_cat_email')
    table.string('sighted_image_url')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('sighted_cats')
}
