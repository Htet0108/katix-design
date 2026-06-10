import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phones/other devices on your LAN to load /_next/* in dev.
  // Update the IP if your Mac's address changes (ipconfig getifaddr en0).
  allowedDevOrigins: ["192.168.1.37"],
};

export default nextConfig;
