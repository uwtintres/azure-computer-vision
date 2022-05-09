const axios = require('axios').default;
const ImageAnalysisBase = require('../utilities/image-analysis-base');

class ImageOcrDriver extends ImageAnalysisBase {

    constructor(node, key, region) {
        super(node, key, region);
    }

    preProcess(options) {}

    async analyzeInternal({ config, data }) {
        this.setStatus({ fill: 'green', shape: 'dot', text: 'detecting' });
        const res = await axios.post(`https://${this.getRegion()}.api.cognitive.microsoft.com/vision/v3.0/ocr?language=unk`, data, config);
        return res.data;

    }
}

module.exports = ImageOcrDriver;
