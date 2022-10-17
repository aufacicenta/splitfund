import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SignUpContainer } from "app/auth/sign-up/SignUpContainer";
import { AppLayout } from "layouts/app-layout/AppLayout";
import { AuthLayout } from "layouts/auth-layout/AuthLayout";

const Index: NextPage = () => (
  <AppLayout>
    <AuthLayout>
      <SignUpContainer />
    </AuthLayout>
  </AppLayout>
);

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  await i18n?.reloadResources();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "auth", "head"])),
    },
  };
};

export default Index;
