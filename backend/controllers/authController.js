const user = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./../utils/email");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });
    if (!result) {
      return res.status(401).json({
        success: false,
        message: "email not found",
      });
    }
    // jar email bhetla tar
    const verify = await bcrypt.compare(password, result.password);
    if (!verify) {
      return res.status(401).json({
        success: false,
        message: "PASSWORD DO NOT MATCH ",
      });
    }

    // user deactivate asel tar it is not for user authentication
    if (!result.isActive) {
      return res.status(401).json({
        success: false,
        message: "You are blocked Please contact to admin",
      });
    }
    // user deactivate asel tar

    //  email passowrd donhi verify zale tar ata token pathvaych
    const token = jwt.sign({ id: result._id }, process.env.JWT_KEY);

    res.status(200).json({
      success: true,
      message: "user loggedIn Successfully",
      result: {
        token,
        name: result.name,
        isAdmin: result.isAdmin,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error" + error,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    console.log(req.body.email);
    const result = await user.findOne({ email: req.body.email });
    if (!result) {
      res.status(401).json({
        success: false,
        message: "Email Not Found",
      });
    }

    sendEmail(
      "altafpathan439@gmail.com",
      "Reset Password",
      "Your One time password will be 111"

    )
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Error" + error,
    });
  }
};
