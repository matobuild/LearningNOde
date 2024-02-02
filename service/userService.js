const pool = require("../db/pool")
const errors = require("../utils/errors")
const encrypt = require("../utils/encrypt")

exports.signUp = async (req, res) => {
  try {
    let body = req.body
    console.log("BODY", body)
    let sql = `INSERT INTO public.users 
    ( first_name, last_name, email,username, user_password)
    VALUES($1, $2, $3, $4, $5);`
    let pwd = await encrypt.hashPassword(body.password)
    let response = await pool.query(sql, [
      body.firstname,
      body.lastname,
      body.email,
      body.username,
      pwd,
    ])
    console.log(response)
    if (response.rowCount > 0) {
      res.status(200).json({ status: "success", data: "Insert data success" })
    } else {
      res.status(400).json({ status: "fail", data: "Insert data fail" })
    }
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}
