import knex from 'knex'
import { config } from "../config/config.js";
import { SqldbContainer } from '../api/sqldbContainer.js'

class OrderDao extends SqldbContainer {
  constructor() {
    super(knex(config.SQL_DB), config.collection.orders);
  }
}

export { OrderDao };