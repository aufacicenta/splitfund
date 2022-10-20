import { PropertyPrice } from "api/codegen";
import { Property as StrapiProperty } from "api/codegen/strapi";

export type Property = StrapiProperty & {
  price: PropertyPrice;
};
