import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import geojson from "rollup-plugin-geojson"
import AutoImport from "unplugin-auto-import/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), AutoImport({ imports: ["react"], dts: true }), geojson()],
})
