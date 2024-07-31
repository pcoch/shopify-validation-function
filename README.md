# shopify-validation-function

Validation Function to restrict 

Demo Video: https://screenshot.click/30-15-mf5pu-srsih.mp4

The Function reads the licenses metafield on each cart line item.

If a line item metafield includes a country that matches the shipping country in checkout, then the Function will render a warning message and block checkout.

Staff can add a country ISO code to the product metafield, which is a list of single line strings ["AU", "US"]. There shouldn't be a need for touching code with this Function.

See run.ts and run.graphql in src for code 👀
