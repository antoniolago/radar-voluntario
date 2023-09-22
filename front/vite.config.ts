import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import mkcert from 'vite-plugin-mkcert'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  envDir: '../',
  resolve: {
    alias: [
      { find: 'react-query/devtools', replacement: 'react-query/es/devtools/index'},
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  server: {
    host: true,
    https: true,
    port: +process.env.FRONTEND_PORT
  }
})
