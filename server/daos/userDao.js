import knex from 'knex'
import { config } from "../config/config.js";
import { SqldbContainer } from '../api/sqldbContainer.js'

class UserDao extends SqldbContainer {
  constructor() { 
    super(knex(config.SQL_DB), config.collection.users);
  }

  static async getByUser(user) {
    try {
      const row = await knex(config.SQL_DB).from(config.collection.users).select('*').where('usuario', user)
      if (row == 0) {
          return undefined 
      }
      return row
   } catch (error) {
      return error
   }
  }

  static async getByEmail(email) {
    try {
      const row = await knex(config.SQL_DB).from(config.collection.users).select('*').where('email', email)
      if (row == 0) {
          return undefined 
      }
      return row
   } catch (error) {
      return error
   }
  }
}

export { UserDao };