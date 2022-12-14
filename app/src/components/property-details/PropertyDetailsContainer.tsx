import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";

import ipfs from "providers/ipfs";

import { PropertyDetailsContainerProps, PropertyDetailsProps } from "./PropertyDetails.types";

const PropertyDetails = dynamic<PropertyDetailsProps>(
  () => import("./PropertyDetails").then((mod) => mod.PropertyDetails),
  {
    ssr: false,
  },
);

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
