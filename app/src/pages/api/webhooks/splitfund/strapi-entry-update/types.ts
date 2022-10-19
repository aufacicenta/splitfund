export type Metadata = {
  id: string;
  expires_at: number;
  funding_amount_limit: number;
  unpaid_amount: number;
  nep_141: string;
  maintainer_account_id: string;
  metadata_url: string;
};

export type Fees = {
  percentage: number;
  balance: number;
};

export type FungibleTokenMetadata = {
  spec: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type StableEscrowProps = {
  metadata: Metadata;
  fees: Fees;
  fungible_token_metadata: FungibleTokenMetadata;
};

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
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: unknown;
  provider: string;
  provider_metadata?: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export type Price = {
  id: number;
  value: number;
};

export type Token = {
  id: number;
  address: string;
  symbol: string;
  decimals: number;
};

export type Gallery2 = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats?: unknown;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: unknown;
  provider: string;
  provider_metadata?: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export type Owner = {
  id: number;
  name: string;
  url: string;
  gallery: Gallery2[];
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
