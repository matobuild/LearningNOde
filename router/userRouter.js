const express = require("express")
const userService = require("../service/userService")

const usersRouter = express.Router()

// usersRouter.param("id", userService.checkID)

usersRouter.route("/").get(userService.getAllUsers).post(userService.createUser)
usersRouter
  .route("/:id")
  .get(
    // check middleware multiple times
    userService.checkID2,
    userService.checkID2,
    userService.checkID2,
    userService.getUserById
  )
  .patch(userService.updateUserById)
  .delete(userService.deleteUserById)

module.exports = usersRouter
