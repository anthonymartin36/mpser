import knex, { Knex } from 'knex'
import config from './knexfile.js'
import * as dotenv from 'dotenv'

dotenv.config()

type Environment = 'development' | 'production' | 'test'
const env = (process.env.NODE_ENV as Environment) || 'development' //import.meta.env.NODE_ENV

type KnexConfig = {
    [key in Environment]: Knex.Config
}

const typedConfig: KnexConfig = config

const connection = knex(typedConfig[env])

//const connection = knex(config[env])

export default connection
