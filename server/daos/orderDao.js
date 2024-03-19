import knex from 'knex'
import { config } from "../config/config.js";
import { SqldbContainer } from '../api/sqldbContainer.js'

class OrderDao extends SqldbContainer {
  constructor() {
    super(knex(config.SQL_DB), config.collection.orders);
  }

  static async getAllByDate(lim, off) {
    try {
      const row = await knex(config.SQL_DB).from(config.collection.orders).select('*').orderBy('created_at', 'desc').limit(lim).offset(off)
      if (row == 0) {
          return undefined 
      }
      return row
   } catch (error) {
      return error
   }
  }
}

export { OrderDao };