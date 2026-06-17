const express = require("express");
const protect = require('../middleware/authMiddleware');

const {
    getDashboard
} = require(
    "../controllers/customerDashboardController"
);

const router = express.Router();

router.get(
    "/dashboard/:userId",
    protect,
    getDashboard
);

module.exports = router;