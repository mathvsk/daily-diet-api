import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('foods', function (table) {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.boolean('in_diet').notNullable()
    table.timestamp('date').notNullable()
    table.timestamps(true, true)

    table
      .uuid('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('foods')
}
