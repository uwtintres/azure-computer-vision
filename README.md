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

Most of the parameters of these nodes are supported. For more information about all the settings and output format, please refer to the individual tab of the service in [official API document](https://westus.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-2/operations/56f91f2e778daf14a499f21b).

## Installation
`npm install @intres/azure-computer-vision`
## Example usage
The example flow is as follows:

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/example.png?raw=true)

In this example, The node will output the corresponding objects of the chosen service. The chosen service here is "analyze image", and the features we want to include
is "Tags,Colors". Features should be comma separated if more than one is provided.

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/response.png?raw=true)

The output format is exactly from the official API document and is passed to the next node for further usage.