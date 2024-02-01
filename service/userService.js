const pool = require("../db/pool")
const errors = require("../utils/errors")

exports.getAllUsers = async (req, res, next) => {
  try {
    let sql = "SELECT * FROM public.customers"
    let response = await pool.query(sql)
    console.log(response)
    if (response.rowCount > 0) {
      res.status(200).json({ status: "success", data: response.rows })
    } else {
      res.status(400).json({ status: "fail", data: "data not found" })
    }
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}

exports.createUser = async (req, res) => {
  try {
    let body = req.body
    console.log("BODY", body)
    let sql = `INSERT INTO public.customers
  ( firstname, lastname, email, city, job)
  VALUES( '${body.firstname}',  '${body.lastname}',  '${body.email}',  '${body.city}', '${body.job}');`
    console.log("SQL", sql)
    let response = await pool.query(sql)
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

exports.getUserById = async (req, res, next) => {
  try {
    let { id } = req.params
    id = Number(id)
    if (Number.isNaN(id)) {
      return errors.mapError(400, "Request param invalid type", next)
    }
    let sql = "select * from public.customers where customerID = $1"
    let response = await pool.query(sql, [id])
    console.log(response)

    if (response.rowCount > 0) {
      res.status(200).json({ status: "success", data: response.rows[0] })
    } else {
      return errors.mapError(404, "Data not found", next)
    }
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}

exports.updateUserById = async (req, res, next) => {
  try {
    let { id } = req.params
    id = Number(id)
    if (Number.isNaN(id)) {
      return errors.mapError(400, "Request param invalid type", next)
    }
    let body = req.body
    let sql = `UPDATE Customers
    SET firstName = $1, lastName = $2, email = $3, city = $4, job= $5
    WHERE CustomerID = $6;`

    let response = await pool.query(sql, [
      body.firstname,
      body.lastname,
      body.email,
      body.city,
      body.job,
      id,
    ])
    console.log(response)

    if (response.rowCount > 0) {
      res.status(200).json({ status: "success", data: "update data success" })
    } else {
      res.status(400).json({ status: "fail", data: "update data fail" })
    }
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}

exports.deleteUserById = async (req, res, next) => {
  try {
    let { id } = req.params
    id = Number(id)
    if (Number.isNaN(id)) {
      return errors.mapError(400, "Request param invalid type", next)
    }
    let sql = `DELETE FROM Customers WHERE CustomerID = $1;`

    let response = await pool.query(sql, [id])
    console.log(response)

    if (response.rowCount > 0) {
      res.status(200).json({ status: "success", data: "delete data success" })
    } else {
      res.status(400).json({ status: "fail", data: "delete data fail" })
    }
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}

// --------------------------------
exports.checkID = (req, res, next, val) => {
  if (Number(val) <= 0) {
    res.status(400).json({
      status: "success",
      data: "Bad Request, ID must be a positive number",
    })
  } else {
    next()
  }
}

exports.checkID2 = (req, res, next) => {
  console.log(req.params.id)
  if (Number(req.params.id) <= 0) {
    res.status(400).json({
      status: "success",
      data: "Bad Request",
    })
  } else {
    next()
  }
}
