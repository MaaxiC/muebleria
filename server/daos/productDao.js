import knex from 'knex'
import { config } from "../config/config.js";
import { SqldbContainer } from '../api/sqldbContainer.js'

class ProductDao extends SqldbContainer {
  constructor() {
    super(knex(config.SQL_DB), config.collection.products);
  }
}

export { ProductDao };