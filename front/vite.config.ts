import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import dotenv from 'dotenv'
import basicSsl from '@vitejs/plugin-basic-ssl'
dotenv.config({ path: '../.env' })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
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
