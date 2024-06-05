import { knex as SetupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.PG_CONNECTION_STRING,
  migrations: {
    extension: 'ts',
    directory: 'src/db/migrations',
  },
}

export const knex = SetupKnex(config)
