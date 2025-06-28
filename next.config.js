/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
	turbopack: {
		resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "maps.googleapis.com",
				pathname: "/maps/api/place/photo**",
			},
			{
				protocol: "https",
				hostname: "pub-ff346cb892954c35be4cd7939d054cd1.r2.dev",
			},
			{
				protocol: "https",
				hostname: "places.googleapis.com",
			},
			{
				protocol: "https",
				hostname: "cdn.tourii.app",
			},
			{
				protocol: "https",
				hostname: "example.com",
			},
		],
		formats: ["image/webp", "image/avif"],
	},
	experimental: {
		optimizePackageImports: ["leaflet", "framer-motion", "@heroicons/react"],
	},
	// Bundle optimization for admin routes
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// Split admin components into separate chunks
			config.optimization.splitChunks = {
				...config.optimization.splitChunks,
				cacheGroups: {
					...config.optimization.splitChunks.cacheGroups,
					admin: {
						name: "admin",
						test: /[\\/]src[\\/]components[\\/]admin[\\/]/,
						chunks: "all",
						priority: 10,
					},
					adminHooks: {
						name: "admin-hooks",
						test: /[\\/]src[\\/]hooks[\\/]admin[\\/]/,
						chunks: "all",
						priority: 9,
					},
				},
			};
		}
		return config;
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
};

export default withBundleAnalyzer(config);
