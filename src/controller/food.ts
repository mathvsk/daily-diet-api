import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export const foodController = async (app: FastifyInstance) => {
  app.addHook('preHandler', app.basicAuth)

  app.post('/food', async (request, reply) => {
    const foodSchema = z.object({
      name: z.string(),
      description: z.string(),
      inDiet: z.boolean(),
    })

    const { name, description, inDiet } = foodSchema.parse(request.body)

    await knex('foods').insert({
      id: randomUUID(),
      name,
      description,
      in_diet: inDiet,
      user_id: request.user.id,
    })

    return reply.code(201).send()
  })

  app.get('/food', async (request, reply) => {
    const foods = await knex('foods').where({ user_id: request.user.id })

    return reply.send({
      foods,
    })
  })
}
