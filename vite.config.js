import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import geojson from "rollup-plugin-geojson"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
const path = require("path")
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		AutoImport({
			imports: ["react"],
			dts: true,
		}),
		geojson(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@data": path.resolve(__dirname, "./src/data"),
			"@stores": path.resolve(__dirname, "./src/stores"),
			"@layers": path.resolve(__dirname, "./src/layers"),
		},
	},
})
