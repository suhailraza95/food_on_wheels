const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  refreshAccessToken,
  logout,
} = require("../controllers/authController");


const signupUserREQSchema = require("../schema/request-schema/create-customer-schema")
const validateDto = require("../middleware/validate-dto")
const loginUserREQSchema = require("../schema/request-schema/login-user-schema")
const refreshTokenREQSchema = require("../schema/request-schema/refresh-token-schema")

router.post("/signup", 
  validateDto(signupUserREQSchema),
  signup);

router.post("/login",
  validateDto(loginUserREQSchema),
  login);

router.post("/refresh-token", 
  validateDto(refreshTokenREQSchema),
  refreshAccessToken);
  
router.post("/logout", logout);

module.exports = router;