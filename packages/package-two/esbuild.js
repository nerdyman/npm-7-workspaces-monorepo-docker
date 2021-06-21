/* eslint-disable no-console, import/no-extraneous-dependencies, @typescript-eslint/no-require-imports */

const NodeResolve = require("@esbuild-plugins/node-resolve").default;
const { build } = require("esbuild");

(async () => {
	console.info("[esbuild] Running build 🚀");

	await build({
		bundle: true,
		entryPoints: ["./index.js"],
		keepNames: true,
		outdir: "dist",
		platform: "node",
		plugins: [
			NodeResolve({
				extensions: [".ts", ".js"],
				onResolved: (resolved) => {
					if (resolved.includes("node_modules")) {
						return {
							external: true,
						};
					}

					return resolved;
				},
			}),
		],
		sourcemap: true,
	}).catch((err) => {
		console.error("[esbuild] Build failed 😢", err);
		process.exit(1);
	});

	console.info("[esbuild] Done 🥳\n");
})();
