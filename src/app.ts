import { fastify } from 'fastify'
import { userController } from './controller/user'

export const app = fastify()

app.register(userController)
