import { useGetPropertyCardByResponseIdQuery } from "api/codegen";
import { useRouter } from "next/router";

import { useRoutes } from "hooks/useRoutes/useRoutes";
import { GenericLoader } from "ui/generic-loader/GenericLoader";

import { PropertyPreview } from "./PropertyPreview";

export const PropertyPreviewContainer = () => {
  const router = useRouter();
  const routes = useRoutes();

  const responseId = router.query?.responseId;

  const {
    data: getPropertyCardByResponseIdQueryData,
    error: getPropertyCardByResponseIdQueryError,
    loading: isGetPropertyCardByResponseIdQueryLoading,
  } = useGetPropertyCardByResponseIdQuery({
    variables: { input: { responseId: responseId as string } },
  });

  if (isGetPropertyCardByResponseIdQueryLoading) {
    return <GenericLoader />;
  }

  if (
    getPropertyCardByResponseIdQueryError ||
    (!isGetPropertyCardByResponseIdQueryLoading && !getPropertyCardByResponseIdQueryData?.getPropertyCardByResponseId)
  ) {
    router.push(routes.notFound);

    return null;
  }

  const property = getPropertyCardByResponseIdQueryData!.getPropertyCardByResponseId!;

  return <PropertyPreview property={property} />;
};
