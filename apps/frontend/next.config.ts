const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const ENV = process.env.NODE_ENV || "development";
const envFiles = [`.env.${ENV}.local`, `.env.${ENV}`, `.env.local`, `.env`];
let envPath = null;

for (const file of envFiles) {
  const fullPath = path.resolve(__dirname, "../../", file);
  if (fs.existsSync(fullPath)) {
    envPath = fullPath;
    break;
  }
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

module.exports = nextConfig;
