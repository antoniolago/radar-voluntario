import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import mkcert from 'vite-plugin-mkcert'
import dotenv from 'dotenv'

// https://vitejs.dev/config/

dotenv.config({ path: '../.env' })
export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: [
      { find: 'react-query/devtools', replacement: 'react-query/es/devtools/index'},
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  server: {
    host: true,
    https: true,
    port: Number(process.env.FRONTEND_PORT)
  },
  envDir: '../'
})
