const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name:{type:String, required:true},
        price:{type:Number, required:true},
        stock:{type:Number, required:true},
        image:{type:String, required:true},
        publish:{type:Boolean, default:true},
        desc:{type:String, required:true}
    },
    { timestamps: true });

module.exports = mongoose.model("product", productSchema);
