const bcrypt = require("bcrypt")
const errors = require("./errors")
const jwt = require("jsonwebtoken")

exports.hashPassword = async (plaintextPassword) => {
  try {
    const hash = await bcrypt.hash(plaintextPassword, 10)
    return hash
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}

exports.comparePassword = async (plaintextPassword, hash) => {
  const result = await bcrypt.compare(plaintextPassword, hash)
  return result
}

exports.generateJWT = async (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
  return token
}
