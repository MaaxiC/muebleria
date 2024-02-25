import knex from 'knex'
import { config } from "../config/config.js";
import { createHash } from '../utils.js'

const knex_sqLite = knex(config.SQL_DB)

const createTableProducts = async (knexConfig) => {
    try {
        await knexConfig.schema.dropTableIfExists('productos')

        await knexConfig.schema.createTable('productos', table => {
            table.increments('id').primary()
            table.string('nombre').notNullable()
            table.string('descripcion')
            table.string('codigo')
            table.string('foto')
            table.integer('precio').notNullable()
            table.integer('stock').notNullable()
            table.integer('stockComprometido').notNullable()
            table.integer('categoria').references('id').inTable('categorias')
            table.string('created_at')
        })
        console.log('Tabla productos creada')
    } catch (error) {
        return error
    }
}

const createTableCategories = async (knexConfig) => {
    try {
        await knexConfig.schema.dropTableIfExists('categorias')

        await knexConfig.schema.createTable('categorias', table => {
            table.increments('id').primary()
            table.string('nombre').notNullable()
            table.timestamp('created_at')
        })
        console.log('Tabla categorias creada')
    } catch (error) {
        return error
    }
}

const createTableUsers = async (knexConfig) => {
    try {
        await knexConfig.schema.dropTableIfExists('usuarios')

        await knexConfig.schema.createTable('usuarios', table => {
            table.increments('id').primary()
            table.string('nombre').notNullable()
            table.string('apellido').notNullable()
            table.string('email').notNullable()
            table.string('password').notNullable()
            table.date('fechaNacimiento').notNullable()
            table.string('direccion')
            table.string('telefono')
            table.string('usuario').notNullable()
            table.string('dni').notNullable()
            table.string('genero')
            table.boolean('activo').notNullable()
            table.string('created_at')
        })
        console.log('Tabla usuarios creada')

        await knexConfig('usuarios').insert({
            nombre: 'Admin',
            apellido: 'Admin',
            email: 'admin@admin.com',
            password: createHash('admin'),
            fechaNacimiento: '2021-01-01',
            direccion: 'test',
            telefono: '1234567890',
            usuario: 'admin',
            dni: '12345678',
            genero: 'test',
            activo: true,
            created_at: '2021-01-01'
        })
        console.log('Usuario Admin creado')
    } catch (error) {
        return error
    }
}

const createTableOrders = async (knexConfig) => {
    try {
        await knexConfig.schema.dropTableIfExists('ordenes')

        await knexConfig.schema.createTable('ordenes', table => {
            table.increments('id').primary()
            table.string('nombre').notNullable()
            table.string('apellido').notNullable()
            table.integer('dni').notNullable()
            table.json('productos');
            table.integer('montoTotal').notNullable()
            table.string('estado').notNullable()
            table.timestamp('created_at')
        })
        console.log('Tabla Ordenes creada')
    } catch (error) {
        return error
    }
}

export const initialSetup = async () => {
    await createTableProducts(knex_sqLite)
    await createTableCategories(knex_sqLite)
    await createTableUsers(knex_sqLite)
    await createTableOrders(knex_sqLite)
}