const express = require("express")
const fs = require("fs")
const { getUserById, deleteUserById } = require("./service/customerService")

const app = express()
const port = 8080

app.use(express.json())
app.use((req, res, next) => {
  console.log("HELLO from middleware !!!!")
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// app.get("/hello", (req, res) => {
//   res.status(400).send("Hello World")
// })

// app.post("/customer", (req, res) => {
//   res.status(200).json({ firstname: "John", lastname: "Doe" })
// })

// ---------------
let data = JSON.parse(fs.readFileSync("./students.txt", "utf-8"))

const getStudent = (req, res) => {
  console.log(req.requestTime)
  res
    .status(200)
    .json({ status: "success", requestedAt: req.requestTime, data: data })
}

const getStudentWithParams = (req, res) => {
  console.log(req.params)
  let id = req.params.id
  let response = data.find((e) => e.ID == id)
  if (response) {
    res.status(200).json({ status: "success", data: response })
  } else {
    res.status(404).json({ status: "FAIL", message: "DATA NOT FOUND" })
  }
}

const createStudent = (req, res) => {
  let body = req.body
  console.log(body)
  let response = data.filter((e) => e.Name == body.name)
  res.status(200).json({ status: "success", data: response })
}

const updateStudent = (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ status: "Fail", data: " Bad Request" })
  }
  // UPDATE DATA BASE
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: "update successfully",
  })
}

const deleteStudent = (req, res) => {
  let id = req.params.id
  console.log(id)
  res.status(200).json({ status: "success", data: "Delete successfully" })
}

// app.get("/api/v1/students", getStudent)
// app.post("/api/v1/students", createStudent)
// Is the same as below
app.route("/api/v1/students").get(getStudent).post(createStudent)

// app.get("/api/v1/students/:id", getStudentWithParams)
// app.patch("/api/v1/students/:id", updateStudent)
// app.delete("/api/v1/students/:id", deleteStudent)
// // Is the same as below
app
  .route("/api/v1/students/:id")
  .get(getStudentWithParams)
  .patch(updateStudent)
  .delete(deleteStudent)

app.listen(port, () => {
  console.log("App is running on port 8080")
})

// ----
// const http = require("http")
// const fs = require("fs")
// const url = require("url")
// const slugify = require("slugify")

// let text = "Hello ooooo"
// console.log(slugify(text, { lower: true, replacement: "**" }))

// const server = http.createServer((req, res) => {
//   console.log(req.url)
//   const { query, pathname } = url.parse(req.url, true)

//   console.log("query is", query)

//   if (pathname == "/home") {
//     res.end("Hello home")
//   } else if (pathname == "/product") {
//     fs.readFile("./product.txt", "utf-8", (err, data) => {
//       let product = JSON.parse(data)
//       console.log(product)
//       res.write(JSON.stringify(product))
//       res.end()
//     })
//   } else if (pathname == "/payment") {
//     res.end(`Hello payment ${query.transecID}`)
//   }
// })

// server.listen(8080, () => {
//   console.log("sserver is listening on port 8080")
// })

// =-------------------------------------for pakage.json---------------------------
// "start": "nodemon server.js"
