const pool = require("../db/pool")
const errors = require("../utils/errors")
const encrypt = require("../utils/encrypt")

exports.signUp = async (req, res, next) => {
  try {
    let body = req.body
    console.log("BODY", body)
    let sqlCheckDupUser = `SELECT * FROM public.users where username = $1`

    let responseCheckDupUser = await pool.query(sqlCheckDupUser, [
      body.username,
    ])
    console.log("responseCheckDupUser", responseCheckDupUser)
    if (responseCheckDupUser.rowCount > 0) {
      return res.status(400).json({ status: "fail", data: "User is duplicate" })
    }

    let sql = `INSERT INTO public.users 
    ( first_name, last_name, email,username, user_password, roles)
    VALUES($1, $2, $3, $4, $5, $6);`
    let pwd = await encrypt.hashPassword(body.password)
    let response = await pool.query(sql, [
      body.firstname,
      body.lastname,
      body.email,
      body.username,
      pwd,
      body.role,
    ])
    console.log(response)
    if (response.rowCount > 0) {
      const token = await encrypt.generateJWT({ username: body.username })
      return res
        .status(200)
        .json({ status: "success", token: token, data: "Insert data success" })
    } else {
      return res.status(400).json({ status: "fail", data: "Insert data fail" })
    }
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}

exports.singIn = async (req, res, next) => {
  try {
    let body = req.body
    console.log("BODY", body)
    let sql = `SELECT * FROM public.users where username = $1`
    let response = await pool.query(sql, [body.username])
    console.log(response)
    if (response.rowCount > 0) {
      const isPwdValid = await encrypt.comparePassword(
        body.password,
        response.rows[0].user_password
      )
      if (isPwdValid) {
        const token = await encrypt.generateJWT({
          username: body.username,
          role: response.rows[0].roles,
        })
        return res.status(200).json({
          status: "success",
          token: token,
          data: "Login success",
        })
      } else {
        return res
          .status(401)
          .json({ status: "fail", data: "Password invalid" })
      }
    } else {
      return res.status(400).json({ status: "fail", data: "User not found" })
    }
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}

exports.verifyToken = async (req, res, next) => {
  // 1.check token
  console.log(req.headers.authorization)
  if (req.headers.authorization == null) {
    errors.mapError(401, "Token undefine", next)
  }

  const token = req.headers.authorization.split(" ")[1]

  if (!token) {
    errors.mapError(401, "Token undefine", next)
  }

  // 2. verify token
  try {
    const data = await encrypt.verifyToken(token)
    req.user = {}
    req.user.role = data.role
  } catch (error) {
    console.log(error.message)
    errors.mapError(401, "Token invalid ", next)
  }
  next()
}

exports.verifyPermissionRead = async (req, res, next) => {
  const user = req.user
  if (user.role != "user" && user.role != "admin") {
    errors.mapError(401, "Permission invalid ", next)
  }

  next()
}

exports.verifyPermissionWrite = async (req, res, next) => {
  const user = req.user
  if (user.role != "admin") {
    errors.mapError(401, "Permission invalid ", next)
  }

  next()
}
