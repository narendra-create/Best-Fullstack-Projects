/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // allow all (dev mode only)
            },
        ],
    },
};

export default nextConfig;
