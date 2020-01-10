const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        devtool: 'source-map'
    }
};
