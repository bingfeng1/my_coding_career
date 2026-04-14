import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const _path = (...src) => {
    return path.resolve(__dirname, ...src)
}

export default defineConfig({
    resolve: {
        alias: {
            apis: _path('src/api'),
            comps: _path('src/components'),
            pages: _path('src/pages'),
            utils: _path('src/utils'),
            stores: _path('src/store'),
            '@': _path('src')
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
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: {
                    host: 'localhost',
                    port: 3000
                }
            }
        }
    }
})