type RouteMap = {
  realEstate: {
    solana: {
      properties: string;
      property: (tokenMetadataId: string) => string;
      listProperty: string;
    };
  };
  auth: {
    signIn: string;
  };
  api: {
    getCheckoutURL: string;
    auth: string;
    graphql: string;
  };
  invest: {
    grid: string;
    map: string;
    data: string;
  };
  campaign: (campaignSlug: string) => string;
  property: {
    preview: (responseId: string) => string;
    details: (contractAddress: string) => string;
  };
  properties: {
    explorer: () => string;
    my: () => string;
  };
  home: string;
  notFound: string;
};

export const routes: RouteMap = {
  realEstate: {
    solana: {
      properties: "/real-estate/solana",
      property: (tokenMetadataId: string) => `/real-estate/solana/property?tokenMetadataId=${tokenMetadataId}`,
      listProperty: "/real-estate/solana/list-property",
    },
  },
  auth: {
    signIn: "/a",
  },
  api: {
    getCheckoutURL: `/api/getCheckoutURL`,
    auth: `/api/auth`,
    graphql: `/api/graphql`,
  },
  invest: {
    grid: "/i",
    map: "/i/map",
    data: "/i/data",
  },
  home: "/",
  notFound: "/404",
  campaign: (campaignSlug) => `/c/${campaignSlug}`,
  property: {
    preview: (responseId) => `/p/preview?responseId=${responseId}`,
    details: (contractAddress: string) => `/p/${contractAddress}`,
  },
  properties: {
    explorer: () => `/p/explorer`,
    my: () => `/p/my`,
  },
};

export const useRoutes: () => RouteMap = () => routes;
