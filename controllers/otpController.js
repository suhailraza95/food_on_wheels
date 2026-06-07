const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const Otp = require("../models/otpModel");

const { sendOtpEmail } = require("../services/mailService");


const sendOtp = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }

    const user = await User.findOne({
        email,
        isDeleted: false
    });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await Otp.deleteMany({
        userId: user._id,
        purpose: "EMAIL_VERIFICATION"
    });

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const otpHash = await bcrypt.hash(
        otp,
        10
    );

    const expiresAt = new Date(
        Date.now() + 10 * 60 * 1000
    );

    await Otp.create({
        userId: user._id,
        email: user.email,
        otpHash,
        purpose: "EMAIL_VERIFICATION",
        expiresAt
    });

    await sendOtpEmail(
        user.email,
        otp
    );

    res.status(200).json({
        success: true,
        message: "OTP sent successfully"
    });

});


const verifyOtp = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    if (!email || !otp) {
        res.status(400);
        throw new Error(
            "Email and OTP are required"
        );
    }

    const user = await User.findOne({
        email,
        isDeleted: false
    });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const existingOtp = await Otp.findOne({
        userId: user._id,
        purpose: "EMAIL_VERIFICATION",
        isUsed: false
    }).sort({ createdAt: -1 });

    if (!existingOtp) {
        res.status(404);
        throw new Error("OTP not found");
    }

    if (existingOtp.expiresAt < new Date()) {
        res.status(400);
        throw new Error("OTP has expired");
    }

    if (existingOtp.attempts >= 5) {
        res.status(400);
        throw new Error(
            "Maximum OTP attempts exceeded"
        );
    }

    const isOtpMatched = await bcrypt.compare(
        otp,
        existingOtp.otpHash
    );

    if (!isOtpMatched) {

        existingOtp.attempts += 1;
        await existingOtp.save();

        res.status(400);
        throw new Error("Invalid OTP");
    }

    user.isEmailVerified = true;
    await user.save();

    existingOtp.isUsed = true;
    await existingOtp.save();

    res.status(200).json({
        success: true,
        message: "OTP verified successfully"
    });

});


module.exports = {
    sendOtp,
    verifyOtp
};