const withPWA = require('next-pwa');

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  // pwa: {
  //   dest: 'public',
  //   disable: process.env.NODE_ENV === 'development',
  //   register: true,
  //   skipWaiting: true,
  // },
  images: {
    domains: [`${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`],
  },
  env: {
    appUrl: process.env.APP_URL,
    databaseUrl: process.env.DATABASE_URL,
    sendgridApi: process.env.SENDGRID_API,
    venmoClientId: process.env.VENMO_CLIENT_ID,
    venmoClientSecret: process.env.VENMO_CLIENT_SECRET,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
