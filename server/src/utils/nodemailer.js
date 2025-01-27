import nodemailer from "nodemailer";
import ErrorHandler from "./ErrorHandler.js";
import config from "../config/env.config.js";

export const sendmail = async (req, res, next, url) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "my.smtp.host",
    port: 465,
    auth: {
      user: config.EMAIL_ADDRESS, //! Owner Email Address
      pass: config.EMAIL_PASSWORD, //! Owner Email App Password
    },
  });

  const mailOptions = {
    from: "Ecommerce Website Support Team",
    to: req.body.email, //! User email
    subject: "Password reset link",
    html: `<h1>Click link blow to reset password</h1>
    <a href=${url}>password reset link</a>
    `,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      return next(new ErrorHandler(err, 500));
    }
    console.log("Nodemailer", info);
    return res.status(200).json({
      message: "mail send successfully",
      url,
    });
  });
};
