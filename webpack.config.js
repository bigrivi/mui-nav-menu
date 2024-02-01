const { resolve } = require("path");

module.exports = {
    resolve: {
        alias: {
            "mui-nav-menu": resolve(__dirname, "src/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|tsx?)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
};
