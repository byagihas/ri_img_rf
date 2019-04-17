## Responsys Image Refresher
- - -
This script replaces the itemData of a Responsys clItem with itemData from a second clItem. This is useful if your image is caching for long periods of time and would rather not wait on support.

Additionally, if you need to keep the creative name the same this allows you to update the image with the new creative (base64) without caching issues.

NOTE: Please use at your own discretion, only use on creatives of the same file extension (.png to .png, .jpeg to .jpeg).

To run:

>node index.js authKey item1 item2

Where item1 is the image with the creative you'd like to use, and item2 is the image to be updated.