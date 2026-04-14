// vite.config.ts
import { defineConfig } from "file:///home/wxm/learn/project/my_coding_career/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.39_sass@1.99.0/node_modules/vite/dist/node/index.js";
import vue from "file:///home/wxm/learn/project/my_coding_career/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.21_@types+node@20.19.39_sass@1.99.0__vue@3.5.32_typescript@5.9.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///home/wxm/learn/project/my_coding_career/node_modules/.pnpm/unplugin-auto-import@0.17.8_@vueuse+core@12.0.0_typescript@5.9.3__rollup@4.60.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///home/wxm/learn/project/my_coding_career/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.29.2_rollup@4.60.1_vue@3.5.32_typescript@5.9.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///home/wxm/learn/project/my_coding_career/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.29.2_rollup@4.60.1_vue@3.5.32_typescript@5.9.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import path from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///home/wxm/learn/project/my_coding_career/front/vite.config.ts";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var _path = (...src) => {
  return path.resolve(__dirname, ...src);
};
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      apis: _path("src/api"),
      comps: _path("src/components"),
      pages: _path("src/pages"),
      utils: _path("src/utils"),
      stores: _path("src/store"),
      "@": _path("src")
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: {
          host: "localhost",
          port: 3e3
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eG0vbGVhcm4vcHJvamVjdC9teV9jb2RpbmdfY2FyZWVyL2Zyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eG0vbGVhcm4vcHJvamVjdC9teV9jb2RpbmdfY2FyZWVyL2Zyb250L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d4bS9sZWFybi9wcm9qZWN0L215X2NvZGluZ19jYXJlZXIvZnJvbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCdcblxuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcblxuY29uc3QgX3BhdGggPSAoLi4uc3JjKSA9PiB7XG4gICAgcmV0dXJuIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIC4uLnNyYylcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBhcGlzOiBfcGF0aCgnc3JjL2FwaScpLFxuICAgICAgICAgICAgY29tcHM6IF9wYXRoKCdzcmMvY29tcG9uZW50cycpLFxuICAgICAgICAgICAgcGFnZXM6IF9wYXRoKCdzcmMvcGFnZXMnKSxcbiAgICAgICAgICAgIHV0aWxzOiBfcGF0aCgnc3JjL3V0aWxzJyksXG4gICAgICAgICAgICBzdG9yZXM6IF9wYXRoKCdzcmMvc3RvcmUnKSxcbiAgICAgICAgICAgICdAJzogX3BhdGgoJ3NyYycpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdnVlKCksXG4gICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXVxuICAgICAgICB9KSxcbiAgICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXG4gICAgICAgIH0pXG4gICAgXSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICcvYXBpJzoge1xuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgICAgICAgICAgICAgcG9ydDogMzAwMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxTQUFTLG9CQUFvQjtBQUN6VixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxVQUFVO0FBQ2pCLFNBQVMscUJBQXFCO0FBTnNLLElBQU0sMkNBQTJDO0FBUXJQLElBQU0sWUFBWSxLQUFLLFFBQVEsY0FBYyx3Q0FBZSxDQUFDO0FBRTdELElBQU0sUUFBUSxJQUFJLFFBQVE7QUFDdEIsU0FBTyxLQUFLLFFBQVEsV0FBVyxHQUFHLEdBQUc7QUFDekM7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxNQUFNLE1BQU0sU0FBUztBQUFBLE1BQ3JCLE9BQU8sTUFBTSxnQkFBZ0I7QUFBQSxNQUM3QixPQUFPLE1BQU0sV0FBVztBQUFBLE1BQ3hCLE9BQU8sTUFBTSxXQUFXO0FBQUEsTUFDeEIsUUFBUSxNQUFNLFdBQVc7QUFBQSxNQUN6QixLQUFLLE1BQU0sS0FBSztBQUFBLElBQ3BCO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE9BQU87QUFBQSxNQUNILFFBQVE7QUFBQSxRQUNKLFFBQVE7QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNWO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
