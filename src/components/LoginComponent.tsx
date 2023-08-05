import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser";
import { SIGN_IN_URL } from "../properties";

export const LoginComponent = () => {
  const browser = InAppBrowser.create(SIGN_IN_URL, "_self");

  return <></>;
};
