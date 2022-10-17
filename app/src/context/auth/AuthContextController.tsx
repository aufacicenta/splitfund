import React, { useEffect, useState } from "react";
import { Session } from "@supabase/gotrue-js";
import { useRouter } from "next/router";
import { client as supabase } from "src/providers/supabase/client";
import { useTranslation } from "react-i18next";

import { useRoutes } from "hooks/useRoutes/useRoutes";
import { useToastContext } from "hooks/useToastContext/useToastContext";
import { Typography } from "ui/typography/Typography";

import { AuthContext } from "./AuthContext";
import { AuthContextControllerProps, AuthContextLoginValues } from "./AuthContext.types";

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  const routes = useRoutes();
  const toast = useToastContext();
  const { t } = useTranslation("common");

  useEffect(() => {
    const currentSession = supabase.auth.session();

    if (currentSession) {
      setSession(currentSession);
      setHasActiveSession(true);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, s) => {
      setSession(s);
      setHasActiveSession(true);

      if (event === "SIGNED_IN" && s?.user?.id) {
        try {
          await fetch(routes.api.auth, {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session: s }),
          });
        } catch (error) {
          console.log(error);
        }
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [routes.api.auth]);

  const handleLogin = async ({ email }: AuthContextLoginValues) => {
    try {
      setIsLoading(true);

      if (!email) {
        throw new Error("Invalid email");
      }

      const { error } = await supabase.auth.signIn(
        { email },
        { redirectTo: (router.query.redirectTo as string) || routes.home },
      );

      if (error) {
        throw new Error(error.message);
      }

      setIsLoading(false);

      // @TODO i18n
      toast.trigger({
        variant: "confirmation",
        title: t("authContextController.success.signInConfirmation.title"),
        withTimeout: false,
        children: <Typography.Text>{t("authContextController.success.signInConfirmation")}</Typography.Text>,
      });
    } catch (_error) {
      setIsLoading(false);

      // @TODO log to error logger
      console.log(_error);

      // @TODO i18n
      toast.trigger({
        variant: "error",
        title: "Error",
        withTimeout: false,
        children: <Typography.Text>{t("authContextController.error.signIn")}</Typography.Text>,
      });
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      if (router.asPath === routes.auth.signIn) {
        router.reload();
      } else {
        router.push(routes.auth.signIn);
      }
    } catch (error) {
      // @TODO log to error logger
      console.log(error);

      // @TODO i18n
      toast.trigger({
        variant: "error",
        title: "Error",
        withTimeout: false,
        children: <Typography.Text>No pudimos cerrar tu sesión. Intenta de nuevo.</Typography.Text>,
      });
    } finally {
      setIsLoading(false);

      // @TODO i18n
      toast.trigger({
        variant: "confirmation",
        title: "Sesión Terminada",
        withTimeout: false,
        children: <Typography.Text>Has cerrado sesión exitosamente.</Typography.Text>,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ handleLogin, isLoading, session, hasActiveSession, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
