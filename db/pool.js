const { Pool } = require("pg")
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const pool = new Pool({
  // user: "hnlenrem",
  // host: "arjuna.db.elephantsql.com",
  // database: "hnlenrem",
  // password: "gakqmr5PxEprmVglSkCylD6a2iE4yztK",
  // port: 5432,

  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

module.exports = pool
