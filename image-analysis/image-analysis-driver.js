const sdk = require('@azure/cognitiveservices-computervision');
const path = require('path');
const fs = require('fs');
const axios = require('axios').default;

class ImageAnalysisDriver {
    #node;
    #key;
    #region;
    #supportedFeatures;

    constructor(node, key, region) {
        this.#node = node;
        this.#key = key;
        this.#region = region;
        this.#supportedFeatures = new Set([
            'Adult',
            'Brands',
            'Categories',
            'Color',
            'Description',
            'Faces',
            'ImageType',
            'Objects',
            'Tags',
        ]);

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

    checkFeatures(features) {
        const featuresArr = features.split(',');
        const supportedFeatures = Array.from(this.#supportedFeatures).join(', ');

        for (let i = 0; i < featuresArr.length; i++) {
            featuresArr[i] = featuresArr[i].trim();
            if (this.#supportedFeatures.has(featuresArr[i])) continue;
            throw new Error(`Feature ${featuresArr[i]} is not supported, supported features are: ${supportedFeatures}`);
        }

        return featuresArr.join(',');
    }

    async analyze(options) {
        // Test input mode
        this.checkInputMode(options);
        // Clean and check features
        options.features = this.checkFeatures(options.features);

        let config, data;
        if (options.inputMode === this.INPUT_MODE.url) {
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
        this.#node.status({ fill: 'green', shape: 'dot', text: 'recognizing' });
        const res = await axios.post(`https://${this.#region}.api.cognitive.microsoft.com/vision/v3.2/analyze?visualFeatures=${features}`, data, config);
        return res.data;
    }
}

module.exports = ImageAnalysisDriver;
