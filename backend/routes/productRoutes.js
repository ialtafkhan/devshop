const express = require("express")
const { getAllProducts, getSingleProduct, addProducts, updateSingleProduct, deleteSingleProduct, deleteALLProducts, publishUnpublishProduct, adminGetAllProducts } = require("../controllers/productController")
const { adminOnly } = require("../middlewares/adminMiddleware")
const { upload } = require("../middlewares/upload")

const router=express.Router()

// http://localhost:5000/api/product
router
      .route("/")
      .get(getAllProducts)
      .post(adminOnly, upload.single("image"),addProducts)

router 
      .route("/admin/product")
      .get(adminOnly, adminGetAllProducts)


                                       //id
// http://localhost:5000/api/product/[e2333a222]
router
      .route("/:id")
      .get(getSingleProduct)
      .put(adminOnly, upload.single("image"), updateSingleProduct)
      .delete(adminOnly, deleteSingleProduct)



// http://localhost:5000/api/product/delete-all
router
      .route("/delete/all")
      .delete(adminOnly, deleteALLProducts)


// http://localhost:5000/api/product/publish/[id]
router
      .route("/publish/:id")
      .put(adminOnly, publishUnpublishProduct)

module.exports = router
