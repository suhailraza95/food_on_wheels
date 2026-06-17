const express = require("express");

const {
    addReview
} = require(
    "../controllers/reviewController"
);
const validateDto = require("../middleware/validate-dto")
const addReviewREQSchema = require("../schema/request-schema/add-review-schema")

const router = express.Router();

router.post("/",
    validateDto(addReviewREQSchema),
    addReview);

module.exports = router;