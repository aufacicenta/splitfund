export type PropertyCardContainerProps = {
  id: string;
};

export type PropertyCardProps = {
  className?: string;
  property: {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    featuredImage: {
      url: string;
    };
    gallery: Array<{
      url: string;
    }>;
    fundingGoal: string;
    amountFunded: string;
    numberOfBackers: number;
  };
};
