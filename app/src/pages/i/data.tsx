import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { AuthLayout } from "layouts/auth-layout/AuthLayout";

const Data: NextPage = () => (
  <AppLayout>
    <AuthLayout>
      {/* @TODO Business Data Table Implementation */}
      <></>
    </AuthLayout>
  </AppLayout>
);

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  await i18n?.reloadResources();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "i", "head"])),
    },
  };
};

export default Data;
