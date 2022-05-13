const axios = require('axios').default;
const ImageAnalysisBase = require('../utilities/image-analysis-base');

class ImageAnalysisDescribe extends ImageAnalysisBase {

    constructor(node, key, region) {
        super(node, key, region);
    }

    preProcess(options) {}

    async analyzeInternal({ maxCandidate, language, config, data }) {
        this.setStatus({ fill: 'green', shape: 'dot', text: 'recognizing' });
        const res = await axios.post(`https://${this.getRegion()}.api.cognitive.microsoft.com/vision/v3.2/describe?maxCandidate=${maxCandidate}&language=${language}`, data, config);
        return res.data;
    }
}

module.exports = ImageAnalysisDescribe;
