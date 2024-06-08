import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

interface IParams {
  foodId: string
}

export const foodController = async (app: FastifyInstance) => {
  app.addHook('preHandler', app.basicAuth)

  app.post('/', async (request, reply) => {
    const foodSchema = z.object({
      name: z.string(),
      description: z.string(),
      inDiet: z.boolean(),
      date: z.coerce.date(),
    })

    const { name, description, inDiet, date } = foodSchema.parse(request.body)

    await knex('foods').insert({
      id: randomUUID(),
      name,
      description,
      date,
      in_diet: inDiet,
      user_id: request.user.id,
    })

    return reply.code(201).send()
  })

  app.get('/', async (request, reply) => {
    const foods = await knex('foods').where({ user_id: request.user.id })

    return reply.send({
      foods,
    })
  })

  app.get<{ Params: IParams }>('/:id', async (request, reply) => {
    const { foodId } = request.params

    const food = await knex('foods')
      .where({ user_id: request.user.id, id: foodId })
      .first()

    if (!food) {
      return reply.code(404).send()
    }

    return reply.send({
      food,
    })
  })
}
