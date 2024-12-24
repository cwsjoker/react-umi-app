import { defineConfig } from 'umi'
import { clientEnv, countryExtension } from './envConfig'
import htmlConfig from './htmlConfig';
import routes from './routes'

export default defineConfig({
    ...htmlConfig,
    routes: routes,
    npmClient: 'pnpm',
    define: {
        ...clientEnv,
    },

    // 启用集成tailwindcss插件
    tailwindcss: {},
    // 启用icons
    icons: {},
    plugins: ['@umijs/plugins/dist/tailwindcss'],

    // rem适配
    extraPostCSSPlugins: [
        require('postcss-pxtorem')({
            rootValue: 37.5,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['html'], // html 用lib-flexible设置字体
            replace: true,
            minPixelValue: 0,
            exclude: /node_modules/i,
        }),
    ],


    chainWebpack(config, { env, webpack }) {
        if (countryExtension) {
            const exts = config.resolve.extensions.values().map(x => [`${countryExtension}${x}`, x]).flat();
            config.resolve.extensions.clear();
            exts.forEach(x => config.resolve.extensions.add(x));
        }

        return config
    }
})


