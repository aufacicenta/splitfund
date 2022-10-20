import Head from "next/head";
import { useState } from "react";

import ipfs from "providers/ipfs";

import { PropertyDetailsContainerProps } from "./PropertyDetails.types";
import { PropertyDetails } from "./PropertyDetails";

export const PropertyDetailsContainer = ({ property }: PropertyDetailsContainerProps) => {
  const [isContractDataLoading] = useState(false);

  return (
    <>
      <Head>
        <title>{property.title}</title>
        <meta name="description" content={property.shortDescription} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.shortDescription} />
        <meta property="og:image" content={ipfs.asHttpsURL(property.gallery[0]?.url)} />
      </Head>
      <PropertyDetails property={property} isContractDataLoading={isContractDataLoading} />
    </>
  );
};
