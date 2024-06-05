import bcrypt from 'bcrypt'

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

export async function userController(app: FastifyInstance) {
  app.post('/user', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = createUserSchema.parse(request.body)
    const hashedPassword = await bcrypt.hash(password, 10)

    await knex
      .insert({
        id: randomUUID(),
        name,
        email,
        password: hashedPassword,
      })
      .into('users')

    return reply.code(201).send()
  })
}
