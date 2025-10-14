import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    // 🧠 Cho phép load ảnh từ các domain ngoài
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
      // ⚙️ Thêm các domain khác nếu cần (VD: Cloudinary, Unsplash, v.v.)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol:"https",
        hostname:"images.unsplash.com",
        port:"",
        pathname:"/**"
      },
      {
        protocol: "https",
        hostname: "vnpa.moh.gov.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scr.vn",
        port: "",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "openend.vn",
        port: "",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "www.citd.vn",
        port: "",
        pathname: "/**",
      },
         {
        protocol: "https",
        hostname: "timo.vn",
        port: "",
        pathname: "/**",
      },
         {
        protocol: "https",
        hostname: "www.pace.edu.vn",
        port: "",
        pathname: "/**",
      },
         {
        protocol: "https",
        hostname: "ibom.vn",
        port: "",
        pathname: "/**",
      },
         {
        protocol: "https",
        hostname: "www.tailieusieucap.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.tgdd.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "random.com.vn",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
