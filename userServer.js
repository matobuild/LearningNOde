const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")

const userRouter = require("./router/userRouter")

const app = express()

dotenv.config({ path: "./config.env" })
const port = process.env.PORT || 8080

console.log(process.env.USERNAME)

app.use(express.json())
app.use(morgan("dev"))
// get static file from public folder
app.use(express.static("./public"))

app.use("/api/v1/users", userRouter)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
