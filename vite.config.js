import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import geojson from "rollup-plugin-geojson"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), geojson()],
})
