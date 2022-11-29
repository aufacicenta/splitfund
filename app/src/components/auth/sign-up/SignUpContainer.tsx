import dynamic from "next/dynamic";

import { SignUpProps } from "./SignUp.types";

const SignUp = dynamic<SignUpProps>(() => import("./SignUp").then((mod) => mod.SignUp), { ssr: false });

export const SignUpContainer = () => <SignUp />;
