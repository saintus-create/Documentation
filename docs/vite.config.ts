import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { minimatch } from "minimatch";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { build } from "./scripts/build-registry.js";
import { visualizer } from "rollup-plugin-visualizer";
import { enhancedImages } from "@sveltejs/enhanced-img";
import packageJson from "./package.json" with { type: "json" };

// don't build when we're running `vite preview`
if (!process.argv.includes("preview")) {
	console.log("Building registry...");
	await buildRegistry();
	console.log("Registry built.");
}

const __dirname = fileURLToPath(new URL(".", import.meta.url));
export const veliteDirPath = path.join(__dirname, ".velite");
export const staticDirPath = path.join(__dirname, "src/registry/json");
export const contentDirPath = path.join(__dirname, "content");
export const ogDirPath = path.join(__dirname, "src/routes/og");

export default defineConfig({
	plugins: [
		visualizer({
			emitFile: true,
			filename: "stats.html",
			gzipSize: true,
			brotliSize: true,
		}),
		tailwindcss(),
		enhancedImages(),
		sveltekit(),
		{
			name: "registry-builder",
			enforce: "pre",
			async watchChange(id) {
				if (!minimatch(id, "**/src/lib/registry/**")) return;
				this.info("Registry file updated. Rebuilding registry...");
				await buildRegistry();
				this.info("Registry built.");
			},
		},
	],
	server: {
		fs: {
			allow: [veliteDirPath, staticDirPath, contentDirPath, ogDirPath],
		},
	},
	build: {
		target: "esnext",
		minify: "terser",
		cssMinify: "lightningcss",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ["console.log", "console.info", "console.debug"],
			},
			format: {
				comments: false,
			},
		},
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Vendor chunks
					if (id.includes("node_modules")) {
						// Icons
						if (id.includes("@lucide/svelte") || id.includes("@tabler/icons-svelte")) {
							return "icons";
						}
						// UI Libraries
						if (id.includes("bits-ui") || id.includes("formsnap") || id.includes("mode-watcher")) {
							return "ui-libs";
						}
						// Charts
						if (id.includes("layerchart") || id.includes("d3-")) {
							return "charts";
						}
						// Carousel/DND
						if (id.includes("embla-carousel") || id.includes("@dnd-kit")) {
							return "interactions";
						}
						// Form handling
						if (id.includes("sveltekit-superforms") || id.includes("zod")) {
							return "forms";
						}
						// Utilities
						if (
							id.includes("clsx") ||
							id.includes("tailwind-merge") ||
							id.includes("tailwind-variants")
						) {
							return "utils";
						}
						// Everything else from node_modules
						return "vendor";
					}
					// Registry components
					if (id.includes("/registry/")) {
						return "registry";
					}
				},
				chunkFileNames: "chunks/[name]-[hash].js",
				entryFileNames: "entries/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
			},
		},
		sourcemap: false,
		reportCompressedSize: true,
		chunkSizeWarningLimit: 1000,
	},
	optimizeDeps: {
		include: [
			"@lucide/svelte",
			"bits-ui",
			"clsx",
			"tailwind-merge",
			"tailwind-variants",
			"mode-watcher",
		],
		exclude: ["@sveltejs/kit"],
	},
	ssr: {
		noExternal: Object.keys(packageJson.devDependencies),
	},
});

async function buildRegistry() {
	await build();
	execSync("pnpm shadcn-svelte registry build --output static/registry", {
		stdio: ["pipe", "pipe", "inherit"],
	});
	fs.cpSync(path.resolve("static", "registry"), path.resolve("src", "__registry__", "json"), {
		recursive: true,
	});
}
