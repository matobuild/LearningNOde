const express = require("express")
const customerService = require("../service/customerService")
const userService = require("../service/userService")

const router = express.Router()

// router.param("id", customerService.checkID)

router
  .route("/customers/")
  .get(
    userService.verifyToken,
    userService.verifyPermissionRead,
    customerService.getAllCustomers
  )
  .post(
    userService.verifyToken,
    userService.verifyPermissionRead,
    customerService.createCustomer
  )
router
  .route("/customers/:id")
  .get(
    userService.verifyToken,
    // can check middleware multiple times if needed
    // customerService.checkID2,
    // customerService.checkID2,
    // customerService.checkID2,
    userService.verifyPermissionRead,
    customerService.getCustomerById
  )
  .patch(
    userService.verifyToken,
    userService.verifyPermissionRead,
    customerService.updateCustomerById
  )
  .delete(
    userService.verifyToken,
    userService.verifyPermissionWrite,
    customerService.deleteCustomerById
  )

router
  .route("/users/")
  .post(userService.signUp)
  .patch(userService.verifyToken, userService.updateUser)
  .delete(userService.verifyToken, userService.deleteUser)
router.route("/users/login").post(userService.singIn)

module.exports = router
