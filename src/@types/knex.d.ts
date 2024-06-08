import 'knex'

interface IUser {
  id: string
  name: string
  email: string
  password: string
  created_at: Date
}

interface IFood {
  id: string
  name: string
  description: string
  in_diet: boolean
  date: Date
  created_at: Date
  updated_at?: Date
  user_id: string
}

declare module 'knex/types/tables' {
  export interface Tables {
    users: IUser
    foods: IFood
  }
}
