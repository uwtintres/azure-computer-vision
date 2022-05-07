const axios = require('axios').default;
const ImageAnalysisBase = require('./image-analysis-base');

class ImageAnalysisGetInterest extends ImageAnalysisBase {

    constructor(node, key, region) {
        super(node, key, region);
    }

    preProcess(options) {}

    async analyzeInternal({ config, data }) {
        this.setStatus({ fill: 'green', shape: 'dot', text: 'detecting' });
        const res = await axios.post(`https://${this.getRegion()}.api.cognitive.microsoft.com/vision/v3.2/areaOfInterest`, data, config);
        return res.data;
    }
}

module.exports = ImageAnalysisGetInterest;
