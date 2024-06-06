import { knex } from '../database'
import { FastifyRequest } from 'fastify'

import bcrypt from 'bcrypt'

async function verifyUser(email: string, password: string) {
  const user = await knex.from('users').where({ email }).first()
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  return user
}

export async function authValidate(
  email: string,
  password: string,
  request: FastifyRequest,
) {
  const user = await verifyUser(email, password)

  request.user = { id: user.id }
}
