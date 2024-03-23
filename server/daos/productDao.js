import knex from 'knex'
import { config } from "../config/config.js";
import { SqldbContainer } from '../api/sqldbContainer.js'

class ProductDao extends SqldbContainer {
  constructor() {
    super(knex(config.SQL_DB), config.collection.products);
  }

  static async getRandom(lim) {
    try {
      const row = await knex(config.SQL_DB).raw(`select * from ${(config.collection.products)} order by RANDOM() limit ${lim}`)
      if (row == 0) {
          return undefined 
      }
      return row
   } catch (error) {
      return error
   }
  }

  static async getFavorites() {
    try {
      const row = await knex(config.SQL_DB).raw(`select * from ${(config.collection.products)} where id = 1 or id = 2 or id = 3 or id = 4`)
      if (row == 0) {
          return undefined 
      }
      return row
   } catch (error) {
      return error
   }
  }

  static async getProdByCategories(limite, offset, categoria) {
    try {
      const row = await knex(config.SQL_DB).raw(`select * from ${(config.collection.products)} where categoria = ${categoria} limit ${limite} offset ${offset}`)
      if (row == 0) {
          return undefined 
      }
      return row
   } catch (error) {
      return error
   }
  }

  static async getCountByCategories(categoria) {
    try {
      const row = await knex(config.SQL_DB).raw(`select COUNT(*) from ${(config.collection.products)} where categoria = ${categoria}`)
      if (row == 0) {
          return undefined 
      }
      return row
   } catch (error) {
      return error
   }
  }
}

export { ProductDao };