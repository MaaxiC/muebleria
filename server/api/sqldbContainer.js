import { DATE } from "../utils/index.js"

class SqldbContainer {
    constructor (config, table){
        this.config  = config
        this.table = table
    }

    async getAll() {
        try {
            const rows = await this.config.from(this.table).select('*')
            return rows
        } catch (error) {
            return []
        }
    }

    async getById(id) {
         try {
            const row = await this.config(this.table).select('*').where('id', id)
            if (row == 0) {
                return undefined 
            }
            return row
         } catch (error) {
            return error
         }
    }

    async save(obj) {
        try {
            obj.created_at = DATE.getTimestamp()
            return this.config(this.table).insert(obj, 'id')
        } catch (error) {
            throw new Error({error: 'error al guardar en la DB'})
        }
    }

    async update(id, data) {
        try {
            const row = await this.config(this.table).where('id', id).update(data)
            if (row != 1) return false
            return true
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try {
            const row = await this.config(this.table).where({ id: id }).del()
            console.log(row)
            if (row != 1) return false
            return true
        } catch (error) {
            return error
        }
    }
}

export { SqldbContainer }