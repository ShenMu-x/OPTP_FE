import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// 获取绝对路径
function pathResolve(dir:string){
    return resolve(__dirname, '.',dir);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '/@': pathResolve('src'),
        }
    },
    optimizeDeps: {
    }
});
