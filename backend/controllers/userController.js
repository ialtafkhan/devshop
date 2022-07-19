const user = require("./../models/userModel")
const brcpyt = require("bcryptjs")

exports.getAllUsers = async(req,res) => {
    try {
        const result = await user.find()
        res.status(200).json({
            count: result.length,
            result,
            success: true,
            message: "All user Fetched"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error" + error
        })
    }
}

exports.getSingleUser = async (req,res) => {
    try {
        if (!req.params.id) {
            throw new Error("Please Provide User Id")  
        }
        
        const result = await user.findById(req.params.id)
        res.status(200).json({
            result,
            success: true,
            message:"Single User Fetched"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error" + error
        })
        
    }
}

exports.addUsers = async (req,res) => {
    try {
        const {password} = req.body
        const salt = await brcpyt.genSalt(10)
        req.body.password = await brcpyt.hash(password,salt)
        const result = await user.create(req.body)
        res.status(200).json({
            result,
            success : true,
            message:"User added Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error" + error
        })   
    }
}

exports.userIsAdmin = async(req,res) => {
    try {
         
        const result= await user.findByIdAndUpdate(req.params.id, {isAdmin : req.body.isAdmin}, {new : true})
        res.status(200).json({
            result,
            success:true,
            message:"User unpublished Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error" + error
        })
        
    }
}
exports.userDeactivate = async(req,res) => {
    try {
         
        const result= await user.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json({
            result,
            success:true,
            message:"User Activation Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error" + error
        })
        
    }
}

exports.updateSingleUser = async(req,res) => {
    try {
         
        const result= await user.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            result,
            success:true,
            message:"User updated Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error" + error
        })
        
    }
}

exports.deleteSingleUser = async(req,res) => {
    try {
         
        const result= await user.findByIdAndDelete(req.params.id)
        res.status(202).json({
            result,
            success:true,
            message:"User deleted Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error" + error
        })
        
    }
}

exports.deleteAllUser = async(req,res) => {
    try {
         
        const result= await user.deleteMany()
        res.status(202).json({
            result,
            success:true,
            message:"All Product deleted Successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error" + error
        })
        
    }
}