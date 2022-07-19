const mongoose = require("mongoose")

const orderSchema = mongoose.Schema(
    {
        userId : {
            // {mongoose.Types.ObjestId} => ha mongoose cha id sathi inbulid data type aahe
            type: mongoose.Types.ObjectId,
            ref:"user",
            required:true
        },
        mode : {
            type: String,
            required:true,
            // enum => khlai delelya doghan paikich option select karayche yacha paiki dusra kahi ale tr error dakhvyla tyasathi enum use karta
            enum :["cod","online"]
        },
        status :{
            type:String,
            default: "placed",
            enum:["placed","dispatch","transit","delivered"]
        },
        products:[
            {
                productId:{
                    type:mongoose.Types.ObjectId,
                    required:true,
                    ref:"product"
                },
                qty:{
                    type:Number,
                    required:true
                },
                total:{
                    type:Number,
                }
            }
        ]


    },{timestamps:true}
)

module.exports = mongoose.model("order",orderSchema)