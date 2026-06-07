const express = require("express");

const {
  sendOtp,
  verifyOtp
} = require("../controllers/otpController");

const router = express.Router();

const validateDto = require("../middleware/validate-dto")
const verifyOtpREQSchema = require("../schema/request-schema/verify-otp-schema")

router.post("/send", sendOtp);
router.post("/verify",
  validateDto(verifyOtpREQSchema),
  verifyOtp);

module.exports = router;