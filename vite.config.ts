import { defineConfig } from 'vite';
import path from "path";
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// https://www.jianshu.com/p/fabbcc385ee6
// https://juejin.cn/post/7039879176534360077

// https://juejin.cn/post/6933463466111926286#heading-0
// const prefix = `monaco-editor/esm/vs`;

export default defineConfig({
    base: '/',
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // 强制预构建插件包
    optimizeDeps: {
        // include: ['axios'],
    },
    // 打包配置
    build: {
        target: 'modules',
        outDir: 'dist', //指定输出路径
        assetsDir: 'assets', // 指定生成静态资源的存放路径
        minify: 'terser', // 混淆器，terser构建后文件体积更小
    },
    // 静态资源目录
    publicDir: 'public',
});
