import { useEffect, useState } from "react";

import { PropertyCard } from "./PropertyCard";
import { PropertyCardContainerProps, PropertyCardProps } from "./PropertyCard.types";

export const PropertyCardContainer = ({ id }: PropertyCardContainerProps) => {
  const [property, setProperty] = useState<PropertyCardProps["property"] | undefined>(undefined);

  const data: Array<PropertyCardProps["property"]> = [
    {
      id: "splitfund-3-d7ce.factory.splitfund.testnet",
      title: "Bajareque, Department 22",
      shortDescription:
        "Own a share of Bajareque, Department 22, in the Yucatecan coast of Mexico. Available to you starting at 50.00 USDT.e/NEAR using Splitfund's co-ownership protocol built on NEAR.",
      description: "description",
      featuredImage: {
        url: "https://splitfund.infura-ipfs.io/ipfs/QmUnKwr7GpmfPNXayo2Jcibhy3xwJqM74r5HSPkhua3KKR/63587a415d96b_753888884c.jpeg",
      },
      gallery: [{ url: "url" }],
      fundingGoal: "$291,564.00",
      amountFunded: "$150,000",
      numberOfBackers: 120,
    },
  ];

  useEffect(() => {
    (() => {
      setProperty(data[0]);
    })();
  }, [id]);

  if (!property) {
    return <>template</>;
  }

  return <PropertyCard property={property} />;
};
