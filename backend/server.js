const express = require("express")
require("colors")
require("dotenv").config({ path: "./config/.env" })
const db = require("./config/db")
const productRoute = require("./routes/productRoutes")
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/authRoute")
const orderRoute = require("./routes/orderRoute")
const cors = require("cors")
const { userIsAdmin } = require("./controllers/userController")
const { loginOnly } = require("./middlewares/authMiddleware")

db()
const app = express()

app.use(express.static("public"))  // to upload image

app.use(cors())
app.use(express.json())


app.use("/api/product", productRoute)
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/order", loginOnly, orderRoute)
app.listen(process.env.PORT || 5000, e => console.log(`SERVER RUNNING http://localhost:${process.env.PORT || 5000}`.bgBlue.black))