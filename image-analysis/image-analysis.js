const ImageAnalysisDriver = require('./image-analysis-driver');

module.exports = function(RED) {
    function translation(config) {
        RED.nodes.createNode(this, config);
        const imageAnalysisDriver = new ImageAnalysisDriver(this, this.credentials.key, this.credentials.region);
        this.on('input', async (msg) => {
            try {
                const options = {
                    inputMode: config.inputMode,
                    imgFilePath: config.imgFilePath,
                    imageUrl: config.imageUrl,
                    features: config.features,
                };
                const res = await imageAnalysisDriver.run(options);
                this.status({});
                this.send({ payload: res });
            } catch (e) {
                // Clear status in the node
                this.status({});
                // Send error to catch node, original msg object must be provided
                this.error(e.message, msg);
            }
        });
    }

    RED.nodes.registerType("img-analysis", translation, {
        credentials: {
            key: { type: 'password' },
            region: { type: 'text' }
        },
    });
}
