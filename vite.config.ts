import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// 获取绝对路径
function pathResolve(dir:string){
    return resolve(__dirname, '.',dir);
}

// https://vitejs.dev/config/
// https://www.jianshu.com/p/fabbcc385ee6
// https://juejin.cn/post/7039879176534360077
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '/@': pathResolve('src'),
        },
        extensions: ['.mjs','.js','.ts','.jsx','.tsx','.json','.vue']
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
        minify: 'terser' // 混淆器，terser构建后文件体积更小
    },
    // 静态资源目录
    publicDir: 'public',
    
    // 本地运行配置，及反向代理配置
    // server: {
    //     cors: true, // 默认启用并允许任何源
    //     open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //     //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    //     proxy: {
    //         '/api': {
    //             target: 'http://192.168.99.223:3000',   //代理接口
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, '')
    //       }
    //     }
    // }
});
