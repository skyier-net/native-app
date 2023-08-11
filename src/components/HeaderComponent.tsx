import { UserButton } from "@clerk/clerk-react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonImg,
} from "@ionic/react";
import { useLocation } from "react-router";
import icon from "/favicon.png";

export const HeaderComponent = () => {
  const routeToName = new Map();
  routeToName.set("/tab1", "Tab 1");
  routeToName.set("/tab2", "Tab 2");
  routeToName.set("/tab3", "Tab 3");

  const router = useLocation();
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonImg src={icon} className="w-7" />
        </IonButtons>
        <IonTitle>{routeToName.get(router.pathname) ?? ""}</IonTitle>
        <IonButtons slot="end">
          <UserButton
            afterSignOutUrl={
              "/redirectTo/" + router.pathname.slice(1).replaceAll("/", "_")
            }
            signInUrl={
              "/redirectTo/" + router.pathname.slice(1).replaceAll("/", "_")
            }
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
