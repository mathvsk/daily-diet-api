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

  app.get<{ Params: IParams }>('/:foodId', async (request, reply) => {
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

  app.get('/metrics', async (request, reply) => {
    const foods = await knex('foods')
      .where({ user_id: request.user.id })
      .orderBy('date', 'asc')

    const { totalUserFoodInDiet, totalUserFoodInNotDiet } = foods.reduce(
      (counts, food) => {
        if (food.in_diet) {
          counts.totalUserFoodInDiet += 1
        } else {
          counts.totalUserFoodInNotDiet += 1
        }
        return counts
      },
      { totalUserFoodInDiet: 0, totalUserFoodInNotDiet: 0 },
    )

    const { bestOnDietSequence } = foods.reduce(
      (accumulator, food) => {
        if (food.in_diet) {
          accumulator.currentSequence += 1
        } else {
          accumulator.currentSequence = 0
        }

        if (accumulator.currentSequence > accumulator.bestOnDietSequence) {
          accumulator.bestOnDietSequence = accumulator.currentSequence
        }

        return accumulator
      },
      { bestOnDietSequence: 0, currentSequence: 0 },
    )

    reply.send({
      totalUserFood: totalUserFoodInDiet + totalUserFoodInNotDiet,
      totalUserFoodInDiet,
      totalUserFoodInNotDiet,
      bestOnDietSequence,
    })
  })
}
