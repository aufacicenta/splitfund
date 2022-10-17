import { useEffect, useState } from "react";

import { PropertyCard } from "./PropertyCard";
import { PropertyCardContainerProps, PropertyCardProps } from "./PropertyCard.types";

export const PropertyCardContainer = ({ id }: PropertyCardContainerProps) => {
  const [property, setProperty] = useState<PropertyCardProps["property"] | undefined>(undefined);

  const data: Array<PropertyCardProps["property"]> = [
    {
      id: "1",
      title: "A property",
      shortDescription: "short description",
      description: "description",
      featuredImage: {
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      },
      gallery: [{ url: "url" }],
      fundingGoal: "$250,000",
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
