import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('foods', function (table) {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.boolean('in_diet').defaultTo(false)
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('updated_at').nullable()

    table.uuid('user_id').unsigned().references('id').inTable('users')
  })
}

export async function down(knex: Knex): Promise<void> {}
