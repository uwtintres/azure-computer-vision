const sdk = require('@azure/cognitiveservices-computervision');
const path = require('path');
const fs = require('fs');
const axios = require('axios').default;

class ImageAnalysisDriver {
    #node;
    #key;
    #region;

    constructor(node, key, region) {
        // super();
        this.#node = node;
        this.#key = key;
        this.#region = region;
        this.INPUT_MODE  = {
            file: 'file',
            url: 'url',
        };
    }

    checkInputMode({ inputMode, imageFilePath, imageUrl }) {
        if (inputMode === this.INPUT_MODE.url ) {
            if (!imageUrl) throw new Error('imageUrl must not be empty');
        } else {
            if (!imageFilePath || !path.isAbsolute(imageFilePath)) throw new Error('Image file path must be a string of an absolute path to local file system');
        }
    }

    async analyze(options) {
        // Test input mode
        this.checkInputMode(options);

        let config, data;
        if (options.inputMode === this.INPUT_MODE.url) {
            // console.log(options, this.#key)
            config = {
                headers: {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key": this.#key
                }
            }

            data = {
                "url": options.imageUrl
            }
        } else {
            config = {
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Ocp-Apim-Subscription-Key": this.#key
                }
            }

            data = fs.readFileSync(options.imageFilePath);
            if (data.length === 0) throw new Error('The image file provided is empty, recognition aborted');
        }

        return this.#analyzeInternal({
            ...options,
            config,
            data
        });
    }

    async run(options) {
        try {
            return await this.analyze(options);
        } catch (e) {
            throw e;
        }
    }

    async #analyzeInternal({ features, config, data }) {
        this.#node.status({ fill: 'green', shape: 'dot', text: 'starting' });
        try {
            console.log(config);
            const res = await axios.post(`https://westus.api.cognitive.microsoft.com/vision/v3.2/analyze?visualFeatures=Tags`, data, config);
            console.log(res.data.tags);
        } catch(e) {
            // console.log(e);
        }
    }

    #recognizing(source, e) {
        this.#node.status({ fill: 'yellow', shape: 'dot', text: 'recognizing...'});
    }
}

module.exports = ImageAnalysisDriver;
