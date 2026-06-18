const express = require("express");
const router = express.Router();

const {goOnline} = require( "../controllers/vendorOnlineController");
const validateDto = require("../middleware/validate-dto")
const vendoronlineREQSchema = require("../schema/request-schema/go-online-schema");
const protect = require("../middleware/authMiddleware");



router.post(
    "/go-online",
    protect,
    validateDto(vendoronlineREQSchema),
    goOnline
);

module.exports = router;