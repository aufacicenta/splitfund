import { useGetPropertyBySlugQuery } from "api/codegen";
import { useRouter } from "next/router";

import { GenericLoader } from "ui/generic-loader/GenericLoader";

import { PropertyDetails } from "./PropertyDetails";

export const PropertyDetailsContainer = () => {
  const router = useRouter();

  const { propertySlug } = router.query;

  const {
    data: getPropertyBySlugQueryData,
    error: getPropertyBySlugQueryError,
    loading: isGetPropertySlugQueryLoading,
  } = useGetPropertyBySlugQuery({ variables: { input: { slug: propertySlug as string } } });

  if (isGetPropertySlugQueryLoading) {
    return <GenericLoader />;
  }

  if (getPropertyBySlugQueryError || !getPropertyBySlugQueryData?.getPropertyBySlug?.content) {
    // @TODO redirect to generic error page

    return null;
  }

  const property = getPropertyBySlugQueryData.getPropertyBySlug;

  return <PropertyDetails property={property} />;
};
