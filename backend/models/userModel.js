const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true},
        mobile:{type:Number, required:true},
        password:{type:String, required:true},
        avatar:{type:String, default:"upload/default.png"},
        isAdmin:{type:Boolean, default: false},
        isActive:{type:Boolean, default: true},
    },
    { timestamps: true });

module.exports = mongoose.model("user", userSchema);
