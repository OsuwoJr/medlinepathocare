/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO Optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Headers for SEO and Security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: (() => {
              const isDevelopment = process.env.NODE_ENV === 'development';
              
              // In development, Next.js uses eval() for Hot Module Replacement (HMR)
              // In production, Next.js pre-compiles everything and doesn't use eval()
              const scriptSrc = isDevelopment
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://wa.me"
                : "script-src 'self' 'unsafe-inline' https://wa.me";
              
              return [
                "default-src 'self'",
                scriptSrc,
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https:",
                "font-src 'self' data: https://fonts.gstatic.com",
                "connect-src 'self' https://formspree.io https://wa.me https://*.supabase.co wss://*.supabase.co",
                "frame-ancestors 'self'",
              ].join('; ');
            })()
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
