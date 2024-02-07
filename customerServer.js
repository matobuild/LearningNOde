const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const router = require("./router/router")
const errors = require("./utils/errors")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const hpp = require("hpp")
const app = express()

dotenv.config({ path: "./config.env" })
const port = process.env.PORT || 8080

console.log(process.env.USERNAME)

app.use(helmet())
app.use(
  hpp({
    whitelist: ["customerId"],
  })
)
app.use(express.json({ limit: "100kb" }))
app.use(morgan("dev"))
// get static file from public folder
app.use(express.static("./public"))

//set app limit request limit
const limiter = rateLimit({
  max: 10,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests",
})
app.use("/api", limiter)

app.use("/api/v1", router)
app.all("*", (req, res, next) => {
  // res.status(400).json({
  //   status: "fail",
  //   data: `Path ${req.originalUrl} not found in the server`,
  // })
  const err = new Error(`Path ${req.originalUrl} not found in the server`)
  err.status = "fail"
  err.statusCode = 404
  next(err)
})

// global error handling
app.use(errors.ApiError)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
