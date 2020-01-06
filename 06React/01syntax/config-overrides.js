const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
    // antd按需加载
    config = injectBabelPlugin(
        ["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }],
        config
    );

    // 把装饰器写法编译成ES5
    config = injectBabelPlugin(
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        config
    );
    
    return config;
};