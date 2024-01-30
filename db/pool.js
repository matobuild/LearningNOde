const { Pool } = require("pg")

const pool = new Pool({
  user: "hnlenrem",
  host: "arjuna.db.elephantsql.com",
  database: "hnlenrem",
  password: "gakqmr5PxEprmVglSkCylD6a2iE4yztK",
  port: 5432,
})

module.exports = pool
