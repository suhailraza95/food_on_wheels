const ajvInstance = require("../../config/ajv-Instance");

const goOnlineREQSchema = {
    type: "object",

    properties: {

        vendorId: {
            type: "string"
        },

        latitude: {
            type: "number"
        },

        longitude: {
            type: "number"
        },

        openTime: {
            type: "string"
        },

        closeTime: {
            type: "string"
        },

        status: {
            type: "string",
            enum: ["online", "offline"]
        }
    },

    required: [
        "vendorId",
        "latitude",
        "longitude",
        "openTime",
        "closeTime",
        "status"
    ],

    additionalProperties: false
};

module.exports =
    ajvInstance.compile(
        goOnlineREQSchema
    );