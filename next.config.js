/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "i.ibb.co",
      "i.ibb.co.com",
      "i.imghippo.com",
      "localhost",
      "3.0.18.58",
      "54.179.147.74",
      "127.0.0.1",
      "drive.google.com",
    ],
  },
  publicRuntimeConfig: {
    IFRAME_URL: process.env.IFRAME_URL || "http://localhost:3000/", // Fallback to localhost if env variable is not set
  },
};

module.exports = nextConfig;
