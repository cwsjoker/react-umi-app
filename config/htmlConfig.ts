import { defineConfig } from 'umi';
const htmlConfig = defineConfig({
    title: 'myapp',
    metas: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        { "http-equiv": "Expires", content: "0" },
        { "http-equiv": "Pragma", content: "no-cache" },
        { "http-equiv": "Cache-control", content: "no-cache" },
        { "http-equiv": "Cache", content: "no-cache" },
    ]
})

export default htmlConfig