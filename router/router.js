const express = require("express")
const customerService = require("../service/customerService")
const userService = require("../service/userService")

const router = express.Router()

// router.param("id", customerService.checkID)

router
  .route("/customers/")
  .get(userService.verifyToken, customerService.getAllCustomers)
  .post(userService.verifyToken, customerService.createCustomer)
router
  .route("/customers/:id")
  .get(
    userService.verifyToken,
    // check middleware multiple times
    customerService.checkID2,
    customerService.checkID2,
    customerService.checkID2,
    customerService.getCustomerById
  )
  .patch(userService.verifyToken, customerService.updateCustomerById)
  .delete(userService.verifyToken, customerService.deleteCustomerById)

router.route("/users/").post(userService.signUp)
router.route("/users/login").post(userService.singIn)

module.exports = router
