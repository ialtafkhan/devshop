const express = require("express")
const { login, forgetPassword } = require("../controllers/authController")

const router = express.Router()

router
      .route("/login")
      .post(login)
      
router
      .route("/forgetpassword")
      .post(forgetPassword)
       
module.exports = router