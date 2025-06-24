const express = require("express");
const app = express();
const port = 9000;
const Router = require("./Routes/route");
const cors = require("cors");
require("./config/mongoose");

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use('/assets', express.static(process.cwd()+"/public"))

//
const nodemailer = require("nodemailer");
require("dotenv").config();

let currentOtp = null;

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-otp", async (req, res) => {
  const data = req.body;
  currentOtp = generateOtp();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Verification code for Teachman",
    text: `Dear Biraj Gyawali,

        Please use the OTP

        ${currentOtp}

        to login within the next 10 minutes.

        If you did not request this change, ignore this email and contact us at contact@teachman.com for assistance.

        Regards,
        The Teachman Digital`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent", status: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === currentOtp) {
    res.json({ message: "OTP verified successfully",status: true });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

app.use("/api/v1", Router);

app.use((req, res, next) => {
  next({
    msg: "Not Found",
    status: 404,
  });
});

app.use((error, req, res, next) => {
  let status_code = error.status || 500;
  let msg = error.msg || error;
  console.log("Helre", error)

  res.status(status_code).json({
    msg: msg,
    status: false,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
