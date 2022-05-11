# azure-computer-vision
## Introduction
**azure-cognitive** is a collection of nodes that perform computer vision services from [Microsoft Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/).
## Installation
`npm install @intres/azure-computer-vision`
## Example usage
The example flow is as follows:

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/example.png?raw=true)

In this example, The node will output the corresponding objects of the chosen service. The chosen service here is "analyze image", and the features we want to include
is "Tags,Colors". Features should be comma separated if more than one is provided.

![Example flow](https://github.com/uwtintres/azure-computer-vision/blob/main/img/response.png?raw=true)

The output format is exactly from the official API document and is passed to the next node for further usage.