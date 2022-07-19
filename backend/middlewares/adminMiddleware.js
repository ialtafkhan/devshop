const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

exports.adminOnly = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Passed",
      });
    }
    const { id } = jwt.verify(token, process.env.JWT_KEY);

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const result = await user.findById(id);
    if (!result.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "NOT AN ADMIN : Unautherized Access",
      });
    }

    
    

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unautherized Access",
    });
  }
};
