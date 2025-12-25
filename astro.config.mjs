import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions'; // <-- add this

export default defineConfig({
  output: 'server',              // or 'hybrid' if the starter used that
  adapter: netlify(),            // <-- add this
  // keep the rest of your config (integrations, etc.)
});
