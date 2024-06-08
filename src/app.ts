import basicAuth from '@fastify/basic-auth'

import { fastify } from 'fastify'
import { userController } from './controller/user'
import { authValidate } from './middleware/authValidate'
import { foodController } from './controller/food'

export const app = fastify()

app.register(basicAuth, {
  validate: authValidate,
  authenticate: true,
})

app.register(userController)
app.register(foodController)
