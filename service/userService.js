exports.getAllUsers = (req, res) => {
  res.status(200).json({ status: "success", data: "Function test not defined" })
}

exports.createUser = (req, res) => {
  res.status(200).json({ status: "success", data: "Function test not defined" })
}

exports.getUserById = (req, res) => {
  res.status(200).json({ status: "success", data: "Function test not defined" })
}

exports.updateUserById = (req, res) => {
  res.status(200).json({ status: "success", data: "Function test not defined" })
}

exports.deleteUserById = (req, res) => {
  res.status(200).json({ status: "success", data: "Function test not defined" })
}

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
