const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination : (req, file, cb) => {cb(null, "public/upload")},

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fn = "product-" + Date.now() + ext

        // below line image frontend madhe apan route banvala ..upload karnya sathi use keli aahe 
        req.body.image = `upload/${fn}`
        cb(null, fn)
    }

})



exports.upload = multer({storage})