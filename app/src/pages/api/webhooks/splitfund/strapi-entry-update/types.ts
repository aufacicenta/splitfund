import { PropertyPrice } from "api/codegen";

export type Thumbnail = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: unknown;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type Medium = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: unknown;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type Small = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: unknown;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type Large = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: unknown;
  width: number;
  height: number;
  size: number;
  url: string;
};

export type Formats = {
  thumbnail: Thumbnail;
  medium: Medium;
  small: Small;
  large: Large;
};

export type Gallery = {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  ext: string;
  mime: string;
  url: string;
};

export type Price = {
  id: number;
  value: number;
} & PropertyPrice;

export type Token = {
  id: number;
  address: string;
  symbol: string;
  decimals: number;
};

export type Owner = {
  id: number;
  name: string;
  url: string;
  gallery: Gallery[];
};

export type Location = {
  id: number;
  country: string;
  countryCode: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
};

export type Localization = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  locale: string;
  shortDescription?: string;
  longDescription?: string;
  category?: unknown;
  expirationDate: Date;
  createNEARContract: boolean;
};

// This type comes from the data sent to POST api/webhooks/splitfund/strapi-entry-update,
// if you update the Strapi CMS Property Collection, update this too.
// This is the source of truth for the PropertyDetails.tsx page and the StableEscrow.metadata_url
export type Property = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  expirationDate: Date;
  createNEARContract: boolean;
  gallery: Gallery[];
  price: Price;
  token: Token;
  owner: Owner;
  location: Location;
  localizations: Localization[];
};

export type StrapiPropertyEntry = {
  event: string;
  createdAt: Date;
  model: string;
  entry: Property;
};
