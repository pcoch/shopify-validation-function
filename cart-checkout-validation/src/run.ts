import type {
  RunInput,
  FunctionRunResult,
  FunctionError,
} from "../generated/api";
const lookup = require("country-code-lookup");

export function run(input: RunInput): FunctionRunResult {
  const countryCode = input.cart.deliveryGroups[0]?.deliveryAddress.countryCode; //Shipping country code at checkout
  const countryData = lookup.byIso(countryCode); //Convert code to country name
  const shippingCountry = countryData.country;

  //Check line items for restricted destinations
  const errors = input.cart.lines
    .filter((line) => {
      const cantShipTo = JSON.parse(line.merchandise.product.metafield?.value); //Countries
      return cantShipTo.includes(countryCode);
    })
    .map((line) => {
      return {
        localizedMessage: `${line.merchandise.product.title} cannot be delivered to ${shippingCountry}.`,
        target: "$.cart.deliveryGroups[0].deliveryAddress.countryCode",
      };
    });
  return {
    errors,
  };
}
