import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { SubmitPropertyContainer } from "app/property-preview/submit-property/submit-property/SubmitPropertyContainer";

const Submit: NextPage = () => (
  <AppLayout>
    <SubmitPropertyContainer />
  </AppLayout>
);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  await i18n?.reloadResources();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "head", "property-submission"])),
    },
  };
}

export default Submit;
