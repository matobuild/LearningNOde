exports.ApiError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.status,
  })
}

exports.mapError = (status, msg, next) => {
  let error = Error()
  error.statusCode = status
  error.status = msg
  next(error)
}
