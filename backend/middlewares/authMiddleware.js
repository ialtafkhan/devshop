const jwt = require("jsonwebtoken");



exports.loginOnly = async (req, res, next) => {
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

    req.body.userId = id    


    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unautherized Access",
    });
  }
};
