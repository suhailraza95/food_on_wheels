const ajvInstance = require("../../config/ajv-Instance");

const signupREQSchema = {
  type: "object",

  properties: {

    email: {
      type: "string",
      format: "email"
    },

    password: {
      type: "string",
      minLength: 8
    },

    accountType: {
      type: "string",
      enum: ["user", "vendor"]
    },

    privacyPolicyConsent: {
      type: "boolean"
    },

    termsOfServiceConsent: {
      type: "boolean"
    },

    marketingConsent: {
      type: "boolean"
    },

    aiProcessingConsent: {
      type: "boolean"
    }

  },

  required: [
    "email",
    "password",
    "accountType",
    "privacyPolicyConsent",
    "termsOfServiceConsent",
    "marketingConsent",
    "aiProcessingConsent"
  ],

  additionalProperties: false
};

module.exports = ajvInstance.compile(signupREQSchema);