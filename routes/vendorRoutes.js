const express = require("express");
const router = express.Router();

const {
    createVendor
} = require("../controllers/vendorController");
const validateDto = require("../middleware/validate-dto")
const vendorformREQSchema = require("../schema/request-schema/vendor-form-schema")


router.post(
    "/profile",
    validateDto(vendorformREQSchema),
    createVendor
);

module.exports = router;