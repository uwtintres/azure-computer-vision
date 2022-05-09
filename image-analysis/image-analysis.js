const ImageAnalysisDriver = require('./image-analysis-driver');
const ImageAnalysisDescribe = require('./image-analysis-describe');
const ImageAnalysisObjDetect = require('./image-analysis-obj-detect');
const ImageAnalysisGetInterest = require('./image-analysis-get-interest');

module.exports = function(RED) {
    function translation(config) {
        RED.nodes.createNode(this, config);
        this.on('input', async (msg) => {
            try {
                this.SERVICE_ID = {
                    ANALYZE_IMAGE: 1,
                    DESCRIBE_IMAGE: 2,
                    DETECT_OBJECTS: 3,
                    GET_AREA_OF_INTEREST: 4,
                }

                const options = {
                    inputMode: config.inputMode,
                    imageFilePath: config.imageFilePath,
                    imageUrl: config.imageUrl,
                    features: config.features,
                };
                let driver;

                switch (parseInt(config.serviceType)) {
                    case this.SERVICE_ID.ANALYZE_IMAGE: {
                        driver = new ImageAnalysisDriver(this, this.credentials.key, this.credentials.region);
                        break
                    }

                    case this.SERVICE_ID.DESCRIBE_IMAGE: {
                        driver = new ImageAnalysisDescribe(this, this.credentials.key, this.credentials.region);
                        break
                    }

                    case this.SERVICE_ID.DETECT_OBJECTS: {
                        driver = new ImageAnalysisObjDetect(this, this.credentials.key, this.credentials.region);
                        break
                    }

                    case this.SERVICE_ID.GET_AREA_OF_INTEREST: {
                        driver = new ImageAnalysisGetInterest(this, this.credentials.key, this.credentials.region);
                        break
                    }
                }

                const res = await driver.run(options);
                this.status({});
                this.send({ payload: res });
            } catch (e) {
                // Clear status in the node
                this.status({});
                // Send error to catch node, original msg object must be provided
                this.error(e?.response?.data?.message || e.message, msg);
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
