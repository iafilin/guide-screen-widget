module.exports = {
    filenameHashing: false,
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
    },
    css: { extract: false }
};
