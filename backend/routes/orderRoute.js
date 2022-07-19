const express = require('express')
const { placeOrder, deleteAllOrder, getAllOrders, updateStatusOrder, getMyOrders } = require('../controllers/orderController')
const router = express.Router()

router
      .route("/")
      .get(getAllOrders)
      .post(placeOrder)
router
      .route("/delete/all")
      .post(deleteAllOrder)

router
      .route("/status/:id")
      .put(updateStatusOrder)

router
      .route("/myorders").get(getMyOrders)

module.exports = router