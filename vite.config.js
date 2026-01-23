/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // When deployed as a GitHub Pages project site, set base to the repo name.
  // Use the exact repository name (case-sensitive) — repo is `shopper` so use lowercase.
  base: process.env.VERCEL ? '/' : '/shopper/',
  plugins: [react()],
})
