const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Otp = require("../models/otpModel");

const generateToken = require("../resources/generateToken");
const generateRefreshToken = require("../resources/generateRefreshToken");
const validator = require("validator");

const { sendOtpEmail } = require("../services/mailService");

/**
 * @desc Signup
 * @route POST /api/auth/signup
 */
const signup = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    accountType,
    privacyPolicyConsent,
    termsOfServiceConsent,
    marketingConsent,
    aiProcessingConsent,
  } = req.body;

  if (
  !email ||
  !password ||
  !accountType ||
  privacyPolicyConsent === undefined ||
  termsOfServiceConsent === undefined ||
  marketingConsent === undefined ||
  aiProcessingConsent === undefined
) {
  res.status(400);
  throw new Error("All fields are mandatory");
}


// EMAIL VALIDATION
const isValidEmail = validator.isEmail(email);

if (!isValidEmail) {
  res.status(400);
  throw new Error("Please provide a valid email");
}


// PASSWORD VALIDATION
const isStrongPassword = validator.isStrongPassword(password);

if (!isStrongPassword) {
  res.status(400);
  throw new Error(
    "Please provide a strong password"
  );
}


// ACCOUNT TYPE VALIDATION
if (
  accountType !== "user" &&
  accountType !== "vendor"
) {
  res.status(400);
  throw new Error(
    "Account type must be user or vendor"
  );
}


// REQUIRED CONSENTS
if (!privacyPolicyConsent) {
  res.status(400);
  throw new Error(
    "Privacy policy consent is required"
  );
}

if (!termsOfServiceConsent) {
  res.status(400);
  throw new Error(
    "Terms of service consent is required"
  );
}

if (!aiProcessingConsent) {
  res.status(400);
  throw new Error(
    "AI processing consent is required"
  );
}

  const existingUser = await User.findOne({
    email,
    isDeleted: false,
  });

  // Allow re-registration if email exists but is not verified
  if (existingUser && existingUser.isEmailVerified) {
    res.status(409);
    throw new Error("User already exists");
  }

  if (existingUser && !existingUser.isEmailVerified) {
    await User.deleteOne({
      _id: existingUser._id,
    });

    await Otp.deleteMany({
      email,
      purpose: "EMAIL_VERIFICATION",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    accountType,
    privacyPolicyConsent,
    termsOfServiceConsent,
    marketingConsent,
    aiProcessingConsent,
    isUserDetailCompleted: false,
  });

  // Generate Email Verification OTP
  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const otpHash = await bcrypt.hash(
    otp,
    10
  );

  await Otp.create({
    userId: user._id,
    email: user.email,
    otpHash,
    purpose: "EMAIL_VERIFICATION",
    expiresAt: new Date(
      Date.now() + 10 * 60 * 1000
    ),
  });
console.log("otp: ", otp);
  await sendOtpEmail(
    user.email,
    otp
  );


  res.status(201).json({
    success: true,
    message:
      "Account created successfully. Please verify your email.",
    data: {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
      isEmailVerified: user.isEmailVerified,
    },
  });
});

/**
 * @desc Login
 * @route POST /api/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
  res.status(400);
  throw new Error(
    "Email and password are required"
  );
}

if (!validator.isEmail(email)) {
  res.status(400);
  throw new Error(
    "Please provide a valid email"
  );
}

  const user = await User.findOne({
    email,
    isDeleted: false,
  }).select("+password +refreshToken");

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  if (!user.isEmailVerified) {
    res.status(403);
    throw new Error(
      "Please verify your email first"
    );
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken(
    user._id
  );

  const refreshToken = generateRefreshToken(
    user._id
  );

  user.refreshToken = refreshToken;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
      isUserDetailCompleted: user.isUserDetailCompleted,
      isEmailVerified:
        user.isEmailVerified,
    },
  });
});

/**
 * @desc Refresh Access Token
 * @route POST /api/auth/refresh-token
 */
const refreshAccessToken = asyncHandler(
  async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401);
      throw new Error(
        "Refresh token required"
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (error) {
      res.status(401);
      throw new Error(
        "Invalid or expired refresh token"
      );
    }

    const user = await User.findById(
      decoded.id
    ).select("+refreshToken");

    if (!user || user.isDeleted) {
      res.status(401);
      throw new Error("User not found");
    }

    if (
      user.refreshToken !==
      refreshToken
    ) {
      res.status(401);
      throw new Error(
        "Invalid refresh token"
      );
    }

    const accessToken =
      generateToken(user._id);

    res.status(200).json({
      success: true,
      accessToken,
    });
  }
);

/**
 * @desc Logout
 * @route POST /api/auth/logout
 */
const logout = asyncHandler(
  async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400);
      throw new Error(
        "Refresh token required"
      );
    }

    const user =
      await User.findOne({
        refreshToken,
      }).select("+refreshToken");

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message:
        "Logged out successfully",
    });
  }
);

module.exports = {
  signup,
  login,
  refreshAccessToken,
  logout,
};