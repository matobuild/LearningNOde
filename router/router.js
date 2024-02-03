const express = require("express")
const customerService = require("../service/customerService")
const userService = require("../service/userService")

const router = express.Router()

// router.param("id", customerService.checkID)

router
  .route("/customers/")
  .get(customerService.getAllCustomers)
  .post(customerService.createCustomer)
router
  .route("/customers/:id")
  .get(
    // check middleware multiple times
    customerService.checkID2,
    customerService.checkID2,
    customerService.checkID2,
    customerService.getCustomerById
  )
  .patch(customerService.updateCustomerById)
  .delete(customerService.deleteCustomerById)

router.route("/users/").post(userService.signUp)
router.route("/users/login").post(userService.singIn)

module.exports = router
