const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
    createVendor,getVendorDetails
} = require("../controllers/vendorController");
const validateDto = require("../middleware/validate-dto")
const vendorformREQSchema = require("../schema/request-schema/vendor-form-schema")


router.post(
    "/profile",
    protect,
    validateDto(vendorformREQSchema),
    createVendor
);

router.get(
    "/:vendorId",
    protect,
    getVendorDetails
);

module.exports = router;