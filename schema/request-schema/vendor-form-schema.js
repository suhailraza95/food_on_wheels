const ajvInstance = require("../../config/ajv-Instance");

const createVendorREQSchema = {
    type: "object",

    properties: {

        userId: {
            type: "string"
        },

        firstName: {
            type: "string",
            minLength: 2
        },

        lastName: {
            type: "string",
            minLength: 2
        },

        mobile: {
            type: "string",
            minLength: 10,
            maxLength: 15
        },

        businessName: {
            type: "string",
            minLength: 2
        },

        city: {
            type: "string",
            minLength: 2
        },

        state: {
            type: "string",
            minLength: 2
        },

        category: {
            type: "string",
            minLength: 2
        },

        privacyPolicyConsent: {
            type: "boolean"
        },

        marketingConsent: {
            type: "boolean"
        },

        termsOfServiceConsent: {
            type: "boolean"
        }
    },

    required: [
        "userId",
        "firstName",
        "lastName",
        "mobile",
        "businessName",
        "city",
        "state",
        "category",
        "privacyPolicyConsent",
        "marketingConsent",
        "termsOfServiceConsent"
    ],

    additionalProperties: false
};

module.exports =
    ajvInstance.compile(
        createVendorREQSchema
    );