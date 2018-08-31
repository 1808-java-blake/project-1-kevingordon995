import { Pool, Client } from 'pg';

export const connectionPool = new Pool({
  user: process.env["PROJECT_ONE_USERNAME"],
  host: 'localhost',
  database: 'postgres',
  password: process.env["PROJECT_ONE_PASSWORD"],
  port: 5433,
  max: 2
})
