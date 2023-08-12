import { Redirect, Route, Router } from "react-router-dom";
import {
  IonApp,
  IonHeader,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { add, home, compass } from "ionicons/icons";
import Home from "./pages/app/Home";
import Create from "./pages/app/Create";
import Explore from "./pages/app/Explore";

import LandingPage from "./pages/LandingPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/tailwind.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ClerkLoading,
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { ENV } from "./env.dev";
import { HeaderComponent } from "./components/HeaderComponent";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { LoadingComponent } from "./components/LoadingComponent";

setupIonicReact();

const App: React.FC = () => {
  if (Capacitor.isNative) {
    window.open = (async (url: string) =>
      Browser.open({
        url,
        presentationStyle: "popover",
        toolbarColor: "#fffff",
        height: 50,
      })) as any;
  }

  return (
    <ClerkProvider
      publishableKey={ENV.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--ion-color-primary"),
          colorSuccess: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--ion-color-success"),
          colorDanger: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--ion-color-danger"),
          colorBackground: getComputedStyle(
            document.documentElement
          ).getPropertyValue(
            window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "--ion-color-dark"
              : "--ion-color-light"
          ),
          colorText: getComputedStyle(
            document.documentElement
          ).getPropertyValue(
            window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "--ion-color-light"
              : "--ion-color-dark"
          ),
          colorTextOnPrimaryBackground: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--ion-color-dark"),
          colorWarning: getComputedStyle(
            document.documentElement
          ).getPropertyValue("--ion-color-warning"),
          colorAlphaShade: getComputedStyle(
            document.documentElement
          ).getPropertyValue(
            window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "--ion-color-light"
              : "--ion-color-dark"
          ),
        },
      }}
    >
      <IonApp>
        <IonReactRouter>
          <ClerkLoading>
            <LoadingComponent />
          </ClerkLoading>
          <SignedIn>
            <HeaderComponent />
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path={["/home", "/create", "/explore"]}>
              <IonTabs>
                <IonRouterOutlet>
                  <Route path="/home" exact>
                    <Home />
                  </Route>
                  <Route path="/create" exact>
                    <Create />
                  </Route>
                  <Route path="/explore" exact>
                    <Explore />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="home" href="/home">
                    <IonIcon aria-hidden="true" icon={home} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="create" href="/create">
                    <IonIcon aria-hidden="true" icon={add} />
                  </IonTabButton>
                  <IonTabButton tab="explore" href="/explore">
                    <IonIcon aria-hidden="true" icon={compass} />
                    <IonLabel>Explore</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </Route>
          </SignedIn>
          <SignedOut>
            <Route path={["/", "/redirectTo/:page", "/redirectTo"]} exact>
              <LandingPage />
            </Route>
          </SignedOut>
        </IonReactRouter>
      </IonApp>
    </ClerkProvider>
  );
};

export default App;
