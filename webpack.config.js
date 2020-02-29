const path = require("path");
module.exports = {
    entry: "./www/src/js/index.js",
    output: {
        path: path.resolve(__dirname, "www/dist"),
        filename: "./bundle.js"
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.js"
        }
    },
    mode: "development",
};