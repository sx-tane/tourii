/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
export default {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'maps.googleapis.com',
                pathname: '/maps/api/place/photo**',
            },
            {
                protocol: 'https',
                hostname: 'pub-ff346cb892954c35be4cd7939d054cd1.r2.dev',
            },
            {
                protocol: 'https',
                hostname: 'places.googleapis.com',
            },
        ],
    },
};