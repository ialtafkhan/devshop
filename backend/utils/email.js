const nodemailer = require("nodemailer");


const fromEmail = "altafpathan439@gmail.com"
exports.sendEmail = (
  to = "ak8835097@gmail.com",
  subject = "welcome",
  text = "Thank you for registering with us"
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: fromEmail,
      pass: "@altaf7020",
    },
  });
  transporter.sendMail(
    {
      from: fromEmail,
      to,
      subject,
      text
    },
    (err) => {
      err
        ? console.log(`Something went wrong ${err}`)
        : console.log("Email sent");
    }
  );
};







