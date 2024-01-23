import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
	build: {
		target: "modules",
		minify: true,
		rollupOptions: {
			input: ["./src/index.ts"],
			output: [
				{
					format: "es",
					entryFileNames: "[name].js",
					preserveModules: true,
					preserveModulesRoot: "src",
					dir: "dist/es",
        },
				{
					format: "cjs",
					entryFileNames: "[name].js",
					preserveModules: true,
					preserveModulesRoot: "src",
					dir: "dist/cjs",
        },
        {
          format: "iife",
          name: "LogicalRuleComputation",
          entryFileNames: "[name].js",
          preserveModules: false,
					preserveModulesRoot: "src",
					dir: "dist/iife",
				},
			],
    },
    lib: {
      entry: "./src/index.ts",
    }
	},
});
