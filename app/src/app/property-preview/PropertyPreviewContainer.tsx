import { useRouter } from "next/router";

import { useRoutes } from "hooks/useRoutes/useRoutes";
import { GenericLoader } from "ui/generic-loader/GenericLoader";

import { PropertyPreview } from "./PropertyPreview";

export const PropertyPreviewContainer = () => {
  const router = useRouter();
  const routes = useRoutes();

  if (!router.isReady) {
    return <GenericLoader />;
  }

  const responseId = router.query?.responseId;

  if (!responseId) {
    router.push(routes.notFound);

    return null;
  }

  return <PropertyPreview responseId={responseId as string} />;
};
