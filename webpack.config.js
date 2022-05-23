// module.exports = {
//     resolve: {
//         fallback: {
//             "querystring": require.resolve("querystring-es3"),
//             "timers": require.resolve("timers-browserify"),
//             "util": require.resolve("util/"),
//             "stream": require.resolve("stream-browserify")
//         },
//     }
// }

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    plugins: [
        new NodePolyfillPlugin()
    ]
}