const express = require("express");
const router = express.Router();

const {goOnline} = require( "../controllers/vendorOnlineController");
const validateDto = require("../middleware/validate-dto")
const vendoronlineREQSchema = require("../schema/request-schema/go-online-schema")



router.post(
    "/go-online",
    validateDto(vendoronlineREQSchema),
    goOnline
);

module.exports = router;