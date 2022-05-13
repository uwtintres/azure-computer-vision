# azure-computer-vision
## Introduction
**azure-computer-vision** is a collection of nodes that perform computer vision services from [Microsoft Azure Computer Vision Services](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/).

### Features:
These features are currently supported:
1. Analyze images with multiple features(Tags, Color... etc.)
2. Describe image.
3. Detect objects.
4. Get area of interest.
5. Image optical character recognition(OCR).

## Installation
`npm install @intres/azure-computer-vision`
## Example usage
The example flow is as follows:

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/example.png?raw=true)

In this example, The node will output the corresponding objects of the chosen service. The chosen service here is "analyze image", and the features we want to include
is "Tags,Colors". Features should be comma separated if more than one is provided.

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/response.png?raw=true)

The output format is exactly from the official API document and is passed to the next node for further usage.