import { Redirect, Route, Router } from "react-router-dom";
import {
  IonApp,
  IonHeader,
  IonIcon,
  IonLabel,
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
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/app/Tab1";
import Tab2 from "./pages/app/Tab2";
import Tab3 from "./pages/app/Tab3";

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
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ENV } from "./env.dev";
import { HeaderComponent } from "./components/HeaderComponent";
import { NotFoundComponent } from "./components/NotFoundComponent";
import { useEffect } from "react";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    // Add click event listeners to all anchor links in the document
    const anchorLinks = document.getElementsByTagName("a");
    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", handleAnchorClick);
    }

    // Clean up the event listeners when the component unmounts
    return () => {
      for (let i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].removeEventListener("click", handleAnchorClick);
      }
    };
  }, []);

  const handleAnchorClick = (event: any) => {
    const targetUrl = event.target.href;

    if (targetUrl.startsWith("http") || targetUrl.startsWith("https")) {
      // External link, open in in-app browser
      console.log("NIGGAS IN PARIS");
      const options =
        "location=yes,hidden=no,clearcache=yes,clearsessioncache=yes";
      InAppBrowser.create(targetUrl, "_blank", options);
      event.preventDefault(); // Prevent default behavior of anchor click
    }

    // Listen for Clerk's attempt to open a window
    const openWindowListener = (event: any) => {
      event.preventDefault(); // Prevent default behavior

      const options =
        "location=yes,hidden=no,clearcache=yes,clearsessioncache=yes";
      // Use InAppBrowser (or Capacitor's Browser plugin) to open the link
      InAppBrowser.create(event.detail.url, "_blank", options);
    };

    window.addEventListener("clerk.open.window", openWindowListener);

    window.addEventListener("beforeunload", (event: BeforeUnloadEvent) => {
      console.log("WHO S THAT GIGGA NIGGA");
      console.log(event);
      alert("QHO TF IS GIGGA NIGGA");
    });

    return () => {
      window.removeEventListener("clerk.open.window", openWindowListener);
    };
  };

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
          <SignedIn>
            <HeaderComponent />
            <Route path="/" exact>
              <Redirect to="/tab1" />
            </Route>
            <Route path={["/tab1", "/tab2", "/tab3"]}>
              <IonTabs>
                <IonRouterOutlet>
                  <Route path="/tab1" exact>
                    <Tab1 />
                  </Route>
                  <Route path="/tab2" exact>
                    <Tab2 />
                  </Route>
                  <Route path="/tab3" exact>
                    <Tab3 />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/tab1">
                    <IonIcon aria-hidden="true" icon={triangle} />
                    <IonLabel>Tab 1</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/tab2">
                    <IonIcon aria-hidden="true" icon={ellipse} />
                    <IonLabel>Tab 2</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab3" href="/tab3">
                    <IonIcon aria-hidden="true" icon={square} />
                    <IonLabel>Tab 3</IonLabel>
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
