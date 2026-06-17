const dotenv = require("dotenv");

const ENV =
  process.env.APP_ENV ||
  "development";

dotenv.config({
  path: `.env.${ENV}`
});

if (ENV === "development") {
  console.log("DEV");
}

if (ENV === "staging") {
  console.log("STAGING");
}

if (ENV === "production") {
  console.log("PROD");
}

console.log(`Running in ${ENV} mode`);
console.log(`Mongo URL: ${process.env.MONGO_URL}`);

module.exports = ENV;