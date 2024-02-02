const bcrypt = require("bcrypt")
const errors = require("./errors")

exports.hashPassword = async (plaintextPassword) => {
  try {
    const hash = await bcrypt.hash(plaintextPassword, 10)
    return hash
  } catch (error) {
    console.log(error.message)
    errors.mapError(500, "Internal Server Error", next)
  }
}
