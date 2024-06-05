import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3000),
  DATABASE_CLIENT: z.string(),
  PG_CONNECTION_STRING: z.string(),
})

export const env = envSchema.parse(process.env)
